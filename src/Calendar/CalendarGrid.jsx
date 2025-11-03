import React from 'react';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({ events = [], selectedDate, onDateClick }) => {
  // Example: show 7x5 grid for a month
  const days = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
      {days.map(day => (
        <CalendarCell
          key={day}
          date={`2025-11-${day.toString().padStart(2, '0')}`}
          events={events.filter(e => e.date === `2025-11-${day.toString().padStart(2, '0')}`)}
          isSelected={selectedDate === `2025-11-${day.toString().padStart(2, '0')}`}
          onClick={onDateClick}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
