import React from 'react';
import './TimeTable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = ['8:00 AM', '8:50 AM', '9:40 AM', '10:30 AM', '11:20 AM', '12:10 PM', '1:00 PM', '1:50 PM', '2:40 PM', '3:30 PM', '4:20 PM', '5:10 PM'];
// const hours = ['8-8:50', '8:50-9:40', '9:40-10:30', '10:30-11:20', '11:20-12:10', '12:10-1', '1-1:50', '1:50-2:40', '2:40-3:30', '3:30-4:20', '4:20-5:10', '5:10-6'];

const events = [
  { day: 'Monday', hour: '8:00 AM', subjectName: 'Computer Network', subjectCode: 'UCS 980', venue: 'LT301', color: '#FFD700' },
  { day: 'Wednesday', hour: '11:20 AM', subjectName: 'Computer Network', subjectCode: 'UCS 980', venue: 'LT301', color: '#90EE90' },
  { day: 'Wednesday', hour: '12:10 PM', subjectName: 'Computer Network', subjectCode: 'UCS 980', venue: 'LT301', color: '#90EE90' },
  { day: 'Friday', hour: '1 PM', subjectCode: 'English', color: '#ADD8E6' },
];


const Timetable = () => {

    const getEvent = (day, hour) => {
      return events.find((event) => event.day === day && event.hour === hour);
    };

    console.log(getEvent('Monday', '9 AM'));


  return (
    <div className="timetable">
      <div className="cell header"></div>
      {hours.map((hour) => (
        <div key={hour} className="cell header">{hour}</div>
      ))}

      {days.map((day) => (
        <React.Fragment>
          <div className="cell header">{day}</div>

          {hours.map((hour) => {
            const event = getEvent(day, hour);
            return (
              <div className="cell" style={{ backgroundColor: event?.color || 'white' }}>
                <p className='subname'>{event ? event.subjectName : ''}</p>
                <p>{event ? event.subjectCode : ''}</p>
                <p>{event ? event.venue : ''}</p>
              </div>
            )
          })}
        </React.Fragment>
      ))}


    </div>
  );
};

export default Timetable;
