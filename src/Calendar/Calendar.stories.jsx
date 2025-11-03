// src/Calendar/Calendar.stories.jsx
import React, { useState } from "react";
import { CalendarHeader, CalendarGrid } from "./index";

export default {
  title: "Components/Calendar",
  component: CalendarGrid,
  argTypes: {
    selectedDate: { control: "date" },
  },
};

// Mock events for the calendar
const mockEvents = [
  { id: 1, date: "2025-11-03", title: "Team Meeting" },
  { id: 2, date: "2025-11-05", title: "Project Deadline" },
  { id: 3, date: "2025-11-10", title: "Birthday Celebration" },
  { id: 4, date: "2025-11-15", title: "Doctor Appointment" },
];

// Default Calendar Story
export const Default = (args) => {
  const [selectedDate, setSelectedDate] = useState(new Date(args.selectedDate || new Date()));

  return (
    <div style={{ width: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <CalendarHeader
        currentDate={selectedDate}
        onPrevious={() =>
          setSelectedDate(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
          )
        }
        onNext={() =>
          setSelectedDate(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
          )
        }
      />
      <CalendarGrid
        currentDate={selectedDate}
        selectedDate={selectedDate}
        events={mockEvents}
        onDateSelect={(date) => setSelectedDate(date)}
      />
    </div>
  );
};

// Story showing a month with no events
export const EmptyMonth = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-12-01"));

  return (
    <div style={{ width: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <CalendarHeader
        currentDate={selectedDate}
        onPrevious={() =>
          setSelectedDate(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
          )
        }
        onNext={() =>
          setSelectedDate(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
          )
        }
      />
      <CalendarGrid
        currentDate={selectedDate}
        selectedDate={selectedDate}
        events={[]} // no events
        onDateSelect={(date) => setSelectedDate(date)}
      />
    </div>
  );
};
