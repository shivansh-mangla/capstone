import React from 'react'
import './HistoryTile.css'

export default function HistoryTile() {
  return (
    <div className='student-application-tile'>
          <div className='student-application-tile-id student-application-tile-elemnt'>
            Application id : 420
          </div>
          <div className='student-application-tile-status student-application-tile-elemnt'>
            Status : Chal Bhak!
          </div>
          <div className='student-application-tile-pdf student-application-tile-elemnt'>
            PDF: Khul bana lei
          </div>
          <div className='student-application-tile-fee student-application-tile-elemnt'>
            Fee receipt : Tere paas nahi hai?
          </div>
    </div>
  )
}
