import React, {useState} from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useColorModeValue,
    Container,
    Divider,
    HStack,
    VStack,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useBreakpointValue,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Progress,
    Grid,
    GridItem,
    Image,
    Stack,
    Tooltip,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Link,
    Tag,
    TagLabel,
    TagLeftIcon,
    Checkbox,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useLanguage} from '../../contexts/LanguageContext';
import {
    FiHome,
    FiFileText,
    FiAlertCircle,
    FiCalendar,
    FiBell,
    FiSettings,
    FiChevronDown,
    FiExternalLink,
    FiClock,
    FiCheckCircle,
    FiUsers,
    FiActivity,
    FiSearch,
    FiFilter,
    FiMapPin,
    FiBarChart2,
    FiPieChart,
    FiDownload,
    FiTrash2,
    FiEdit,
    FiEye,
    FiSend,
    FiMessageSquare,
    FiArchive,
    FiThumbsUp,
    FiTag,
    FiInfo,
    FiUserPlus,
    FiRefreshCw,
    FiStar,
    FiLayers,
} from 'react-icons/fi';
import Header from '../Common/Header.jsx';
import {useRef} from 'react';

const GovernmentDashboard = ({showHeader = true}) => {
    const {user} = useAuth();
    const {translate} = useLanguage();
    const [notifications] = useState(12);
    const bgColor = useColorModeValue('white', 'gray.800');
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'white');
    const isMobile = useBreakpointValue({base: true, md: false});
    const {isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose} = useDisclosure();
    const {isOpen: isAssignOpen, onOpen: onAssignOpen, onClose: onAssignClose} = useDisclosure();
    const [currentReport, setCurrentReport] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Statistics data
    const stats = [
        {title: "Total Reports", value: "124", helpText: "Last 30 days", icon: FiFileText, color: "blue"},
        {title: "Pending", value: "43", helpText: "Awaiting response", icon: FiClock, color: "orange"},
        {title: "Resolved", value: "68", helpText: "Completed cases", icon: FiCheckCircle, color: "green"},
        {title: "Critical", value: "13", helpText: "High priority", icon: FiAlertCircle, color: "red"},
    ];

    // Reports data
    const reports = [
        {
            id: 'REP-2023-001',
            title: 'Road Pothole on Main Street',
            category: 'Infrastructure',
            status: 'Pending',
            priority: 'High',
            location: 'Main Street, Downtown',
            date: '2023-05-15',
            citizen: 'John Doe',
            description: 'Large pothole causing traffic congestion and vehicle damage',
            department: 'Public Works',
            assignedTo: 'Unassigned',
            images: ['pothole.jpg'],
            updates: [
                {date: '2023-05-15', content: 'Report received', by: 'System'},
            ],
        },
        {
            id: 'REP-2023-002',
            title: 'Broken Street Light',
            category: 'Infrastructure',
            status: 'In Progress',
            priority: 'Medium',
            location: 'Oak Avenue, North District',
            date: '2023-05-14',
            citizen: 'Jane Smith',
            description: 'Street light is flickering and creates a safety hazard at night',
            department: 'Public Works',
            assignedTo: 'Robert Chen',
            images: ['streetlight.jpg'],
            updates: [
                {date: '2023-05-14', content: 'Report received', by: 'System'},
                {date: '2023-05-16', content: 'Assigned to maintenance team', by: 'Linda Johnson'},
            ],
        },
        {
            id: 'REP-2023-003',
            title: 'Illegal Dumping',
            category: 'Environment',
            status: 'Resolved',
            priority: 'High',
            location: 'River Park, West District',
            date: '2023-05-12',
            citizen: 'Mike Wilson',
            description: 'Large pile of construction waste dumped in park area',
            department: 'Environmental Services',
            assignedTo: 'Sarah Wong',
            images: ['dumping.jpg'],
            updates: [
                {date: '2023-05-12', content: 'Report received', by: 'System'},
                {date: '2023-05-13', content: 'Assigned to clean-up crew', by: 'David Miller'},
                {date: '2023-05-15', content: 'Site cleaned, investigation opened', by: 'Sarah Wong'},
                {date: '2023-05-17', content: 'Case resolved, area restored', by: 'Sarah Wong'},
            ],
        },
        {
            id: 'REP-2023-004',
            title: 'Water Supply Issue',
            category: 'Utilities',
            status: 'In Progress',
            priority: 'Critical',
            location: 'Maple Street, East District',
            date: '2023-05-14',
            citizen: 'Laura Garcia',
            description: 'No water supply for entire block for the past 24 hours',
            department: 'Water Department',
            assignedTo: 'James Wilson',
            images: ['water_issue.jpg'],
            updates: [
                {date: '2023-05-14', content: 'Report received', by: 'System'},
                {date: '2023-05-14', content: 'Emergency response team dispatched', by: 'Carlos Rodriguez'},
                {date: '2023-05-15', content: 'Broken main identified, repair in progress', by: 'James Wilson'},
            ],
        },
        {
            id: 'REP-2023-005',
            title: 'Public Disturbance',
            category: 'Public Safety',
            status: 'Pending',
            priority: 'Medium',
            location: 'Central Park, North District',
            date: '2023-05-17',
            citizen: 'Thomas Brown',
            description: 'Loud music and gatherings late at night disturbing residents',
            department: 'Unassigned',
            assignedTo: 'Unassigned',
            images: [],
            updates: [
                {date: '2023-05-17', content: 'Report received', by: 'System'},
            ],
        },
    ];

    // Department data
    const departments = [
        {id: 1, name: "Public Works", head: "Linda Johnson", activeReports: 28},
        {id: 2, name: "Environmental Services", head: "David Miller", activeReports: 15},
        {id: 3, name: "Water Department", head: "Carlos Rodriguez", activeReports: 19},
        {id: 4, name: "Public Safety", head: "Michelle Taylor", activeReports: 22},
        {id: 5, name: "Parks & Recreation", head: "Steven Clark", activeReports: 9},
    ];

    // Performance metrics
    const performance = [
        {
            department: "Public Works",
            metrics: {
                responseTime: 2.4,
                resolutionTime: 8.7,
                satisfaction: 76
            }
        },
        {
            department: "Environmental Services",
            metrics: {
                responseTime: 1.8,
                resolutionTime: 6.2,
                satisfaction: 82
            }
        },
        {
            department: "Water Department",
            metrics: {
                responseTime: 1.2,
                resolutionTime: 4.8,
                satisfaction: 88
            }
        },
        {
            department: "Public Safety",
            metrics: {
                responseTime: 0.8,
                resolutionTime: 5.3,
                satisfaction: 79
            }
        },
    ];

    // Statistics card component
    const StatCard = ({title, value, helpText, icon, color}) => (
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
                <Flex align="center" justify="space-between">
                    <Stat>
                        <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
                        <StatNumber fontSize={["xl", "2xl"]} fontWeight="bold" color={textColor}>{value}</StatNumber>
                        <StatHelpText fontSize="xs" color="gray.500">{helpText}</StatHelpText>
                    </Stat>
                    <Box p={2} bg={`${color}.50`} borderRadius="md">
                        <Icon as={icon} boxSize={5} color={`${color}.500`}/>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
    );

    // Department performance card
    const DepartmentCard = ({department}) => (
        <Card
            direction="row"
            align="center"
            p={3}
            bg={cardBg}
            boxShadow="sm"
            _hover={{boxShadow: 'md', transform: 'translateY(-2px)'}}
            transition="all 0.2s"
            mb={2}
        >
            <Box ml={2}>
                <Text fontWeight="medium" fontSize="md">{department.name}</Text>
                <Text fontSize="xs" color="gray.500">Head: {department.head}</Text>
            </Box>
            <Flex ml="auto" align="center">
                <Badge colorScheme={
                    department.activeReports > 20 ? "red" :
                        department.activeReports > 10 ? "yellow" : "green"
                }>
                    {department.activeReports} active
                </Badge>
                <IconButton
                    icon={<FiEye/>}
                    variant="ghost"
                    size="sm"
                    ml={2}
                    aria-label="View department"
                />
            </Flex>
        </Card>
    );

    // Recent activity card
    const ActivityCard = ({activity}) => (
        <Flex
            p={3}
            bg={cardBg}
            borderRadius="md"
            boxShadow="sm"
            mb={2}
            align="center"
        >
            <Box
                p={2}
                borderRadius="full"
                bg={
                    activity.type === 'new' ? 'blue.100' :
                        activity.type === 'update' ? 'green.100' :
                            activity.type === 'critical' ? 'red.100' : 'purple.100'
                }
                color={
                    activity.type === 'new' ? 'blue.500' :
                        activity.type === 'update' ? 'green.500' :
                            activity.type === 'critical' ? 'red.500' : 'purple.500'
                }
                mr={3}
            >
                <Icon as={
                    activity.type === 'new' ? FiFileText :
                        activity.type === 'update' ? FiRefreshCw :
                            activity.type === 'critical' ? FiAlertCircle : FiStar
                }/>
            </Box>
            <Box flex="1">
                <Text fontWeight="medium" fontSize="sm">{activity.title}</Text>
                <Text fontSize="xs" color="gray.500">{activity.time}</Text>
            </Box>
        </Flex>
    );

    // Filter and handle reports based on status and priority
    const filteredReports = reports.filter(report => {
        const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;
        const matchesDepartment = filterDepartment === 'all' || report.department === filterDepartment;
        const matchesSearch =
            searchQuery === '' ||
            report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.citizen.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesDepartment && matchesStatus && matchesPriority && matchesSearch;
    });

    // Handle report selection to view details
    const handleViewReport = (report) => {
        setCurrentReport(report);
        onDetailOpen();
    };

    // Handle department assignment
    const handleAssignReport = (report) => {
        setCurrentReport(report);
        onAssignOpen();
    };

    // Recent activities
    const recentActivities = [
        {type: 'new', title: 'New report: Traffic light outage', time: '10 minutes ago'},
        {type: 'update', title: 'Water main issue updated by James', time: '25 minutes ago'},
        {type: 'critical', title: 'Critical: Power outage reported', time: '1 hour ago'},
        {type: 'resolved', title: 'Illegal dumping case resolved', time: '2 hours ago'},
        {type: 'new', title: 'New report: Fallen tree on Pine St', time: '3 hours ago'},
    ];

    return (
        <Box minH="100vh" bg="white">

            {/* Main Content */}
            <Container maxW="1400px" px={[2, 4, 6]} pt={4} pb={10}>
                <Flex
                    direction={["column", "column", "row"]}
                    justify="space-between"
                    align={["start", "start", "center"]}
                    mb={6}
                >
                    <Box mb={[4, 4, 0]}>
                        <Heading size="lg" mb={1}>Government Dashboard</Heading>
                        <Text color="gray.500">Manage reports, monitor services, and track performance</Text>
                    </Box>

                    <HStack spacing={4}>
                        <Button
                            leftIcon={<FiDownload/>}
                            colorScheme="teal"
                            variant="outline"
                            size={["sm", "md"]}
                            display={["none", "flex"]}
                        >
                            Export Data
                        </Button>
                        <IconButton
                            aria-label="Notifications"
                            icon={<FiBell/>}
                            position="relative"
                            variant="ghost"
                            size={["sm", "md"]}
                        >
                            {notifications > 0 && (
                                <Badge
                                    position="absolute"
                                    top="-8px"
                                    right="-8px"
                                    colorScheme="red"
                                    borderRadius="full"
                                    w="18px"
                                    h="18px"
                                    fontSize="xs"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {notifications}
                                </Badge>
                            )}
                        </IconButton>
                    </HStack>
                </Flex>

                {/* Stats Row */}
                <SimpleGrid columns={{base: 2, md: 4}} spacing={[2, 3, 4]} mb={6}>
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            helpText={stat.helpText}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </SimpleGrid>

                <Tabs colorScheme="blue" mb={4} isLazy>
                    <TabList overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
                        <Tab my={1} mx={1} px={[3, 4]} py={2}>Reports</Tab>
                        <Tab my={1} mx={1} px={[3, 4]} py={2}>Analytics</Tab>
                        <Tab my={1} mx={1} px={[3, 4]} py={2}>Departments</Tab>
                        <Tab my={1} mx={1} px={[3, 4]} py={2}>Performance</Tab>
                        <Tab my={1} mx={1} px={[3, 4]} py={2}>User Management</Tab>
                    </TabList>
                    <TabPanels>
                        {/* Reports Panel */}
                        <TabPanel px={0}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg={cardBg}
                                boxShadow="sm"
                                mb={6}
                            >
                                <Flex
                                    direction={["column", "column", "row"]}
                                    justify="space-between"
                                    align={["start", "start", "center"]}
                                    p={4}
                                    borderBottomWidth="1px"
                                    wrap="wrap"
                                    gap={3}
                                >
                                    <Heading size="md" mb={[2, 2, 0]}>Citizen Reports</Heading>

                                    <HStack spacing={3} wrap="wrap">
                                        <InputGroup size="sm" maxW="200px">
                                            <InputLeftElement pointerEvents="none">
                                                <Icon as={FiSearch} color="gray.400"/>
                                            </InputLeftElement>
                                            <Input
                                                placeholder="Search reports..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </InputGroup>

                                        <Select
                                            size="sm"
                                            maxW="150px"
                                            value={filterDepartment}
                                            onChange={(e) => setFilterDepartment(e.target.value)}
                                        >
                                            <option value="all">All Departments</option>
                                            {departments.map((dept) => (
                                                <option key={dept.name} value={dept.name}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </Select>

                                        <Select
                                            size="sm"
                                            maxW="150px"
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                        >
                                            <option value="all">All Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </Select>

                                        <Select
                                            size="sm"
                                            maxW="150px"
                                            value={filterPriority}
                                            onChange={(e) => setFilterPriority(e.target.value)}
                                        >
                                            <option value="all">All Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Critical">Critical</option>
                                        </Select>

                                        <IconButton
                                            aria-label="Filter options"
                                            icon={<FiFilter/>}
                                            size="sm"
                                            variant="ghost"
                                        />
                                    </HStack>
                                </Flex>

                                {isMobile ? (
                                    <Box p={3}>
                                        {filteredReports.length > 0 ? (
                                            filteredReports.map((report) => (
                                                <Card key={report.id} mb={3} boxShadow="sm" overflow="hidden">
                                                    <Box
                                                        h="8px"
                                                        bg={
                                                            report.priority === 'Critical' ? 'red.500' :
                                                                report.priority === 'High' ? 'orange.500' :
                                                                    report.priority === 'Medium' ? 'yellow.500' : 'green.500'
                                                        }
                                                    />
                                                    <CardBody p={3}>
                                                        <VStack align="start" spacing={1}>
                                                            <Flex width="100%" justify="space-between" align="center">
                                                                <Text fontSize="sm"
                                                                      fontWeight="bold">{report.title}</Text>
                                                                <Badge colorScheme={
                                                                    report.status === 'Resolved' ? 'green' :
                                                                        report.status === 'In Progress' ? 'blue' : 'yellow'
                                                                }>
                                                                    {report.status}
                                                                </Badge>
                                                            </Flex>
                                                            <Text fontSize="xs" color="gray.500">ID: {report.id}</Text>
                                                            <Text fontSize="xs" color="gray.500">
                                                                <Icon as={FiMapPin} boxSize="3" mr={1}/>
                                                                {report.location}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500">
                                                                Reported on: {report.date} • By: {report.citizen}
                                                            </Text>
                                                            <HStack mt={2} spacing={2}>
                                                                <Button
                                                                    size="xs"
                                                                    leftIcon={<FiEye/>}
                                                                    onClick={() => handleViewReport(report)}
                                                                >
                                                                    View
                                                                </Button>
                                                                <Button
                                                                    size="xs"
                                                                    leftIcon={<FiUserPlus/>}
                                                                    onClick={() => handleAssignReport(report)}
                                                                    isDisabled={report.status === 'Resolved'}
                                                                >
                                                                    Assign
                                                                </Button>
                                                            </HStack>
                                                        </VStack>
                                                    </CardBody>
                                                </Card>
                                            ))
                                        ) : (
                                            <Box p={4} textAlign="center">
                                                <Text color="gray.500">No reports match your filters</Text>
                                            </Box>
                                        )}
                                    </Box>
                                ) : (
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>Title</Th>
                                                <Th>Location</Th>
                                                <Th>Department</Th>
                                                <Th>Priority</Th>
                                                <Th>Status</Th>
                                                <Th>Date</Th>
                                                <Th>Actions</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {filteredReports.length > 0 ? (
                                                filteredReports.map((report) => (
                                                    <Tr key={report.id}>
                                                        <Td fontSize="sm">{report.id}</Td>
                                                        <Td fontSize="sm" fontWeight="medium">{report.title}</Td>
                                                        <Td fontSize="sm">{report.location}</Td>
                                                        <Td fontSize="sm">{report.department}</Td>
                                                        <Td>
                                                            <Badge colorScheme={
                                                                report.priority === 'Critical' ? 'red' :
                                                                    report.priority === 'High' ? 'orange' :
                                                                        report.priority === 'Medium' ? 'yellow' : 'green'
                                                            }>
                                                                {report.priority}
                                                            </Badge>
                                                        </Td>
                                                        <Td>
                                                            <Badge colorScheme={
                                                                report.status === 'Resolved' ? 'green' :
                                                                    report.status === 'In Progress' ? 'blue' : 'yellow'
                                                            }>
                                                                {report.status}
                                                            </Badge>
                                                        </Td>
                                                        <Td fontSize="sm">{report.date}</Td>
                                                        <Td>
                                                            <HStack spacing={1}>
                                                                <IconButton
                                                                    aria-label="View report"
                                                                    icon={<FiEye/>}
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => handleViewReport(report)}
                                                                />
                                                                <IconButton
                                                                    aria-label="Assign report"
                                                                    icon={<FiUserPlus/>}
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    isDisabled={report.status === 'Resolved'}
                                                                    onClick={() => handleAssignReport(report)}
                                                                />
                                                            </HStack>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            ) : (
                                                <Tr>
                                                    <Td colSpan={8} textAlign="center" py={4}>
                                                        <Text color="gray.500">No reports match your filters</Text>
                                                    </Td>
                                                </Tr>
                                            )}
                                        </Tbody>
                                    </Table>
                                )}
                            </Box>

                            {/* Quick Stats & Recent Activity */}
                            <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>
                                {/* Recent Activity Section */}
                                <Box>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Heading size="md">Recent Activity</Heading>
                                        <Button variant="link" colorScheme="blue" size="sm"
                                                rightIcon={<FiExternalLink/>}>
                                            View All
                                        </Button>
                                    </Flex>
                                    <VStack spacing={3} align="stretch">
                                        {recentActivities.map((activity, index) => (
                                            <ActivityCard key={index} activity={activity}/>
                                        ))}
                                    </VStack>
                                </Box>

                                {/* Department Status Section */}
                                <Box>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Heading size="md">Department Status</Heading>
                                        <Button variant="link" colorScheme="blue" size="sm"
                                                rightIcon={<FiExternalLink/>}>
                                            Manage
                                        </Button>
                                    </Flex>
                                    <VStack spacing={3} align="stretch">
                                        {departments.map((dept, index) => (
                                            <DepartmentCard key={index} department={dept}/>
                                        ))}
                                    </VStack>
                                </Box>
                            </SimpleGrid>
                        </TabPanel>

                        {/* Analytics Panel */}
                        <TabPanel px={0}>
                            <SimpleGrid columns={{base: 1, lg: 2}} spacing={6}>
                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Reports by Category</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text fontSize="sm" color="gray.500">Chart visualization goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Reports by Status</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text fontSize="sm" color="gray.500">Chart visualization goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Reports by Location</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text fontSize="sm" color="gray.500">Map visualization goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Resolution Time Trends</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                                            <Text fontSize="sm" color="gray.500">Chart visualization goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </SimpleGrid>
                        </TabPanel>

                        {/* Departments Panel */}
                        <TabPanel px={0}>
                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={6}>
                                {departments.map((dept, index) => (
                                    <Card key={index}>
                                        <CardHeader pb={2}>
                                            <Heading size="md">{dept.name}</Heading>
                                        </CardHeader>
                                        <CardBody pt={0}>
                                            <VStack align="start" spacing={2}>
                                                <Text fontSize="sm">Department Head: <strong>{dept.head}</strong></Text>
                                                <Text fontSize="sm">Active
                                                    Reports: <strong>{dept.activeReports}</strong></Text>
                                                <Box w="100%" pt={2}>
                                                    <Text fontSize="xs" mb={1}>Workload</Text>
                                                    <Progress
                                                        value={dept.activeReports * 2}
                                                        size="sm"
                                                        colorScheme={
                                                            dept.activeReports > 20 ? "red" :
                                                                dept.activeReports > 10 ? "yellow" : "green"
                                                        }
                                                        borderRadius="md"
                                                    />
                                                </Box>
                                            </VStack>
                                        </CardBody>
                                        <CardFooter pt={0}>
                                            <Button
                                                size="sm"
                                                width="full"
                                                variant="outline"
                                                colorScheme="blue"
                                                leftIcon={<FiEye/>}
                                            >
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </TabPanel>

                        {/* Performance Panel */}
                        <TabPanel px={0}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg={cardBg}
                                boxShadow="sm"
                                mb={6}
                            >
                                <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px">
                                    <Heading size="md">Department Performance Metrics</Heading>
                                    <Button leftIcon={<FiDownload/>} size="sm" colorScheme="blue" variant="outline">
                                        Export Report
                                    </Button>
                                </Flex>

                                {isMobile ? (
                                    <VStack spacing={4} p={4} align="stretch">
                                        {performance.map((dept, idx) => (
                                            <Card key={idx} variant="outline">
                                                <CardBody p={3}>
                                                    <Heading size="sm" mb={3}>{dept.department}</Heading>
                                                    <SimpleGrid columns={1} spacing={3}>
                                                        <Box>
                                                            <Text fontSize="xs" color="gray.500">Avg. Response
                                                                Time</Text>
                                                            <Text
                                                                fontWeight="bold">{dept.metrics.responseTime} hours</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={(5 - dept.metrics.responseTime) * 20}
                                                                colorScheme="green"
                                                                mt={1}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Text fontSize="xs" color="gray.500">Avg. Resolution
                                                                Time</Text>
                                                            <Text
                                                                fontWeight="bold">{dept.metrics.resolutionTime} days</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={(10 - dept.metrics.resolutionTime) * 10}
                                                                colorScheme="blue"
                                                                mt={1}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Text fontSize="xs" color="gray.500">Citizen
                                                                Satisfaction</Text>
                                                            <Text fontWeight="bold">{dept.metrics.satisfaction}%</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={dept.metrics.satisfaction}
                                                                colorScheme="purple"
                                                                mt={1}
                                                            />
                                                        </Box>
                                                    </SimpleGrid>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </VStack>
                                ) : (
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Department</Th>
                                                <Th>Avg. Response Time</Th>
                                                <Th>Avg. Resolution Time</Th>
                                                <Th>Citizen Satisfaction</Th>
                                                <Th>Trend</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {performance.map((dept, idx) => (
                                                <Tr key={idx}>
                                                    <Td fontWeight="medium">{dept.department}</Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text>{dept.metrics.responseTime} hours</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={(5 - dept.metrics.responseTime) * 20}
                                                                colorScheme="green"
                                                                width="100px"
                                                            />
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text>{dept.metrics.resolutionTime} days</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={(10 - dept.metrics.resolutionTime) * 10}
                                                                colorScheme="blue"
                                                                width="100px"
                                                            />
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text>{dept.metrics.satisfaction}%</Text>
                                                            <Progress
                                                                size="xs"
                                                                value={dept.metrics.satisfaction}
                                                                colorScheme="purple"
                                                                width="100px"
                                                            />
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <Text color="green.500">↑ Improving</Text>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                )}
                            </Box>

                            <SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Average Response Time</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize="2xl" fontWeight="bold" color="green.500">1.5 hours</Text>
                                        <Text fontSize="sm" color="gray.500">13% improvement from last month</Text>
                                        <Box height="150px" display="flex" alignItems="center" justifyContent="center"
                                             mt={4}>
                                            <Text fontSize="sm" color="gray.500">Trend chart goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Average Resolution Time</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize="2xl" fontWeight="bold" color="blue.500">6.3 days</Text>
                                        <Text fontSize="sm" color="gray.500">8% improvement from last month</Text>
                                        <Box height="150px" display="flex" alignItems="center" justifyContent="center"
                                             mt={4}>
                                            <Text fontSize="sm" color="gray.500">Trend chart goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader pb={0}>
                                        <Heading size="md">Citizen Satisfaction</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize="2xl" fontWeight="bold" color="purple.500">81.2%</Text>
                                        <Text fontSize="sm" color="gray.500">5% improvement from last month</Text>
                                        <Box height="150px" display="flex" alignItems="center" justifyContent="center"
                                             mt={4}>
                                            <Text fontSize="sm" color="gray.500">Trend chart goes here</Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </SimpleGrid>
                        </TabPanel>

                        {/* User Management Panel */}
                        <TabPanel px={0}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg={cardBg}
                                boxShadow="sm"
                                mb={6}
                            >
                                <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px">
                                    <Heading size="md">System Users</Heading>
                                    <Button leftIcon={<FiUserPlus/>} size="sm" colorScheme="blue">
                                        Add New User
                                    </Button>
                                </Flex>

                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Department</Th>
                                            <Th>Role</Th>
                                            <Th>Status</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" name="Linda Johnson" mr={2}/>
                                                    <Text>Linda Johnson</Text>
                                                </Flex>
                                            </Td>
                                            <Td>linda.johnson@gov.example.com</Td>
                                            <Td>Public Works</Td>
                                            <Td>Department Head</Td>
                                            <Td><Badge colorScheme="green">Active</Badge></Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <IconButton icon={<FiEdit/>} size="sm" variant="ghost"
                                                                aria-label="Edit user"/>
                                                    <IconButton icon={<FiTrash2/>} size="sm" variant="ghost"
                                                                aria-label="Delete user"/>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" name="David Miller" mr={2}/>
                                                    <Text>David Miller</Text>
                                                </Flex>
                                            </Td>
                                            <Td>david.miller@gov.example.com</Td>
                                            <Td>Environmental Services</Td>
                                            <Td>Department Head</Td>
                                            <Td><Badge colorScheme="green">Active</Badge></Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <IconButton icon={<FiEdit/>} size="sm" variant="ghost"
                                                                aria-label="Edit user"/>
                                                    <IconButton icon={<FiTrash2/>} size="sm" variant="ghost"
                                                                aria-label="Delete user"/>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" name="Sarah Wong" mr={2}/>
                                                    <Text>Sarah Wong</Text>
                                                </Flex>
                                            </Td>
                                            <Td>sarah.wong@gov.example.com</Td>
                                            <Td>Environmental Services</Td>
                                            <Td>Agent</Td>
                                            <Td><Badge colorScheme="green">Active</Badge></Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <IconButton icon={<FiEdit/>} size="sm" variant="ghost"
                                                                aria-label="Edit user"/>
                                                    <IconButton icon={<FiTrash2/>} size="sm" variant="ghost"
                                                                aria-label="Delete user"/>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" name="James Wilson" mr={2}/>
                                                    <Text>James Wilson</Text>
                                                </Flex>
                                            </Td>
                                            <Td>james.wilson@gov.example.com</Td>
                                            <Td>Water Department</Td>
                                            <Td>Agent</Td>
                                            <Td><Badge colorScheme="yellow">On Leave</Badge></Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <IconButton icon={<FiEdit/>} size="sm" variant="ghost"
                                                                aria-label="Edit user"/>
                                                    <IconButton icon={<FiTrash2/>} size="sm" variant="ghost"
                                                                aria-label="Delete user"/>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" name="Robert Chen" mr={2}/>
                                                    <Text>Robert Chen</Text>
                                                </Flex>
                                            </Td>
                                            <Td>robert.chen@gov.example.com</Td>
                                            <Td>Public Works</Td>
                                            <Td>Agent</Td>
                                            <Td><Badge colorScheme="green">Active</Badge></Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <IconButton icon={<FiEdit/>} size="sm" variant="ghost"
                                                                aria-label="Edit user"/>
                                                    <IconButton icon={<FiTrash2/>} size="sm" variant="ghost"
                                                                aria-label="Delete user"/>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>

                            <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>
                                <Card>
                                    <CardHeader>
                                        <Heading size="md">Role Management</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <VStack align="start" spacing={4}>
                                            <Box width="100%">
                                                <Flex justify="space-between" mb={2}>
                                                    <Text fontWeight="medium">Administrator</Text>
                                                    <Badge colorScheme="red">2 users</Badge>
                                                </Flex>
                                                <Text fontSize="sm" color="gray.500">Full system access with all
                                                    permissions</Text>
                                            </Box>
                                            <Divider/>
                                            <Box width="100%">
                                                <Flex justify="space-between" mb={2}>
                                                    <Text fontWeight="medium">Department Head</Text>
                                                    <Badge colorScheme="blue">4 users</Badge>
                                                </Flex>
                                                <Text fontSize="sm" color="gray.500">Department management and
                                                    reporting</Text>
                                            </Box>
                                            <Divider/>
                                            <Box width="100%">
                                                <Flex justify="space-between" mb={2}>
                                                    <Text fontWeight="medium">Agent</Text>
                                                    <Badge colorScheme="green">12 users</Badge>
                                                </Flex>
                                                <Text fontSize="sm" color="gray.500">Report handling and citizen
                                                    communication</Text>
                                            </Box>
                                            <Divider/>
                                            <Box width="100%">
                                                <Flex justify="space-between" mb={2}>
                                                    <Text fontWeight="medium">Viewer</Text>
                                                    <Badge colorScheme="gray">3 users</Badge>
                                                </Flex>
                                                <Text fontSize="sm" color="gray.500">View-only access to reports and
                                                    statistics</Text>
                                            </Box>
                                        </VStack>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <Heading size="md">Department Assignment</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <SimpleGrid columns={{base: 1, lg: 2}} spacing={4}>
                                            {departments.map((dept, idx) => (
                                                <Box
                                                    key={idx}
                                                    p={3}
                                                    borderWidth="1px"
                                                    borderRadius="md"
                                                    _hover={{
                                                        borderColor: "blue.300",
                                                        bg: "blue.50",
                                                        transition: "all 0.2s"
                                                    }}
                                                >
                                                    <Flex justify="space-between" mb={1}>
                                                        <Text fontWeight="medium">{dept.name}</Text>
                                                        <Badge maxHeight='20px' colorScheme="blue" borderRadius="md"
                                                               whiteSpace="nowrap">{dept.activeReports} reports</Badge>
                                                    </Flex>
                                                    <Text fontSize="sm" color="gray.500">Head: {dept.head}</Text>
                                                    <Button
                                                        size="xs"
                                                        mt={2}
                                                        colorScheme="blue"
                                                        variant="outline"
                                                        leftIcon={<FiUsers/>}
                                                    >
                                                        Manage Staff
                                                    </Button>
                                                </Box>
                                            ))}
                                        </SimpleGrid>
                                    </CardBody>
                                </Card>
                            </SimpleGrid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>

            {/* Report Detail Drawer */}
            <Drawer
                isOpen={isDetailOpen}
                placement="right"
                onClose={onDetailClose}
                size={isMobile ? "full" : "md"}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader borderBottomWidth="1px">
                        Report Details
                    </DrawerHeader>

                    <DrawerBody>
                        {currentReport && (
                            <VStack spacing={4} align="stretch">
                                <Box>
                                    <Badge
                                        colorScheme={
                                            currentReport.priority === 'Critical' ? 'red' :
                                                currentReport.priority === 'High' ? 'orange' :
                                                    currentReport.priority === 'Medium' ? 'yellow' : 'green'
                                        }
                                        mb={2}
                                    >
                                        {currentReport.priority} Priority
                                    </Badge>
                                    <Heading size="md">{currentReport.title}</Heading>
                                    <Text fontSize="sm" color="gray.500">ID: {currentReport.id}</Text>
                                </Box>

                                <Divider/>

                                <SimpleGrid columns={2} spacing={4}>
                                    <Box>
                                        <Text fontSize="xs" color="gray.500">Status</Text>
                                        <Badge colorScheme={
                                            currentReport.status === 'Resolved' ? 'green' :
                                                currentReport.status === 'In Progress' ? 'blue' : 'yellow'
                                        }>
                                            {currentReport.status}
                                        </Badge>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xs" color="gray.500">Category</Text>
                                        <Text fontWeight="medium">{currentReport.category}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xs" color="gray.500">Reported On</Text>
                                        <Text fontWeight="medium">{currentReport.date}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xs" color="gray.500">Reported By</Text>
                                        <Text fontWeight="medium">{currentReport.citizen}</Text>
                                    </Box>
                                </SimpleGrid>

                                <Box>
                                    <Text fontSize="xs" color="gray.500">Location</Text>
                                    <Flex align="center">
                                        <Icon as={FiMapPin} color="blue.500" mr={2}/>
                                        <Text fontWeight="medium">{currentReport.location}</Text>
                                    </Flex>
                                </Box>

                                <Box>
                                    <Text fontSize="xs" color="gray.500">Description</Text>
                                    <Text>{currentReport.description}</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="xs" color="gray.500">Department Assignment</Text>
                                    <Text fontWeight="medium">{currentReport.department}</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="xs" color="gray.500">Assigned To</Text>
                                    <Text fontWeight="medium">{currentReport.assignedTo}</Text>
                                </Box>

                                {currentReport.images && currentReport.images.length > 0 && (
                                    <Box>
                                        <Text fontSize="xs" color="gray.500" mb={2}>Attached Images</Text>
                                        <SimpleGrid columns={2} spacing={2}>
                                            {currentReport.images.map((img, idx) => (
                                                <Box
                                                    key={idx}
                                                    borderRadius="md"
                                                    bg="gray.100"
                                                    height="100px"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Text fontSize="xs" color="gray.500">{img}</Text>
                                                </Box>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                )}

                                <VStack align="stretch" mt={4}>
                                    <Text fontSize="md" fontWeight="medium">Case History</Text>
                                    {currentReport.updates.map((update, idx) => (
                                        <Box
                                            key={idx}
                                            p={3}
                                            borderWidth="1px"
                                            borderRadius="md"
                                            bg="gray.50"
                                        >
                                            <Flex justify="space-between" mb={1}>
                                                <Text fontSize="sm" fontWeight="medium">{update.content}</Text>
                                                <Badge variant="outline" colorScheme="blue">{update.date}</Badge>
                                            </Flex>
                                            <Text fontSize="xs" color="gray.500">By: {update.by}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </VStack>
                        )}
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onDetailClose}>
                            Close
                        </Button>
                        <Button
                            colorScheme="blue"
                            leftIcon={<FiUserPlus/>}
                            onClick={() => {
                                onDetailClose();
                                if (currentReport) handleAssignReport(currentReport);
                            }}
                            isDisabled={currentReport && currentReport.status === 'Resolved'}
                        >
                            Assign
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Assignment Modal */}
            <Modal isOpen={isAssignOpen} onClose={onAssignClose} isCentered>
                <ModalOverlay/>
                <ModalContent maxW={{base: "90%", md: "500px"}}>
                    <ModalHeader>Assign Report</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        {currentReport && (
                            <VStack align="stretch" spacing={4}>
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Report ID</Text>
                                    <Text fontWeight="medium">{currentReport.id}</Text>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" color="gray.500">Title</Text>
                                    <Text fontWeight="medium">{currentReport.title}</Text>
                                </Box>
                                <FormControl>
                                    <FormLabel>Department</FormLabel>
                                    <Select placeholder="Select department">
                                        {departments.map((dept, idx) => (
                                            <option key={idx} value={dept.name}>{dept.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Assign To</FormLabel>
                                    <Select placeholder="Select staff member">
                                        <option value="linda.johnson">Linda Johnson</option>
                                        <option value="david.miller">David Miller</option>
                                        <option value="sarah.wong">Sarah Wong</option>
                                        <option value="robert.chen">Robert Chen</option>
                                        <option value="james.wilson">James Wilson</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Priority</FormLabel>
                                    <RadioGroup defaultValue={currentReport.priority.toLowerCase()}>
                                        <HStack spacing={4}>
                                            <Radio value="critical" colorScheme="red">Critical</Radio>
                                            <Radio value="high" colorScheme="orange">High</Radio>
                                            <Radio value="medium" colorScheme="yellow">Medium</Radio>
                                            <Radio value="low" colorScheme="green">Low</Radio>
                                        </HStack>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <Textarea placeholder="Add any additional instructions or context..."/>
                                </FormControl>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Assign
                        </Button>
                        <Button onClick={onAssignClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default GovernmentDashboard;