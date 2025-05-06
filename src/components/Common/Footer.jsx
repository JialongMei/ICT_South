import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box as="footer" py={4} textAlign="center" bg="primary.500" color="white">
    <Text>&copy; {new Date().getFullYear()} Bandung Social Reporting</Text>
  </Box>
);

export default Footer;