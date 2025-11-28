"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-3 border rounded bg-white shadow-sm"
    >
      <div className="flex justify-between">
        <h3 className="font-medium">{task.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-xs text-blue-600 underline"
        >
          Edit
        </button>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}
