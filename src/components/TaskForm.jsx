import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm() {
  const { setTasks, tasks } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: "To Do",
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  return (
    <>
           {" "}
      <style>{`
.creative-gradient-bg {
 min-height: 100vh;
  background: linear-gradient(135deg, #3b0764 0%, #1e3a8a 100%);
   display: flex;
flex-direction: column;
align-items: center;
padding: 4rem 1rem;
font-family: "Inter", sans-serif;
 }

.add-task-card {
background: #ffffff;
 border-radius: 1rem;
  padding: 3rem 3rem;
 max-width: 720px;
 width: 100%;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.4), 0 12px 30px rgba(0, 0, 0, 0.2);
 position: relative;
 z-index: 1;
 animation: fadeIn 1s ease;
 transition: transform 0.3s ease;
 }

 .add-task-card:hover {
 transform: scale(1.01);
 }

 h2 {
 font-size: 2.5rem;
 font-weight: 900;
 color: #1e293b;
 margin-bottom: 2rem;
 text-align: center;
 }

 form label {
 display: block;
 margin-bottom: 0.5rem;
 font-size: 1.125rem;
 font-weight: 600;
 color: #475569;
 }

 form input,
 form textarea {
 width: 100%;
 padding: 1rem 1.25rem;
 border-radius: 0.5rem;
 border: 2px solid #e5e7eb;
 font-size: 1rem;
 margin-bottom: 1.5rem;
 transition: border-color 0.3s ease;
 }

 form input:focus,
 form textarea:focus {
border-color: #6366f1;
outline: none;
 }
 .submit-btn {
background: linear-gradient(to right, #6366f1, #7c3aed);
 color: white;
 font-weight: 700;
 padding: 1rem 2.5rem;
 border: none;
 border-radius: 0.75rem;
cursor: pointer;
 font-size: 1.125rem;
 transition: background 0.3s ease, transform 0.2s ease;
 }
.submit-btn:hover {
 background: linear-gradient(to right, #4f46e5, #6d28d9);
 }

 .toggle-btn {
 background-color: #ffffff;
 color: #1e293b;
 border: 2px solid #94a3b8;
 font-weight: 600;
padding: 1rem 2rem;
 border-radius: 0.75rem;
margin-bottom: 2rem;
 cursor: pointer;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
 }
 .toggle-btn:hover {
background-color: #e0e7ff;
 border-color: #6366f1;
 }

@keyframes fadeIn {
 from {
 transform: translateY(-20px);
 }
 to {
opacity: 1;
 transform: translateY(0);
 }
 }
 `}</style>{" "}
      <main className="creative-gradient-bg">
        {" "}
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          {showAddTask ? "Close Task Form" : "➕ Add New Task"}{" "}
        </button>{" "}
        {showAddTask && (
          <section className="add-task-card" aria-label="Add new task">
            <h2>✨ Add a New Task</h2>{" "}
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Task Title</label>{" "}
              <input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="description">Description</label>{" "}
              <textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />{" "}
              <button type="submit" className="submit-btn">
                Add Task
              </button>{" "}
            </form>{" "}
          </section>
        )}{" "}
      </main>{" "}
    </>
  );
}
