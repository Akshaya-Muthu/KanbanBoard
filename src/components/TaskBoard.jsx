import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function TaskBoard() {
  const { tasks, addTask } = useTask();
  const [activeTab, setActiveTab] = useState("none");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const taskColumns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  }; // Group tasks by their status

  tasks.forEach((task) => {
    if (taskColumns[task.status]) {
      taskColumns[task.status].push(task);
    }
  }); // Handle adding a new task to "To Do"

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle,
      description: newDesc,
      status: "To Do", // ✅ This ensures it goes to the To Do column
    });
    setNewTitle("");
    setNewDesc("");
    setActiveTab("existing"); // ✅ Switch to existing view after adding
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-8 flex flex-col items-center text-white font-inter">
      {" "}
      <div className="mb-6 flex gap-4">
        {" "}
        <button
          className={`px-6 py-3 rounded-lg font-semibold border-2 ${
            activeTab === "new"
              ? "bg-white text-indigo-900 border-white"
              : "bg-transparent border-white hover:bg-white hover:text-indigo-900"
          } transition`}
          onClick={() => setActiveTab("new")}
        >
          🆕 New Task{" "}
        </button>{" "}
        <button
          className={`px-6 py-3 rounded-lg font-semibold border-2 ${
            activeTab === "existing"
              ? "bg-white text-indigo-900 border-white"
              : "bg-transparent border-white hover:bg-white hover:text-indigo-900"
          } transition`}
          onClick={() => setActiveTab("existing")}
        >
          📋 Existing Tasks{" "}
        </button>{" "}
      </div>{" "}
      {activeTab === "new" && (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl w-full max-w-lg shadow-2xl">
          {" "}
          <h2 className="text-2xl font-bold text-pink-300 mb-4">
            Create New Task
          </h2>{" "}
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-white text-slate-800 placeholder-slate-500 outline-none focus:ring-2 ring-pink-400"
          />{" "}
          <textarea
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows="4"
            className="w-full p-3 mb-4 rounded-md bg-white text-slate-800 placeholder-slate-500 outline-none focus:ring-2 ring-pink-400"
          />{" "}
          <button
            onClick={handleAddTask}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-lg transition"
          >
            ➕ Add Task{" "}
          </button>{" "}
        </div>
      )}
      {/* Existing Tasks View */}{" "}
      {activeTab === "existing" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-6xl">
          {" "}
          {Object.entries(taskColumns).map(([status, taskList]) => (
            <div
              key={status}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl"
            >
              {" "}
              <h3 className="text-xl font-bold text-center text-pink-300 mb-4">
                {status === "To Do" && "📝 To Do"}
                {status === "In Progress" && "🚧 In Progress"}{" "}
                {status === "Done" && "✅ Done"}{" "}
              </h3>{" "}
              {taskList.length === 0 ? (
                <p className="text-white/70 text-center italic">
                  No tasks here
                </p>
              ) : (
                taskList.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white text-slate-800 rounded-lg p-3 mb-4 border-l-4 border-pink-500 shadow-sm transition transform hover:scale-[1.02]"
                  >
                    {" "}
                    <h4 className="font-semibold text-lg">{task.title}</h4>     {" "}
                    <p className="text-sm text-slate-600 mt-1">
                      {task.description}
                    </p>{" "}
                  </div>
                ))
              )}{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}
