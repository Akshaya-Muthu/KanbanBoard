import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index, onEdit, onDelete }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
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
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
