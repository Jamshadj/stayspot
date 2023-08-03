import React from 'react';
import dayjs from 'dayjs';

function Calendar() {
  const currentMonth = dayjs();
  const nextMonth = currentMonth.add(1, 'month');

  const renderDays = (start, end) => {
    const days = [];
    const currentDate = start.startOf('day');

    // while (currentDate.isSameOrBefore(end, 'day')) {
    //   days.push(
    //     <div key={currentDate.format('YYYY-MM-DD')} className="day">
    //       {currentDate.format('D')}
    //     </div>
    //   );

    //   currentDate.add(1, 'day');
    // }

    return days;
  };

  return (
    <div className="flex justify-between max-w-400px mx-auto">
      <div className="month w-45% border border-gray-300 rounded p-4 shadow">
        <div className="month-header font-bold text-center mb-2">
          {currentMonth.format('MMMM YYYY')}
        </div>
        <div className="days grid grid-cols-7 gap-4">
          {renderDays(currentMonth.startOf('month'), currentMonth.endOf('month'))}
        </div>
      </div>
      <div className="month w-45% border border-gray-300 rounded p-4 shadow">
        <div className="month-header font-bold text-center mb-2">
          {nextMonth.format('MMMM YYYY')}
        </div>
        <div className="days grid grid-cols-7 gap-4">
          {renderDays(nextMonth.startOf('month'), nextMonth.endOf('month'))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
