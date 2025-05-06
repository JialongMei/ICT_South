import React, {useState} from 'react';
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
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useLanguage} from '../../contexts/LanguageContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('citizen');
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();
    const {translate} = useLanguage();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // This would be an API call in a real application
            // For now, we'll just simulate a login
            setTimeout(() => {
                login({email}, userType);

                if (userType === 'citizen') {
                    navigate('/citizen/dashboard');
                } else {
                    navigate('/government/dashboard');
                }
            }, 1000);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to login. Please check your credentials.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="100vw" p={0} minH="100vh" centerContent mt={[2,4,6]}>
            <Flex
                w="100%"
                h="100%"
                align="center"
                justify="center"
            >
                <Box
                    w={["90%", "80%", "60%", "500px"]}
                    p={[6, 8, 10]}
                    mx="auto"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="md"
                    boxShadow="md"
                    bg="white"
                >
                    <Box textAlign="center">
                        <Heading>{translate('common.login')}</Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </FormControl>
                            <FormControl isRequired mb={6}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </FormControl>

                            <FormControl as="fieldset" mb={6}>
                                <FormLabel as="legend">I am a:</FormLabel>
                                <RadioGroup value={userType} onChange={setUserType}>
                                    <Stack direction="row">
                                        <Radio value="citizen">Citizen</Radio>
                                        <Radio value="government">Government Official</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <Button
                                width="full"
                                mt={4}
                                type="submit"
                                isLoading={isLoading}
                                colorScheme="blue"
                            >
                                {translate('common.login')}
                            </Button>
                        </form>
                        <Text mt={6} textAlign="center">
                            Don't have an account?{' '}
                            <Link as={RouterLink} to="/register" color="blue.500">
                                {translate('common.register')}
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
};

export default Login;