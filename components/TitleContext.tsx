// This component was made completely by ChatGPT

import React, { createContext, useState, useContext } from 'react';

const TitleContext = createContext<{ title: string; setTitle: React.Dispatch<React.SetStateAction<string>> }>({
  title: '',
  setTitle: () => {}
});

export const useTitle = () => useContext(TitleContext);

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('Default Title');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
