import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskBoard from "./components/TaskBoard";

export default function App() {
  return (
    <TaskProvider>
     {" "}
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] bg-fixed p-4 relative overflow-hidden">
      {/* Animated Background Sparkles */}{" "}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {" "}
          <div className="absolute animate-ping w-3 h-3 bg-pink-400 rounded-full top-1/4 left-1/3 opacity-20" />
         {" "}
          <div className="absolute animate-ping w-2 h-2 bg-yellow-300 rounded-full top-1/2 left-2/3 opacity-10" />
        {" "}
          <div className="absolute animate-ping w-4 h-4 bg-blue-400 rounded-full top-3/4 left-1/4 opacity-10" />
         {" "}
        </div>
         {/* Header */}{" "}
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg tracking-wide z-10 relative animate-fade-in-down">
           ✨ Kanban Task Board ✨ {" "}
        </h1>
       {/* Glass Panel */}{" "}
        <div className="mt-10 px-4 py-6 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-10 relative">
          <TaskBoard />{" "}
        </div>
        {" "}
      </div>
     {" "}
    </TaskProvider>
  );
}
