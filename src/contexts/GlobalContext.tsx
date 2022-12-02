import { ToastOptions, useIonToast } from "@ionic/react";
import { createContext, ReactNode, useContext } from "react";

type GlobalContextData = {
  presentToast: (props?: ToastOptions) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {

  const [present] = useIonToast();

  const presentToast = (props?: ToastOptions) => {
    present({
      duration: 2000,
      position: "top",
      color: "danger",
      ...props
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        presentToast
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
