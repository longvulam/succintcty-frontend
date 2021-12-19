import { createContext, useContext, useMemo, useState } from "react";

interface IAppContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const AppContextDefaultState = {
  isLoggedIn: false,
  setIsLoggedIn: () => ""
};

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const useAppContext = (): IAppContext => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appContext = useMemo(() => ({
    isLoggedIn, setIsLoggedIn
  }), [isLoggedIn, setIsLoggedIn])

  return appContext;
}

export const useAppStore = (): IAppContext => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('usePostsContext must be used within the PostsContext.Provider');
  }
  return appContext;
}