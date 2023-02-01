import { createContext } from "react";
import { IAppContext, IAppProvider } from "./interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFlashCard } from "./interfaces";

const backendUrl = "http://localhost:4004";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [flashCards, setFlashCards] = useState<IFlashCard[]>([]);
  const [adminIsOnline, setAdminIsOnline] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isEditingWelcomeMessage, setIsEditingWelcomeMessage] = useState(false);

  const loadFlashCards = async () => {
    const _flashCards: IFlashCard[] = (
      await axios.get(`${backendUrl}/flashcards`)
    ).data;
    setFlashCards(_flashCards);
  };

  useEffect(() => {
    // (async () => {
    //   const _flashCards: IFlashCard[] = (
    //     await axios.get(`${backendUrl}/flashcards`)
    //   ).data;
    //   setFlashCards(_flashCards);
    // })();
    loadFlashCards();
  }, []);

  useEffect(() => {
    (async () => {
      const _message: string = (await axios.get(`${backendUrl}/welcomeMessage`))
        .data;
      setWelcomeMessage(_message);
    })();
  }, []);

  const turnOnWelcomeMessage = () => {
    setIsEditingWelcomeMessage(true);
  };

  /* 
    const saveWelcomeMsg = async () => {
    try {
      await axios.post(
        `${backendUrl}/welcomeMessage`,

        {
          message: welcomeMessage,
        }
      );
      setIsEditingWelcomeMessage(false);
    } catch (error) {
      console.log(error);
    }
  };
  */
  const saveWelcomeMsg = async () => {
    try {
      await axios.post(
        `${backendUrl}/welcomeMessage`,

        {
          message: welcomeMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsEditingWelcomeMessage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        flashCards,
        adminIsOnline,
        welcomeMessage,
        turnOnWelcomeMessage,
        isEditingWelcomeMessage,
        setWelcomeMessage,
        saveWelcomeMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
