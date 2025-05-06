import React, { createContext, useState, useContext, useEffect } from 'react';

const languages = {
  en: {
    name: 'English',
    dir: 'ltr',
    translations: {
      common: {
        login: 'Login',
        register: 'Register',
        submit: 'Submit',
        cancel: 'Cancel',
        logout: 'Logout',
      },
      citizen: {
        dashboard: 'Citizen Dashboard',
        newReport: 'New Report',
        reportHistory: 'Report History',
        reportStatus: 'Report Status',
      },
      government: {
        dashboard: 'Government Dashboard',
        pendingReports: 'Pending Reports',
        processingReports: 'Processing Reports',
        completedReports: 'Completed Reports',
      },
      reportForm: {
        title: 'Report Title',
        description: 'Description',
        location: 'Location',
        shareLocation: 'Share My Location',
        uploadImage: 'Upload Image',
        recordAudio: 'Record Audio',
        selectDepartments: 'Select Departments',
      },
    },
  },
  id: {
    name: 'Bahasa Indonesia',
    dir: 'ltr',
    translations: {
      common: {
        login: 'Masuk',
        register: 'Daftar',
        submit: 'Kirim',
        cancel: 'Batal',
        logout: 'Keluar',
      },
      citizen: {
        dashboard: 'Dasbor Warga',
        newReport: 'Laporan Baru',
        reportHistory: 'Riwayat Laporan',
        reportStatus: 'Status Laporan',
      },
      government: {
        dashboard: 'Dasbor Pemerintah',
        pendingReports: 'Laporan Tertunda',
        processingReports: 'Laporan Diproses',
        completedReports: 'Laporan Selesai',
      },
      reportForm: {
        title: 'Judul Laporan',
        description: 'Deskripsi',
        location: 'Lokasi',
        shareLocation: 'Bagikan Lokasi Saya',
        uploadImage: 'Unggah Gambar',
        recordAudio: 'Rekam Audio',
        selectDepartments: 'Pilih Departemen',
      },
    },
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = languages[lang].dir;
  };

  const translate = (key) => {
    const keys = key.split('.');
    let result = languages[language].translations;

    for (const k of keys) {
      if (result[k] === undefined) {
        return key;
      }
      result = result[k];
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, languages, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);