import React from 'react';
import './TimeTable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = ['8:00 AM', '8:50 AM', '9:40 AM', '10:30 AM', '11:20 AM', '12:10 PM', '1:00 PM', '1:50 PM', '2:40 PM', '3:30 PM', '4:20 PM', '5:10 PM', '6:00 PM'];
// const hours = ['8-8:50', '8:50-9:40', '9:40-10:30', '10:30-11:20', '11:20-12:10', '12:10-1', '1-1:50', '1:50-2:40', '2:40-3:30', '3:30-4:20', '4:20-5:10', '5:10-6'];


const Timetable = ({data, ed}) => {
  console.log(ed);
  console.log(data);
  // ed = ['UCS551', 'UCS664', 'UCS749', 'UCS748'];
  var events = [{
            "color": "#FFD700",
            "day": "Monday",
            "hour": "9:40 AM",
            "subjectCode": "UHU003",
            "subjectName": "Professional Communication",
            "venue": "LP101"
        }];
  
  if (data && Array.isArray(data)) {
    events = data;
  }


  const getEvent = (day, hour) => {
    return events.filter((event) => event.day === day && event.hour === hour);
  };


  return (
    <div className="timetable">
      <div className="cell header"></div>
      {hours.map((hour) => (
        <div key={hour} className="cell header">{hour}</div>
      ))}

      {days.map((day) => (
        <React.Fragment key={day}>
          <div className="cell header">{day}</div>

          {hours.map((hour) => {
            const eventz = getEvent(day, hour);
            if(eventz.length === 1){
              // no clashing
              const event = eventz[0];
              if(event.color === "#FFC0CB"){
                // elective course
                if(ed.includes(event.subjectCode)){
                  return (
                    <div className="cell" style={{ backgroundColor: event?.color || 'white' }} key={hour}>
                      <p className='subname'>{event ? event.subjectName : ''}</p>
                      <p>{event ? event.subjectCode : ''}</p>
                      <p>{event ? event.venue : ''}</p>
                    </div>
                  )
                }
                else{
                  return(
                    <div className="cell" style={{ backgroundColor:'white' }} key={hour}>
                    </div>
                  )
                }
              }
              else{
                // not elective course
                return (
                  <div className="cell" style={{ backgroundColor: event?.color || 'white' }} key={hour}>
                    <p className='subname'>{event ? event.subjectName : ''}</p>
                    <p>{event ? event.subjectCode : ''}</p>
                    <p>{event ? event.venue : ''}</p>
                  </div>
                )
              }
            }
            else if(eventz.length > 1){
              //clashing (multiple events at same time)

              //check if it is an elective and inside my elective list
              const preferredEvent1 = eventz.find((event) => event.color === "#FFC0CB" && ed.includes(event.subjectCode));
              const preferredEvent2 = eventz.find((event) => event.color !== "#FFC0CB");

              if(preferredEvent1){
                return (
                    <div className="cell" style={{ backgroundColor: preferredEvent1?.color || 'white' }} key={hour}>
                      <p className='subname'>{preferredEvent1 ? preferredEvent1.subjectName : ''}</p>
                      <p>{preferredEvent1 ? preferredEvent1.subjectCode : ''}</p>
                      <p>{preferredEvent1 ? preferredEvent1.venue : ''}</p>
                    </div>
                  )
              }
              else if(preferredEvent2){
                return (
                    <div className="cell" style={{ backgroundColor: preferredEvent2?.color || 'white' }} key={hour}>
                      <p className='subname'>{preferredEvent2 ? preferredEvent2.subjectName : ''}</p>
                      <p>{preferredEvent2 ? preferredEvent2.subjectCode : ''}</p>
                      <p>{preferredEvent2 ? preferredEvent2.venue : ''}</p>
                    </div>
                  )
              }
              else{
                return(
                  <div className="cell" style={{ backgroundColor:'white' }} key={hour}>
                  </div>
                )
              }
            }
            else if(eventz.length === 0){
              // no event found at the cell
              return(
                <div className="cell" style={{ backgroundColor:'white' }} key={hour}>
                </div>
              )
            }
            
                
          })}
        </React.Fragment>
      ))}


    </div>
  );
};

export default Timetable;