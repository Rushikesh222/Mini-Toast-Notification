import axios from "axios";
import React, { useRef, useState } from "react";

export const TimerThird = () => {
  const [apiData, setApiData] = useState([]);
  const [displayData, setDisplayData] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);

  let [time, setTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const API = "https://api.knowmee.co/api/v1/master/get-country-list";

  const intervalRef = useRef(null);

  const getData = async () => {
    try {
      const { data, status } = await axios(API);
      if (status === 200) {
        setApiData(data.responseData);
      } else {
        console.log("somethig wents wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getFromData = (e) => {
    e.preventDefault();

    const newMessage = `${currentNumber}`;
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

    // setTime("");
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = apiData.slice(startIndex, startIndex + itemsPerPage);

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

  const removeItem = (index) => {
    console.log(index);
    console.log("hello");
    setDisplayedItems((prevDisplayedItems) =>
      prevDisplayedItems.filter((_, i) => i !== index)
    );
  };
  console.log(time);
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
