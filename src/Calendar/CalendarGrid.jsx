import React from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import CalendarCell from "./CalendarCell";

const CalendarGrid = ({ selectedDate, onDateSelect, events = [] }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="font-semibold">{day}</div>
      ))}

      {days.map((day) => (
        <CalendarCell
          key={day.toISOString()}
          date={day}
          isSelected={format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")}
          onSelect={onDateSelect}
          events={events.filter((e) => e.date === format(day, "yyyy-MM-dd"))}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
