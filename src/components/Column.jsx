import React, { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Column({ status, tasks, onEditTask, onDeleteTask, onMoveTask }) {
  const statusColors = {
    "To Do": "from-purple-600 via-indigo-600 to-blue-600",
    "In Progress": "from-yellow-500 via-orange-400 to-pink-500",
    "Done": "from-green-500 via-emerald-400 to-teal-500",
  };

  useEffect(() => {
    const now = Date.now();
    tasks.forEach((task) => {
      if (status === "To Do" && task.deadline && now > task.deadline) {
        onMoveTask(task.id, { status: "In Progress" });
      }
      if (status === "In Progress" && task.completed) {
        onMoveTask(task.id, { status: "Done" });
      }
    });
  }, [tasks, status, onMoveTask]);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-2xl p-5 shadow-xl ring-1 ring-black/10 bg-gradient-to-br ${statusColors[status]} transform transition-all duration-300 hover:scale-[1.02]`}
        >
          <h2 className="text-2xl font-extrabold text-white tracking-wide text-center mb-5 drop-shadow-lg">
            {status === "To Do" && "📝 To Do"}
            {status === "In Progress" && "🚧 In Progress"}
            {status === "Done" && "✅ Done"}
          </h2>

          <div className="space-y-4 min-h-[200px] transition-all">
            {tasks.length === 0 ? (
              <div className="text-center text-white/80 italic animate-pulse">
                No tasks yet...
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 rounded-xl bg-white shadow flex justify-between items-center"
                    >
                      <div>
                        <div className="font-semibold">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                        {task.deadline && (
                          <div className="text-xs text-gray-400">
                            Deadline: {new Date(task.deadline).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEditTask(task.id)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
