import { createContext } from "react";
import { IAppContext, IAppProvider } from "./interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFlashCard } from "./interfaces";

const backendUrl = "http://localhost:4004";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const appTitle = "Info Site";
  const [flashCards, setFlashCards] = useState<IFlashCard[]>([]);
  const [adminIsOnline, setAdminIsOnline] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isEditingWelcomeMessage, setIsEditingWelcomeMessage] = useState(false);
  const [appMessage, setAppMessage] = useState("");
  const [password, setPassword] = useState("");

  const loadFlashCards = async () => {
    const _flashCards: IFlashCard[] = (
      await axios.get(`${backendUrl}/flashcards`)
    ).data;
    setFlashCards(_flashCards);
  };

  useEffect(() => {
    loadFlashCards();
  }, []);

  const loadWelcomeMsg = async () => {
    const _welcomeMessage: string = (
      await axios.get(`${backendUrl}/welcomeMessage`)
    ).data;
    setWelcomeMessage(_welcomeMessage);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = (
          await axios.get(`${backendUrl}/currentuser`, {
            withCredentials: true,
          })
        ).data;
        if (user === "admin") {
          setAdminIsOnline(true);
        }
      } catch (e: any) {
        if (e.code !== "ERR_BAD_REQUEST") {
          const _appMessage = `Sorry, there was an unknown error (${e.code}).`;
          setAppMessage(_appMessage);
        }
      }
    })();
  }, []);

  useEffect(() => {
    loadWelcomeMsg();
  }, []);

  const deleteAppMessage = () => {
    setAppMessage("");
  };
  // parameter: 1 callback that is called when user is successfully logged in
  // kann auch 2. callback parameter: 2 callback that is called when user is logged in failed
  const loginAdmin = async (callback: () => void) => {
    let _appMessage = "";
    try {
      await axios.post(
        `${backendUrl}/login`,
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAdminIsOnline(true);
      callback();
    } catch (error: any) {
      switch (error.code) {
        case "ERR_BAD_REQUEST":
          _appMessage =
            "Sorry, credentials were incorrect, please attempt login again.";
          break;
        case "ERR_NETWORK":
          _appMessage =
            "Sorry, we aren't able to process your request at this time.";
          break;
        default:
          _appMessage = `Sorry, there was an unknown error (${error.code}).`;
          break;
      }
      setAdminIsOnline(false);
    }
    setAppMessage(_appMessage);
    setPassword("");
  };

  const logoutAdmin = async () => {
    try {
      const user = (
        await axios.get(`${backendUrl}/logout`, { withCredentials: true })
      ).data;
      setAdminIsOnline(false);
    } catch (error: any) {
      console.log(`There was a problem with the logout: ${error.message}`);
    }
  };
  const turnOnWelcomeMessage = () => {
    setIsEditingWelcomeMessage(true);
  };
  const saveWelcomeMsg = async () => {
    let _appMessage = "";
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
    } catch (error: any) {
      switch (error.code) {
        case "ERR_BAD_REQUEST":
          _appMessage =
            "Sorry, you had been logged out when you tried to save the welcome message. Please log in again.";
          break;
        case "ERR_NETWORK":
          _appMessage =
            "Sorry, we aren't able to process your request at this time.";
          break;
        default:
          _appMessage = `Sorry, there was an unknown error (${error.code}).`;
          break;
      }
      setAppMessage(_appMessage);
      setAdminIsOnline(false);
      loadWelcomeMsg();
      setIsEditingWelcomeMessage(false);
    }
  };

  const deleteFlashcard = async (flashcard: IFlashCard) => {
    let _appMessage = "";
    try {
      await axios.delete(`${backendUrl}/flashcards/${flashcard.id}`, {
        withCredentials: true,
      });
      const _flashCard = flashCards.filter(
        (m: IFlashCard) => m.id !== flashcard.id
      );
      setFlashCards(_flashCard);
      setAppMessage(`flashcard deleted`);
    } catch (error: any) {
      switch (error.code) {
        case "ERR_BAD_REQUEST":
          _appMessage =
            "Sorry, you had been logged out when you tried to save the welcome message. Please log in again.";
          break;
        case "ERR_NETWORK":
          _appMessage =
            "Sorry, we aren't able to process your request at this time.";
          break;
        default:
          _appMessage = `Sorry, there was an unknown error (${error.code}).`;
          break;
      }
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
        deleteFlashcard,
        loginAdmin,
        setPassword,
        logoutAdmin,
        appTitle,
        appMessage,
        deleteAppMessage,
        password,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
