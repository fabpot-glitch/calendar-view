// src/Calendar/Calendar.stories.jsx
import React, { useState } from "react";
import { addDays, format } from "date-fns";

// Mock CalendarHeader
const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  const prevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    onMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
      <button onClick={prevMonth}>{"<"}</button>
      <h2>{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth}>{">"}</button>
    </div>
  );
};

// Mock CalendarGrid
const CalendarGrid = ({ selectedDate, onDateSelect, events }) => {
  const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  const days = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
      {days.map((day) => {
        const isToday = day.toDateString() === new Date().toDateString();
        const dayEvents = events.filter((e) => e.date.toDateString() === day.toDateString());

        return (
          <div
            key={day.toISOString()}
            onClick={() => onDateSelect(new Date(day))}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: isToday ? "#def" : "#fff",
              cursor: "pointer",
            }}
          >
            <div>{day.getDate()}</div>
            {dayEvents.map((e) => (
              <div key={e.id} style={{ fontSize: "0.7rem", color: "green" }}>
                {e.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// Storybook default export
export default {
  title: "Components/Calendar",
  component: CalendarGrid,
  argTypes: {
    selectedDate: { control: "date" },
  },
};

// Story template
const Template = (args) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    { id: 1, date: new Date(), title: "Today Event" },
    { id: 2, date: addDays(new Date(), 2), title: "Future Event" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <CalendarHeader currentMonth={selectedDate} onMonthChange={setSelectedDate} />
      <CalendarGrid selectedDate={selectedDate} onDateSelect={setSelectedDate} events={events} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
