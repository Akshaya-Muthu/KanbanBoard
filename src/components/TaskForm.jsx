import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [doneDeadline, setDoneDeadline] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline || !doneDeadline) return;

    addTask({
      title,
      description,
      deadline: new Date(deadline).getTime(),       // for To Do → In Progress
      doneDeadline: new Date(doneDeadline).getTime(), // for In Progress → Done
      status: "To Do",
      completed: false,
    });

    setTitle("");
    setDescription("");
    setDeadline("");
    setDoneDeadline("");
    setShowAddTask(false);
  };

  return (
    <main className="p-4 bg-slate-900 text-white rounded-xl max-w-lg mx-auto">
      <button
        onClick={() => setShowAddTask(!showAddTask)}
        className="mb-4 bg-white text-black px-4 py-2 rounded shadow"
      >
        {showAddTask ? "Close Form" : "➕ Add New Task"}
      </button>

      {showAddTask && (
        <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded">
          <label>Title</label>
          <input
            type="text"
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description</label>
          <textarea
            className="w-full mb-2 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Deadline (To Do → In Progress)</label>
          <input
            type="datetime-local"
            className="w-full mb-2 p-2 border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <label>Done Deadline (In Progress → Done)</label>
          <input
            type="datetime-local"
            className="w-full mb-2 p-2 border rounded"
            value={doneDeadline}
            onChange={(e) => setDoneDeadline(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>
      )}
    </main>
  );
}
