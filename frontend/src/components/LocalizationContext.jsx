import React, { createContext, useContext, useState } from 'react';

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

export const LocalizationProvider = ({ children }) => {
  const [local, setLocal] = useState("Eng");

  return (
    <LocalizationContext.Provider value={{ local, setLocal }}>
      {children}
    </LocalizationContext.Provider>
  );
};
