import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(), // unique id
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
