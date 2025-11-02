import React from "react";
import CalendarCell from "./CalendarCell";
import { getCalendarGrid } from "../utils/calendarUtils";

export default function MonthView({
  currentDate,
  events = [],
  openModal,
  onEdit,
  eventsForDate,
}) {
  const days = getCalendarGrid(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ fallback function if eventsForDate isn't passed
  const getEventsForDay = (day) => {
    if (eventsForDate) return eventsForDate(day);
    return events.filter(
      (e) => new Date(e.date).toDateString() === day.toDateString()
    );
  };

  return (
    <div className="p-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm text-slate-500 font-semibold">
        {weekdays.map((w) => (
          <div key={w} className="text-center uppercase tracking-wide">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid grid grid-cols-7 gap-2">
        {days.map((day) => (
          <CalendarCell
            key={day.toISOString()}
            date={day}
            events={getEventsForDay(day)} // ✅ fixed event handling
            openModal={() => openModal(day)}
            onEdit={onEdit}
            month={currentDate.getMonth()}
          />
        ))}
      </div>
    </div>
  );
}
