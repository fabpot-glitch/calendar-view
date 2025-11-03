// src/Calendar/CalendarCell.jsx
import React from "react";
import { format, isToday, isSameMonth, isValid } from "date-fns";

export default function CalendarCell({
  date,
  events = [],
  openModal,
  onEdit,
  month,
  weekView = false,
}) {
  if (!isValid(date)) return <div>Invalid date</div>;

  let inMonth = true;
  if (!weekView && typeof month === "number") {
    const monthDate = new Date(date.getFullYear(), month, 1);
    inMonth = isSameMonth(date, monthDate);
  }

  const today = isToday(date);

  return (
    <div
      className={`relative p-3 border rounded-lg min-h-[120px] bg-white ${
        inMonth ? "" : "opacity-60"
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`text-sm font-medium ${today ? "text-indigo-600" : "text-slate-700"}`}>
          {format(date, "d")}
        </div>
        <button
          onClick={() => openModal && openModal(date)}
          className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
        >
          Add
        </button>
      </div>

      <div className="mt-2 space-y-2 max-h-[90px] overflow-y-auto pr-1">
        {events.length === 0 ? (
          <div className="text-xs text-slate-400">No events</div>
        ) : (
          events.map((evt) => {
            const evtDate = typeof evt.date === "string" ? new Date(evt.date) : evt.date;
            return (
              <div
                key={evt.id}
                onClick={() => onEdit && onEdit(evt)}
                className="cursor-pointer rounded-md p-1 text-xs flex items-center gap-2 hover:bg-indigo-50 transition"
                title={evt.title}
                style={{
                  backgroundColor: evt.color ? `${evt.color}20` : "rgba(99,102,241,0.08)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: evt.color || "#6366f1" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{evt.title}</div>
                  {(evt.startTime || evt.endTime) && (
                    <div className="text-[11px] text-slate-600">
                      {evt.startTime}
                      {evt.endTime ? ` - ${evt.endTime}` : ""}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {today && <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-indigo-500" />}
    </div>
  );
}
