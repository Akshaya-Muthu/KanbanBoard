import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ status, tasks }) {
  const statusColors = {
    "To Do": "from-purple-600 via-indigo-600 to-blue-600",
    "In Progress": "from-yellow-500 via-orange-400 to-pink-500",
    Done: "from-green-500 via-emerald-400 to-teal-500",
  };

  return (
    <div
      className={`rounded-2xl p-5 shadow-xl ring-1 ring-black/10 bg-gradient-to-br ${statusColors[status]} transform transition-all duration-300 hover:scale-[1.02]`}
    >
      <h2 className="text-2xl font-extrabold text-white tracking-wide text-center mb-5 drop-shadow-lg animate-fadeIn">
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
            <TaskCard key={task.id} task={task} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
