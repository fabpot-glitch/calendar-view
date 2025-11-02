import React from "react";
import CalendarCell from "./CalendarCell";
import { getWeekGrid } from "../utils/calendarUtils";

export default function WeekView({
  currentDate,
  events = [],
  openModal,
  onEdit,
  eventsForDate,
}) {
  const days = getWeekGrid(currentDate);

  // ✅ Enhanced fallback logic with better error handling
  const getEventsForDay = (day) => {
    try {
      if (typeof eventsForDate === "function") {
        return eventsForDate(day);
      }
      // Fallback to basic filtering if eventsForDate is not provided
      return events.filter(
        (event) => 
          event?.date && 
          new Date(event.date).toDateString() === day.toDateString()
      );
    } catch (error) {
      console.error("Error getting events for day:", error);
      return [];
    }
  };

  // Format weekday header
  const formatWeekdayHeader = (date) => {
    return date.toLocaleDateString(undefined, { 
      weekday: "short" 
    });
  };

  // Format date subheader
  const formatDateSubheader = (date) => {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4">
      {/* Weekday header row */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm text-slate-500 font-semibold">
        {days.map((day) => (
          <div key={day.toISOString()} className="text-center uppercase">
            <div>{formatWeekdayHeader(day)}</div>
            <div className="text-xs text-slate-400">
              {formatDateSubheader(day)}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar grid for the week */}
      <div className="calendar-grid grid grid-cols-7 gap-2">
        {days.map((day) => (
          <CalendarCell
            key={day.toISOString()}
            date={day}
            events={getEventsForDay(day)}
            openModal={() => openModal?.(day)}
            onEdit={onEdit}
            weekView
          />
        ))}
      </div>
    </div>
  );
}