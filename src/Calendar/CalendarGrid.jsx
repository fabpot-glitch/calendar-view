// src/Calendar/CalendarGrid.jsx
import React from "react";
import CalendarCell from "./CalendarCell";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";

export default function CalendarGrid({ currentDate, selectedDate, events = [], onDateSelect }) {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = events.filter(
        (evt) => new Date(evt.date).toDateString() === day.toDateString()
      );

      days.push(
        <CalendarCell
          key={day.toString()}
          date={day}
          events={dayEvents}
          onEdit={(evt) => console.log("Edit event:", evt)}
          onDateSelect={onDateSelect}
          month={currentDate.getMonth()}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-2 mb-2">
        {days}
      </div>
    );
    days = [];
  }

  return <div>{rows}</div>;
}
