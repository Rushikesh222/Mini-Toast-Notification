import React, { useEffect, useState } from "react";
import { useTimer } from "../context/ContextTimer";

export const TimerOne = () => {
  const [time, setTime] = useState(7);
  const {
    setModal,
    modal,
    currentNumber,
    setCurrentNumber,
    setDisplayedItems,
    displayedItems,
    removeItem,
    handleNotice,
  } = useTimer();

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const addTestMessage = () => {
    const newMessage = `Testing:  ${currentNumber}`;
    setCurrentNumber(currentNumber + 1);
    setDisplayedItems((prevDisplayedMessage) => {
      const newDisplayedItems = [newMessage, ...prevDisplayedMessage];
      return newDisplayedItems.slice(0, 3);
    });

    setTimeout(() => {
      setDisplayedItems((prevDisplayedItems) => {
        const newDisplayedItems = prevDisplayedItems.slice(0, -1);
        return newDisplayedItems;
      });
    }, time * 1000);
  };

  return (
    <div className="input-container">
      <button className="btn-message" onClick={addTestMessage}>
        Show Toast message
      </button>
      <button className="btn-setting" onClick={() => setModal(true)}>
        <i class="fa-solid fa-gear"></i>
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <i class="fa-solid fa-xmark" onClick={() => setModal(false)}></i>
            <form className="timer-form" onSubmit={handleNotice}>
              <label className="lable-setTime">Set Timeout:</label>
              <input
                className="timer-input"
                type="number"
                onChange={(e) => setTime(e.target.value)}
              />
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      )}

      <div className="notification-container">
        {displayedItems?.map((item, index) => (
          <div className="notification-content" key={index}>
            <p>{item}</p>
            <i class="fa-solid fa-xmark" onClick={() => removeItem(index)}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerOne;
