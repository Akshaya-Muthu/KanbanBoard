import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import Column from "./Column";

export default function TaskBoard() {
  const { tasks, addTask } = useTask();
  const [activeTab, setActiveTab] = useState("none");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const taskColumns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task) => {
    if (taskColumns[task.status]) {
      taskColumns[task.status].push(task);
    }
  });

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle,
      description: newDesc,
      status: "To Do",
    });
    setNewTitle("");
    setNewDesc("");
    setActiveTab("existing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-8 flex flex-col items-center text-white font-inter">
      <div className="mb-6 flex gap-4">
        <button
          className={`px-6 py-3 rounded-lg font-semibold border-2 ${
            activeTab === "new"
              ? "bg-white text-indigo-900 border-white"
              : "bg-transparent border-white hover:bg-white hover:text-indigo-900"
          } transition`}
          onClick={() => setActiveTab("new")}
        >
          🆕 New Task
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold border-2 ${
            activeTab === "existing"
              ? "bg-white text-indigo-900 border-white"
              : "bg-transparent border-white hover:bg-white hover:text-indigo-900"
          } transition`}
          onClick={() => setActiveTab("existing")}
        >
          📋 Existing Tasks
        </button>
      </div>

      {activeTab === "new" && (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl w-full max-w-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-pink-300 mb-4">
            Create New Task
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-white text-slate-800 placeholder-slate-500 outline-none focus:ring-2 ring-pink-400"
          />
          <textarea
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows="4"
            className="w-full p-3 mb-4 rounded-md bg-white text-slate-800 placeholder-slate-500 outline-none focus:ring-2 ring-pink-400"
          />
          <button
            onClick={handleAddTask}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-lg transition"
          >
            ➕ Add Task
          </button>
        </div>
      )}

      {activeTab === "existing" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-6xl">
          {Object.entries(taskColumns).map(([status, taskList]) => (
            <Column key={status} status={status} tasks={taskList} />
          ))}
        </div>
      )}
    </div>
  );
}
