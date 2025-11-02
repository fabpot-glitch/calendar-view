import React from "react";
import CalendarView from "./Calendar/CalendarView";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">My Calendar</h1>
          <div className="text-sm text-slate-500">Built with React + Tailwind</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
