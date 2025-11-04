import React, { useState } from "react";
import { CalendarHeader, CalendarGrid } from "./index";
import "../index.css"; // ✅ Correct relative path to main CSS

export default {
  title: "Components/Calendar",
  component: CalendarGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    { date: "2025-11-03", title: "Meeting with Team" },
    { date: "2025-11-05", title: "Client Demo" },
    { date: "2025-11-09", title: "Networking Event" },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem" }}>
      <CalendarHeader currentMonth={selectedDate} onMonthChange={setSelectedDate} />
      <CalendarGrid
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        events={events}
      />
    </div>
  );
};
