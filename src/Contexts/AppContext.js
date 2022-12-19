import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  return (
    <AppContext.Provider value={{todos, setTodos, todoInput, setTodoInput}}>
      {children}
    </AppContext.Provider>
  );
};