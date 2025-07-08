import React from 'react'
import './HistoryTile.css'

export default function HistoryTile({data}) {

  var stage;
  if(data.stage === 5)
    stage = 'Accepted';
  else
    stage = 'Rejected';

  return (
    <div className='student-application-tile'>
          <div className='student-application-tile-id student-application-tile-elemnt'>
            <p>Application id : {data.application_id}</p>
          </div>
          <div className='student-application-tile-status student-application-tile-elemnt'>
            <p>Status : {stage}</p>
          </div>
          <div className='student-application-tile-pdf student-application-tile-elemnt'>
            <p>PDF link: <a href={data.url} target='blank'>Click Here</a></p>
          </div>
          <div className='student-application-tile-fee student-application-tile-elemnt'>
            Fee receipt : None
          </div>
    </div>
  )
}
