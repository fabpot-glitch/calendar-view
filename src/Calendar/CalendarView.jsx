import React, { useState } from "react";
import useCalendar from "../hooks/useCalendar";
import useEventStore from "../hooks/useEventStore";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";

export default function CalendarView() {
  const { currentDate, prevMonth, nextMonth, prevWeek, nextWeek, goToday } = useCalendar();
  const { events, addEvent, updateEvent, deleteEvent, eventsForDate } = useEventStore();
  const [mode, setMode] = useState("month"); // month | week
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function openCreate(date) {
    setEditing({ date });
    setModalOpen(true);
  }
  function openEdit(evt) {
    setEditing(evt);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  function handleSave(evt) {
    if (!evt.id) {
      addEvent({ ...evt, id: Date.now().toString() });
    } else {
      updateEvent(evt.id, evt);
    }
    closeModal();
  }

  function handleDelete(id) {
    deleteEvent(id);
    closeModal();
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => (mode === "month" ? prevMonth() : prevWeek())} className="p-2 rounded hover:bg-slate-100">
            ◀
          </button>
          <button onClick={() => (mode === "month" ? nextMonth() : nextWeek())} className="p-2 rounded hover:bg-slate-100">
            ▶
          </button>
          <button onClick={goToday} className="ml-2 px-3 py-1 rounded border text-sm">Today</button>

          <div className="ml-4 flex items-center gap-2 p-2 rounded bg-slate-50 border">
            <span className="text-sm text-slate-600">{currentDate.toLocaleString(undefined, { month: "long" })} {currentDate.getFullYear()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="border px-3 py-1 rounded text-sm">
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>

          <button onClick={() => openCreate(new Date())} className="bg-indigo-600 text-white px-4 py-1 rounded shadow-sm hover:bg-indigo-700">+ Add</button>
        </div>
      </div>

      {/* Views */}
      <div>
        {mode === "month" ? (
          <MonthView currentDate={currentDate} events={events} eventsForDate={eventsForDate} openModal={(d) => openCreate(d)} onEdit={openEdit} />
        ) : (
          <WeekView currentDate={currentDate} events={events} eventsForDate={eventsForDate} openModal={(d) => openCreate(d)} onEdit={openEdit} />
        )}
      </div>

      <EventModal
        isOpen={modalOpen}
        initial={editing}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
