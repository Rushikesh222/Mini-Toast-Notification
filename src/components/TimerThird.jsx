import React, { useRef, useState } from "react";
import { useTimer } from "../context/ContextTimer";

export const TimerThird = () => {
  const {
    displayedItems,
    setDisplayedItems,
    currentNumber,
    setCurrentNumber,
    getData,
    apiData,
  } = useTimer();

  const [displayData, setDisplayData] = useState(true);
  let [time, setTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const intervalRef = useRef(null);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = apiData.slice(startIndex, startIndex + itemsPerPage);

  const getFromData = (e) => {
    e.preventDefault();

    const newMessage = `${currentNumber}`;
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

    setTimeout(() => {
      getData();
      setDisplayData(false);
    }, time * 1000);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(apiData.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="Api-container">
      {displayData ? (
        <div className="counter-container">
          <form onSubmit={getFromData}>
            <label>Enter Countdown Time</label>
            <input
              type="number"
              placeholder="Enter Number Here"
              onChange={(e) => setTime(e.target.value)}
            />
            <button className="btn-message" type="submit">
              Start Timer
            </button>
          </form>
        </div>
      ) : (
        <div className="Api-content">
          {currentItems.length === 0 ? (
            <div>
              <h1>Data is Fetching</h1>
            </div>
          ) : (
            <div className="show-data-container">
              <div className="btn-container">
                <button
                  className="btn-message"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="btn-message"
                  onClick={handleNext}
                  disabled={
                    currentPage === Math.ceil(apiData.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
              <div className="Data-Content">
                {currentItems.map((items) => {
                  const { country_id, country_name } = items;
                  return (
                    <div className="country-content" key={country_id}>
                      <p>{country_name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="notification-container">
        {displayedItems?.map((item, index) => (
          <div className="notification-content-timer" key={index}>
            <p>
              {time}| {item}
            </p>
            <i class="fa-solid fa-xmark" onClick={() => removeItem(index)}></i>
          </div>
        ))}
      </div>
    </div>
  );
};
