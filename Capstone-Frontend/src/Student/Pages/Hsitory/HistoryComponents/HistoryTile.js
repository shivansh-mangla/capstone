import React from 'react'
import './HistoryTile.css'

export default function HistoryTile({data}) {
  return (
    <div className='student-application-tile'>
          <div className='student-application-tile-id student-application-tile-elemnt'>
            Application id : {data.application_id}
          </div>
          <div className='student-application-tile-status student-application-tile-elemnt'>
            Status : {data.stage}
          </div>
          <div className='student-application-tile-pdf student-application-tile-elemnt'>
            PDF: {data.url}
          </div>
          <div className='student-application-tile-fee student-application-tile-elemnt'>
            Fee receipt : Tere paas nahi hai?
          </div>
    </div>
  )
}
