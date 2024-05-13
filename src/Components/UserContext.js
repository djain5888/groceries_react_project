// UserContext.js

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState('');
  console.log("in user token",userProfile)

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
    