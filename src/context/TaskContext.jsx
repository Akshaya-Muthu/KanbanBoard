import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const initialData = JSON.parse(localStorage.getItem("tasks")) || [];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialData);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);