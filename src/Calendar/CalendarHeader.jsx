import React from 'react';

const CalendarHeader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontWeight: 'bold'
    }}>
      <button>{'<'}</button>
      <span>November 2025</span>
      <button>{'>'}</button>
    </div>
  );
};

export default CalendarHeader;
