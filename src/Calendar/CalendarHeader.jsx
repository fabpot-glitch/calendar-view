// src/Calendar/CalendarHeader.jsx
import React from "react";
import { format } from "date-fns";

export default function CalendarHeader({ currentDate, onPrevious, onNext }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrevious}
        className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
      >
        Previous
      </button>
      <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
      <button
        onClick={onNext}
        className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
      >
        Next
      </button>
    </div>
  );
}
