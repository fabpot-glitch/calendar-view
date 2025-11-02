import { useState } from "react";
import { addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

export default function useCalendar(initial = new Date()) {
  const [currentDate, setCurrentDate] = useState(initial);

  return {
    currentDate,
    nextMonth: () => setCurrentDate(d => addMonths(d, 1)),
    prevMonth: () => setCurrentDate(d => subMonths(d, 1)),
    nextWeek: () => setCurrentDate(d => addWeeks(d, 1)),
    prevWeek: () => setCurrentDate(d => subWeeks(d, 1)),
    goToday: () => setCurrentDate(new Date()),
    setDate: (d) => setCurrentDate(d)
  };
}
