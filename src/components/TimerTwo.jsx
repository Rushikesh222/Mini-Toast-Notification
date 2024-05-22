import React, { useState } from "react";

export const TimerTwo = () => {
  const [time, setTime] = useState(7);
  const [modal, setModal] = useState();
  const [currentNumber, setCurrentNumber] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [message, setMessage] = useState("");

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
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const addTestMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      number: currentNumber,
      message: message,
      label: "Testing",
    };
    setCurrentNumber(currentNumber + 1);
    setDisplayedItems((prevDisplayedMessage) => {
      const newDisplayedItems = [newMessage, ...prevDisplayedMessage];
      return newDisplayedItems.slice(0, 3);
    });
    setMessage("");

    setTimeout(() => {
      //   console.log("hello");
      console.log(displayedItems);
      setDisplayedItems((prevDisplayedItems) => {
        const newDisplayedItems = prevDisplayedItems.slice(0, -1);
        return newDisplayedItems;
      });
    }, time * 1000);
  };
  const removeItem = (index) => {
    setDisplayedItems((prevDisplayedItems) =>
      prevDisplayedItems.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="input-container">
      <form className="message-conatiner" onSubmit={addTestMessage}>
        <label>Enter Custom Toast text</label>
        <div className="message-input">
          <input
            type="text"
            placeholder="Enter text"
            value={message}
            onChange={handleMessage}
          />
          <button onClick={() => setModal(true)}>
            <i class="fa-solid fa-gear"></i>
          </button>
        </div>

        <button type="sumbit"> Show Toast message</button>
      </form>

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
            <p>
              {item.label}|{item.number}
            </p>
            <p>{item.message}</p>
            <i class="fa-solid fa-xmark" onClick={() => removeItem(index)}></i>
          </div>
        ))}
      </div>
    </div>
  );
};
