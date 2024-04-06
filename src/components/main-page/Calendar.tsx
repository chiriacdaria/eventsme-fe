import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Switch from 'react-switch';

const Calendar = () => {
  const localizer = momentLocalizer(moment);

  const [synced, setSynced] = useState(false); // State to manage syncing status

  const events = [
    {
      title: 'Meeting 1',
      start: new Date(2024, 2, 10, 10, 0),
      end: new Date(2024, 2, 10, 12, 0),
    },
    {
      title: 'Meeting 2',
      start: new Date(2024, 2, 15, 14, 0),
      end: new Date(2024, 2, 15, 16, 0),
    },
  ];

  const handleSyncToggle = () => {
    setSynced(!synced);
    // Implement logic for syncing or unsyncing based on the `synced` state
    if (synced) {
      console.log('Unsyncing...');
      // Implement unsync logic
    } else {
      console.log('Syncing...');
      // Implement sync logic
    }
  };

  return (
    <div className="flex flex-col h-full p-4 font-sans bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex items-center space-x-4">
          <span className="mr-2">Sync</span>
          <Switch
            onChange={handleSyncToggle}
            checked={synced}
            className="react-switch"
            height={24}
            width={48}
            onColor="#9bcf53"
            offColor="#dddddd"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Calendar;
