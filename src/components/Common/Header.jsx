import React from 'react';
import {Box, Flex, Button, IconButton, useColorMode, Image, HStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {FaSun, FaMoon, FaGlobe} from 'react-icons/fa';
import {useAuth} from '../../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import {useLanguage} from '../../contexts/LanguageContext';
import {Avatar, Menu, MenuButton, MenuList, MenuItem, Divider} from '@chakra-ui/react';
import {FiSettings, FiUsers, FiActivity, FiLogOut} from 'react-icons/fi';


import bandungIcon from '../../assets/bandung_icon.png';

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const {user, logout} = useAuth();
    const {translate} = useLanguage();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box
            as="header"
            bg="primary.500"
            color="white"
            px={[2, 4, 8]}
            py={[2, 3, 4]}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Image
                        src={bandungIcon}
                        alt="Bandung Social Reporting"
                        fallbackSrc="https://via.placeholder.com/40"
                        boxSize={["32px", "36px", "40px"]}
                        mr={[2, 3, 4]}
                    />
                    <Box
                        fontWeight="bold"
                        fontSize={["md", "lg", "xl"]}
                        display={["none", "block"]}
                    >
                        Bandung Social Reporting
                    </Box>
                </Flex>

                <HStack spacing={[2, 4]}>
                    <LanguageSelector/>
                    <IconButton
                        icon={colorMode === 'light' ? <FaMoon/> : <FaSun/>}
                        onClick={toggleColorMode}
                        variant="ghost"
                        color="white"
                        aria-label="Toggle color mode"
                        fontSize={["md", "lg"]}
                    />
                    {user ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant="ghost"
                                px={[2, 4]}
                                fontSize={["sm", "md"]}
                                leftIcon={<Avatar size="xs" name={user.email || "User"}/>}
                                color="white"
                            >
                                {user.email?.split('@')[0]}
                            </MenuButton>
                            <MenuList>
                                <MenuItem icon={<FiSettings/>} color="black">Settings</MenuItem>
                                <MenuItem icon={<FiUsers/>} color="black">Profile</MenuItem>
                                <MenuItem icon={<FiActivity/>} color="black">Activity Log</MenuItem>
                                <Divider/>
                                <MenuItem icon={<FiLogOut/>} color="black" onClick={handleLogout}>
                                    {translate('common.logout')}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button
                            onClick={() => navigate('/login')}
                            colorScheme="whiteAlpha"
                            fontSize={["sm", "md"]}
                            px={[2, 4]}
                        >
                            {translate('common.login')}
                        </Button>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};

export default Header;