import React from "react";
import { format, addMonths, subMonths } from "date-fns";

const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  const handlePrev = () => onMonthChange(subMonths(currentMonth, 1));
  const handleNext = () => onMonthChange(addMonths(currentMonth, 1));

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={handlePrev}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <h2 className="text-xl font-semibold text-center">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={handleNext}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        →
      </button>
    </div>
  );
};

export default CalendarHeader;
