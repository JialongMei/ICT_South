import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <LanguageProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LanguageProvider>
        </ChakraProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    root.render(
      <div>Something went wrong. Please check the console.</div>
    );
  }
};

renderApp();