import React from 'react'
import './HistoryTile.css'
import Timetable from '../../../Components/TimeTable';

export default function HistoryTile({data}) {

  var stage;
  if(data.stage === 5)
    stage = 'Accepted';
  else
    stage = 'Rejected';

  console.log(data);

  return (
    <div className='student-application-tile'>
      <h2>Application ID: {data.application_id}</h2>
      <h4>{stage}</h4>
      <br />
      {data.opted_courses.map((val, ind) =>{
        return(
          <h4>Opted {val[0]} in: {val[1]}</h4>
        )
      })}
      <br />
      <h3>Time Table formed:</h3>
      <Timetable data={data.new_time_table} ed={data.elective_data}/>
      <br />
      <h4>
        Application Form Link:{" "}
        <a href={data?.url} target="_blank" rel="noopener noreferrer">
          Click Here
        </a>
      </h4>

      <h4>
        Fees Receipt Link:{" "}
        <a href={data?.fee_receipt_link} target="_blank" rel="noopener noreferrer">
          Click Here
        </a>
      </h4>
      <br />
      <h4>Comments:</h4>
      {data.comments.map((val, ind) =>{
        return <h5>- {val}</h5>
      })}
    </div>
  )
}
