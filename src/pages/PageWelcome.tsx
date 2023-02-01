import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageWelcome = () => {
  const {
    flashCards,
    adminIsOnline,
    welcomeMessage,
    turnOnWelcomeMessage,
    isEditingWelcomeMessage,
    setWelcomeMessage,
    saveWelcomeMsg,
    deleteFlashcard,
  } = useContext(AppContext);
  return (
    <div className="page pageWelcome">
      <div className="row">
        {!isEditingWelcomeMessage && <p>{welcomeMessage}</p>}
        {adminIsOnline && (
          <div className="editWelcomeMsg">
            {isEditingWelcomeMessage ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  value={welcomeMessage}
                />
                <button className="editButton" onClick={saveWelcomeMsg}>
                  Save
                </button>
              </>
            ) : (
              <button className="editButton" onClick={turnOnWelcomeMessage}>
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flashcards">
        {flashCards.map((flashCard) => {
          return (
            <div className="flashcard" key={flashCard.id}>
              <span className="front">{flashCard.front}</span>
              <span className="back">{flashCard.back}</span>
              <div>
                {adminIsOnline && (
                  <button onClick={() => deleteFlashcard(flashCard)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
