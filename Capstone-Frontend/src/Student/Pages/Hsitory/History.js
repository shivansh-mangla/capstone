import React from 'react'
import './History.css'
import Sidebar from '../../Components/Sidebar'
import Logout from '../../Components/Logout'
import HistoryTile from './HistoryComponents/HistoryTile'


export default function History() {
  return (
    <div className='student-history-container'>
        <Sidebar />
        <div className='student-history-main'>
            <Logout />
            <div className='student-history-tiles-area'>
                <h4>Your Applications</h4>
                <HistoryTile />
                  <HistoryTile />
                  <HistoryTile />
                  <HistoryTile />
                  <HistoryTile />
            </div>
        </div>
    </div>
  )
}
