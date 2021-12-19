import { createContext, useContext, useMemo, useState } from "react";

const initialState = {
  isLoggedIn: false,
};

export const AppContext = createContext(initialState);

export const useAppContext = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const appContext = useMemo(() => ({
    isLoggedIn, setIsLoggedIn
  }), [isLoggedIn, setIsLoggedIn])

  return appContext;
}

export const useAppStore = () => {
  return useContext(AppContext);
}