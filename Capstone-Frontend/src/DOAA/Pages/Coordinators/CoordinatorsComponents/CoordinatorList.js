import React from 'react'
import './CoordinatorList.css'
import {FaUser} from 'react-icons/fa'

export default function CoordinatorList({data, department}) {
  return (
    <div className='doaa-coordinator-table'>
          <h3>Coordinators</h3>
          <h4>{department}</h4>
          <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tenure</th>
                    <th>Designation</th>
                    <th>Mail ID</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) =>(
                    <tr>
                    <td className='doaa-coordinator-name-td'>
                      <FaUser className="doaa-coordinator-user-icon" /> 
                      <div>{row.name}</div>
                      </td>
                        <td>{row.tenure}</td>
                        <td>{row.designation}</td>
                        <td>{row.mail}</td>
                    </tr>
                ))}
            </tbody>
          </table>

    </div>
  )
}
