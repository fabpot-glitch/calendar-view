// src/hooks/useEventStore.js
import { useEffect, useState } from "react";
import { dateKey } from "../utils/calendarUtils";

const STORAGE_KEY = "styled_calendar_events_v1";

/**
 Event shape:
 { id, title, description, date, startTime, endTime, color }
*/

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useEventStore() {
  const [events, setEvents] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore storage errors in private browsing etc.
    }
  }, [events]);

  function addEvent(evt) {
    setEvents(prev => [...prev, evt]);
  }

  function updateEvent(id, payload) {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...payload } : e)));
  }

  function deleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  function eventsForDate(d) {
    const key = dateKey(d);
    return events
      .filter(e => e.date === key)
      .sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
  }

  return { events, addEvent, updateEvent, deleteEvent, eventsForDate, setEvents };
}
