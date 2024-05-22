import axios from "axios";
import React, { useState } from "react";

export const TimerThird = () => {
  const [apiData, setApiData] = useState([]);
  const [displayData, setDisplayData] = useState(true);

  const [time, setTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const API = "https://api.knowmee.co/api/v1/master/get-country-list";

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
    setDisplayData(false);
    setTimeout(() => {
      getData();
    }, time * 1000);
    setTime("");
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
    </div>
  );
};
