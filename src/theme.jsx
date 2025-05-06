import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#bae7ff',
      500: '#1890ff',
      600: '#096dd9',
      700: '#0050b3',
    },
    secondary: {
      50: '#f9f0ff',
      100: '#d3adf7',
      500: '#722ed1',
      600: '#531dab',
      700: '#391085',
    },
  },
  fonts: {
    heading: 'Roboto, system-ui, sans-serif',
    body: 'Roboto, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
      },
    },
  },
});

export default theme;