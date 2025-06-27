import React from 'react'
import './ClashingStats.css'
import Sidebar from '../../Components/Sidebar'
import Logout from '../../Components/Logout'

export default function ClashingStats() {
  return (
    <div className='doaa-clashing-stats-container'>
        <Sidebar />
          <div className='doaa-clashing-stats-main'>
            <Logout/>
        </div>
    </div>
  )
}
