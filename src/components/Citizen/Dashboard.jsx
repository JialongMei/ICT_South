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
} from 'react-icons/fi';
import Header from '../Common/Header.jsx';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox
} from '@chakra-ui/react';
import {useRef} from 'react';


const CitizenDashboard = ({showHeader = true}) => { // Add prop to control header visibility
    const {user} = useAuth();
    const {translate} = useLanguage();
    const [notifications] = useState(5);
    const bgColor = useColorModeValue('white', 'gray.800');
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'white');
    const isMobile = useBreakpointValue({base: true, md: false});

    const services = [
        {name: 'Apply for Passport', icon: FiFileText, urgent: false},
        {name: 'Tax Filing', icon: FiFileText, urgent: true},
        {name: 'Register Property', icon: FiHome, urgent: false},
        {name: 'Apply for Benefits', icon: FiUsers, urgent: false},
    ];

    const applications = [
        {id: 'APP-2023-001', service: 'Passport Renewal', status: 'In Progress', date: '2023-05-15', percent: 60},
        {id: 'APP-2023-002', service: 'Tax Filing', status: 'Pending', date: '2023-04-10', percent: 30},
        {id: 'APP-2023-003', service: 'Business License', status: 'Completed', date: '2023-03-22', percent: 100},
    ];

    const events = [
        {title: 'Property Tax Due', date: '2023-06-30', type: 'deadline'},
        {title: 'Passport Appointment', date: '2023-05-22', type: 'appointment'},
        {title: 'Public Hearing', date: '2023-05-28', type: 'event'},
    ];

    const StatCard = ({title, value, helpText, icon}) => (
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
                <Flex align="center" justify="space-between">
                    <Stat>
                        <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
                        <StatNumber fontSize={["xl", "2xl"]} fontWeight="bold" color={textColor}>{value}</StatNumber>
                        <StatHelpText fontSize="xs" color="gray.500">{helpText}</StatHelpText>
                    </Stat>
                    <Box p={2} bg="blue.50" borderRadius="md">
                        <Icon as={icon} boxSize={5} color="blue.500"/>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
    );

    const ServiceCard = ({service}) => (
        <Card
            direction="row"
            align="center"
            p={3}
            bg={cardBg}
            boxShadow="sm"
            _hover={{boxShadow: 'md', transform: 'translateY(-2px)'}}
            transition="all 0.2s"
            position="relative"
            overflow="hidden"
        >
            {service.urgent && (
                <Badge position="absolute" top={3.5} right={10} colorScheme="red" fontSize="xs">
                    Urgent
                </Badge>
            )}
            <Icon as={service.icon} boxSize={5} color="blue.500" mr={3}/>
            <Text fontWeight="medium" fontSize="sm">{service.name}</Text>
            <Icon as={FiExternalLink} ml="auto" boxSize={4} color="gray.400"/>
        </Card>
    );

    const ApplicationRow = ({application, isMobile}) => {
        if (isMobile) {
            return (
                <Card mb={2} p={3} bg={cardBg} boxShadow="sm">
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="sm">{application.service}</Text>
                        <Text fontSize="xs" color="gray.500">ID: {application.id}</Text>
                        <Flex justify="space-between" width="100%" mt={1}>
                            <Badge colorScheme={
                                application.status === 'Completed' ? 'green' :
                                    application.status === 'In Progress' ? 'blue' : 'yellow'
                            }>
                                {application.status}
                            </Badge>
                            <Text fontSize="xs" color="gray.500">{application.date}</Text>
                        </Flex>
                    </VStack>
                </Card>
            );
        }

        return (
            <Tr>
                <Td fontSize="sm">{application.id}</Td>
                <Td fontSize="sm">{application.service}</Td>
                <Td>
                    <Badge colorScheme={
                        application.status === 'Completed' ? 'green' :
                            application.status === 'In Progress' ? 'blue' : 'yellow'
                    }>
                        {application.status}
                    </Badge>
                </Td>
                <Td fontSize="sm">{application.date}</Td>
                <Td>
                    <Button size="sm" colorScheme="blue" variant="outline">
                        View
                    </Button>
                </Td>
            </Tr>
        );
    };

    const EventCard = ({event}) => (
        <Flex
            p={3}
            bg={cardBg}
            borderRadius="md"
            boxShadow="sm"
            align="center"
        >
            <Box
                p={2}
                borderRadius="full"
                bg={
                    event.type === 'deadline' ? 'red.100' :
                        event.type === 'appointment' ? 'green.100' : 'blue.100'
                }
                color={
                    event.type === 'deadline' ? 'red.500' :
                        event.type === 'appointment' ? 'green.500' : 'blue.500'
                }
                mr={3}
            >
                <Icon as={
                    event.type === 'deadline' ? FiAlertCircle :
                        event.type === 'appointment' ? FiCalendar : FiUsers
                }/>
            </Box>
            <Box flex="1">
                <Text fontWeight="medium" fontSize="sm">{event.title}</Text>
                <Text fontSize="xs" color="gray.500">{event.date}</Text>
            </Box>
        </Flex>
    );

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(false);
    const [voice, setVoice] = useState('');
    const inputFileRef = useRef();

    // Simulate voice input
    const handleVoiceInput = () => {
        setVoice('Simulated voice input...');
    };

    // Simulate image upload
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Simulate form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        setText('');
        setImage(null);
        setLocation(false);
        setVoice('');
    };

    return (
        <Box minH="100vh">

            {/* Main Content */}
            <Container
                maxW="1200px"
                px={[2, 4, 6]}
            >
                <Box mb={6}>
                    <Heading size="lg" mb={1}>Welcome back</Heading>
                    <Text color="gray.500">Here's what's happening with your applications and services</Text>
                </Box>

                {/* Stats Row */}
                <SimpleGrid columns={{base: 2, md: 4}} spacing={[2, 3, 4]} mb={6}>
                    <StatCard
                        title="Applications"
                        value="3"
                        helpText="Total applications"
                        icon={FiFileText}
                    />
                    <StatCard
                        title="In Progress"
                        value="1"
                        helpText="Being processed"
                        icon={FiClock}
                    />
                    <StatCard
                        title="Completed"
                        value="1"
                        helpText="Successfully processed"
                        icon={FiCheckCircle}
                    />
                    <StatCard
                        title="Upcoming"
                        value="3"
                        helpText="Events & deadlines"
                        icon={FiCalendar}
                    />
                </SimpleGrid>

                <Tabs colorScheme="blue" mb={4}>
                    <TabList overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
                        <Tab m={1}>Overview</Tab>
                        <Tab m={1}>Applications</Tab>
                        <Tab m={1}>Calendar</Tab>
                        <Tab m={1}>Documents</Tab>
                    </TabList>
                    <TabPanels>
                        {/* Overview Panel */}
                        <TabPanel px={0}>
                            <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>
                                {/* Quick Services Section */}
                                <Box>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Heading size="md">Quick Services</Heading>
                                        <Button variant="link" colorScheme="blue" size="sm"
                                                rightIcon={<FiExternalLink/>}>
                                            View All
                                        </Button>
                                    </Flex>
                                    <VStack spacing={3} align="stretch">
                                        {services.map((service, index) => (
                                            <ServiceCard key={index} service={service}/>
                                        ))}
                                    </VStack>
                                </Box>

                                {/* Upcoming Events Section */}
                                <Box>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Heading size="md">Upcoming Events</Heading>
                                        <Button variant="link" colorScheme="blue" size="sm" rightIcon={<FiCalendar/>}>
                                            Calendar
                                        </Button>
                                    </Flex>
                                    <VStack spacing={3} align="stretch">
                                        {events.map((event, index) => (
                                            <EventCard key={index} event={event}/>
                                        ))}
                                    </VStack>
                                </Box>
                            </SimpleGrid>
                        </TabPanel>

                        {/* Applications Panel */}
                        <TabPanel px={0}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg={cardBg}
                                boxShadow="sm"
                            >
                                <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px">
                                    <Heading size="md">My Applications</Heading>
                                    <Button size="sm" colorScheme="blue">New Application</Button>
                                </Flex>

                                {isMobile ? (
                                    <Box p={3}>
                                        {applications.map((app, idx) => (
                                            <ApplicationRow key={idx} application={app} isMobile={true}/>
                                        ))}
                                    </Box>
                                ) : (
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Application ID</Th>
                                                <Th>Service</Th>
                                                <Th>Status</Th>
                                                <Th>Date</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {applications.map((app, idx) => (
                                                <ApplicationRow key={idx} application={app} isMobile={false}/>
                                            ))}
                                        </Tbody>
                                    </Table>
                                )}
                            </Box>
                        </TabPanel>

                        {/* Calendar Panel */}
                        <TabPanel>
                            <Card>
                                <CardHeader>
                                    <Heading size="md">Calendar</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Calendar view will be displayed here</Text>
                                </CardBody>
                            </Card>
                        </TabPanel>

                        {/* Documents Panel */}
                        <TabPanel>
                            <Card>
                                <CardHeader>
                                    <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px">
                                        <Heading size="md">My Documents</Heading>
                                        <Button size="sm" colorScheme="blue">New Documents</Button>
                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <Text>Your uploaded and received documents will appear here</Text>
                                </CardBody>
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                {/* New Report Button */}
                <Box mt={8} textAlign="center">
                    <Button colorScheme="blue" size="lg" onClick={onOpen}>
                        Submit New Report
                    </Button>
                </Box>

                {/* New Report Modal */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay/>
                    <ModalContent
                        maxW={["90vw", "500px", "600px", "700px"]} // Responsive max width
                    >
                        <ModalHeader>Submit New Report</ModalHeader>
                        <ModalCloseButton/>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormControl mb={4}>
                                    <FormLabel>Text Form</FormLabel>
                                    <Textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Describe your report..."
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Voice Input</FormLabel>
                                    <Button onClick={handleVoiceInput} mb={2}>Record Audio</Button>
                                    <Input value={voice} readOnly placeholder="Voice input will appear here"/>
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Image Upload</FormLabel>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={inputFileRef}
                                        onChange={handleImageChange}
                                        border="hidden"
                                    />
                                    {image && <Text fontSize="sm" mt={2}>{image.name}</Text>}
                                </FormControl>
                                <FormControl>
                                    <Checkbox
                                        isChecked={location}
                                        onChange={(e) => setLocation(e.target.checked)}
                                    >
                                        Share My Location (Optional)
                                    </Checkbox>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} type="submit">
                                    Submit
                                </Button>
                                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
};

export default CitizenDashboard;