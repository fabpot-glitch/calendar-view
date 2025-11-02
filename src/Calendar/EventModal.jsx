import React, { useEffect, useState } from "react";
import { dateKey } from "../utils/calendarUtils";

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-xl p-5 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default function EventModal({ isOpen, initial, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!initial) return;
    // initial can be { date: Date } for new event or full event object when editing
    if (initial && initial.date && !initial.id) {
      setId(null);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setColor("#6366f1");
      setDateStr(dateKey(initial.date));
    } else if (initial && initial.id) {
      setId(initial.id);
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setStartTime(initial.startTime || "");
      setEndTime(initial.endTime || "");
      setColor(initial.color || "#6366f1");
      setDateStr(initial.date || "");
    }
  }, [initial]);

  function handleSave() {
    if (!title || !dateStr) {
      alert("Please add a title and date.");
      return;
    }
    onSave({
      id,
      title,
      description,
      date: dateStr,
      startTime,
      endTime,
      color
    });
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <h3 className="text-lg font-semibold mb-3">{id ? "Edit Event" : "Create Event"}</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Date</label>
              <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Color</label>
              <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-20 h-10 p-0 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Start</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">End</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 rows-3" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {id && <button onClick={() => onDelete && onDelete(id)} className="text-red-600">Delete</button>}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">{id ? "Save" : "Create"}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
