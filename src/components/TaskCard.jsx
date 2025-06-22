import React from "react";
import { useTask } from "../context/TaskContext";

export default function TaskCard({ task }) {
  const { setTasks, tasks } = useTask();

  const deleteTask = () => {
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 via-blue-400 to-pink-400 p-3 rounded-lg shadow-sm backdrop-blur-sm border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-md">
      <h3 className="text-lg font-bold text-white drop-shadow-sm">
        {task.title}
      </h3>
      <p className="text-sm text-white/80">{task.description}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={deleteTask}
          className="text-sm text-red-200 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
