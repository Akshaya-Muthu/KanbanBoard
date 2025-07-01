import React, { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";

export default function TaskBoard() {
  const { tasks, updateTask, deleteTask } = useTask();
  const [activeTab, setActiveTab] = useState("existing");

  const taskColumns = {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  };

  tasks.forEach((task) => {
    if (taskColumns[task.status]) {
      taskColumns[task.status].push(task);
    }
  });

  useEffect(() => {
    const now = Date.now();
    tasks.forEach((task) => {
      if (task.status === "To Do" && task.deadline && now > task.deadline) {
        updateTask(task.id, { status: "In Progress" });
      }
      if (task.status === "In Progress" && task.doneDeadline && now > task.doneDeadline) {
        updateTask(task.id, { status: "Done", completed: true });
      }
    });
  }, [tasks, updateTask]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    updateTask(result.draggableId, { status: result.destination.droppableId });
  };

  const handleEditTask = (id) => {
    const newTitle = prompt("New Title?");
    if (newTitle) updateTask(id, { title: newTitle });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-4 text-white">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 border rounded ${activeTab === "new" ? "bg-white text-black" : ""}`}
        >
          🆕 New Task
        </button>
        <button
          onClick={() => setActiveTab("existing")}
          className={`px-4 py-2 border rounded ${activeTab === "existing" ? "bg-white text-black" : ""}`}
        >
          📋 Existing Tasks
        </button>
      </div>

      {activeTab === "new" && <TaskForm />}

      {activeTab === "existing" && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(taskColumns).map(([status, list]) => (
              <Column
                key={status}
                status={status}
                tasks={list}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={updateTask}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
