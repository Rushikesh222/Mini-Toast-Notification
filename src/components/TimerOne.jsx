import React, { useEffect, useState } from "react";

export const TimerOne = () => {
  const [time, setTime] = useState(7);
  const [modal, setModal] = useState();
  const [currentNumber, setCurrentNumber] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleNotice = (e) => {
    e.preventDefault();
    console.log(time);
  };
  const addTestMessage = () => {
    const newMessage = `Testing:  ${currentNumber}`;
    setCurrentNumber(currentNumber + 1);
    setDisplayedItems((prevDisplayedMessage) => {
      const newDisplayedItems = [newMessage, ...prevDisplayedMessage];
      return newDisplayedItems.slice(0, 3);
    });

    setTimeout(() => {
      console.log("hello");
      console.log(displayedItems);
      setDisplayedItems((prevDisplayedItems) => {
        const newDisplayedItems = prevDisplayedItems.slice(0, -1);
        return newDisplayedItems;
      });
    }, time * 1000);
  };
  const removeItem = (index) => {
    console.log(index);
    console.log("hello");
    setDisplayedItems((prevDisplayedItems) =>
      prevDisplayedItems.filter((_, i) => i !== index)
    );
  };
  return (
    <div className="input-container">
      <button className="btn-message" onClick={addTestMessage}>
        {" "}
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
