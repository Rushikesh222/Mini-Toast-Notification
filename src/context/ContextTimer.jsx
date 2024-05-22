import { createContext, useContext, useReducer } from "react";

const TimerContext = createContext();
export const TimeProvider = ({ children }) => {
  const [state, dispatch] = useReducer();
  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
export const useTimer = () => useContext(TimerContext);
