import React, {createContext, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const Context = createContext ();
export const ContextProvider = ({children}) => {
  const [IsDark, setIsDark] = useState (false);




  async function HandleIsDark () {
    const value = await AsyncStorage.getItem ('IsDark');
    if (value !== null) {
      let data = JSON.parse (value);
      setIsDark (data);
    } else {
      setIsDark (false);
    }
  }
  return (
    <Context.Provider
      value={{
        HandleIsDark,
        IsDark,
      }}
    >
      {children}
    </Context.Provider>
  );
};
