import axios from "axios";
import { createContext, useContext, useState } from "react";
const TimerContext = createContext();
export const TimeProvider = ({ children }) => {
  const [modal, setModal] = useState();
  const [apiData, setApiData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [message, setMessage] = useState("");
  const url = "https://api.knowmee.co/api/v1/master/get-country-list";

  const getData = async () => {
    try {
      const { data, status } = await axios(url);
      if (status === 200) {
        setApiData(data.responseData);
      } else {
        console.log("somethig wents wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeItem = (index) => {
    setDisplayedItems((prevDisplayedItems) =>
      prevDisplayedItems.filter((_, i) => i !== index)
    );
  };
  const handleNotice = (e) => {
    e.preventDefault();
    setModal(false);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <TimerContext.Provider
      value={{
        setModal,
        modal,
        currentNumber,
        setCurrentNumber,
        message,
        setMessage,
        displayedItems,
        setDisplayedItems,
        apiData,
        handleMessage,
        removeItem,
        handleNotice,
        getData,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
export const useTimer = () => useContext(TimerContext);
