export interface IFlashCard {
  id: number;
  category: string;
  front: string;
  back: string;
}

export interface IAppProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  flashCards: IFlashCard[];
  adminIsOnline: boolean;
  welcomeMessage: string;
  setWelcomeMessage: (welcomeMessage: string) => void;
  turnOnWelcomeMessage: () => void;
  isEditingWelcomeMessage: boolean;
  saveWelcomeMsg: () => void;
  deleteFlashcard: (flashcard: IFlashCard) => void;
}
