import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Icon } from '@chakra-ui/react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, languages, changeLanguage } = useLanguage();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FaChevronDown />}
        leftIcon={<FaGlobe />}
        variant="ghost"
        color="white"
      >
        {languages[language].name}
      </MenuButton>
      <MenuList>
        {Object.keys(languages).map((lang) => (
          <MenuItem
            key={lang}
            color="black"
            onClick={() => changeLanguage(lang)}
            fontWeight={language === lang ? 'bold' : 'normal'}
          >
            {languages[lang].name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;