import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Link,
    Radio,
    RadioGroup,
    useToast,
    Container,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('citizen');
    const [isLoading, setIsLoading] = useState(false);
    const { translate } = useLanguage();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            setTimeout(() => {
                toast({
                    title: 'Account created',
                    description: 'You have successfully registered',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/login');
            }, 1000);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to register',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="100vw" p={0} minH="100vh" centerContent>
            <Flex
                w="100%"
                minH="100vh"
                align="center"
                justify="center"
            >
                <Box
                    w={["95%", "85%", "70%", "500px"]}
                    p={[4, 6, 8]}
                    mx="auto"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="md"
                    boxShadow="md"
                    bg="white"
                >
                    <Box textAlign="center" mb={[2, 4]}>
                        <Heading fontSize={["lg", "xl", "2xl"]}>
                            {translate('common.register')}
                        </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired mb={4}>
                                <FormLabel fontSize={["sm", "md"]}>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    fontSize={["sm", "md"]}
                                    py={[2, 3]}
                                />
                            </FormControl>

                            <FormControl isRequired mb={4}>
                                <FormLabel fontSize={["sm", "md"]}>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    fontSize={["sm", "md"]}
                                    py={[2, 3]}
                                />
                            </FormControl>

                            <FormControl isRequired mb={4}>
                                <FormLabel fontSize={["sm", "md"]}>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    fontSize={["sm", "md"]}
                                    py={[2, 3]}
                                />
                            </FormControl>

                            <FormControl isRequired mb={6}>
                                <FormLabel fontSize={["sm", "md"]}>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    fontSize={["sm", "md"]}
                                    py={[2, 3]}
                                />
                            </FormControl>

                            <FormControl as="fieldset" mb={6}>
                                <FormLabel as="legend" fontSize={["sm", "md"]}>I am a:</FormLabel>
                                <RadioGroup value={userType} onChange={setUserType}>
                                    <Stack direction="row">
                                        <Radio value="citizen" fontSize={["sm", "md"]}>Citizen</Radio>
                                        <Radio value="government" fontSize={["sm", "md"]}>Government Official</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                isLoading={isLoading}
                                colorScheme="blue"
                                fontSize={["sm", "md"]}
                                py={[2, 3]}
                            >
                                {translate('common.register')}
                            </Button>
                        </form>
                        <Text mt={6} textAlign="center" fontSize={["sm", "md"]}>
                            Already have an account?{' '}
                            <Link as={RouterLink} to="/login" color="blue.500" fontSize={["sm", "md"]}>
                                {translate('common.login')}
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
};

export default Register;