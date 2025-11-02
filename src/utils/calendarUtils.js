import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  format,
  startOfDay
} from "date-fns";

/** Month grid including leading/trailing days */
export function getCalendarGrid(currentDate = new Date()) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const gridStart = startOfWeek(start, { weekStartsOn: 0 }); // Sunday
  const gridEnd = endOfWeek(end, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: startOfDay(gridStart), end: startOfDay(gridEnd) });
}

/** Week grid starting from week start (Sunday) */
export function getWeekGrid(currentDate = new Date()) {
  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: startOfDay(start), end: startOfDay(addDays(start, 6)) });
}

export function dateKey(date) {
  return format(date, "yyyy-MM-dd");
}
