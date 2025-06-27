import React from 'react'
import StudentSidebar from '../../Components/Sidebar'
import './Fees.css'

const StudentFees = () => {
  return (
    <div>
      <StudentSidebar />
      <div className="student-main-fees">
        <h1>Fees Section</h1>
        <h4>Pay your fees here</h4>
        <div className="student-main-fees-top">
          <h2>Application ID: #1244</h2>
          <div className="fees-breakdown-table">
            <p className='fees-breakdown-table-cell'>Courses</p>
            <p className='fees-breakdown-table-cell'>Fees Amount</p>
            <p className='fees-breakdown-table-cell'>1. Energy and Enviornment</p>
            <p className='fees-breakdown-table-cell'>Rs. 8000</p>
            <p className='fees-breakdown-table-cell'>2. Data Structures</p>
            <p className='fees-breakdown-table-cell'>Rs. 6000</p>
            <p className='fees-breakdown-table-cell'>Total</p>
            <p className='fees-breakdown-table-cell'>Rs. 14000</p>
          </div>
        </div>
        <div className="student-main-fees-middle">
          <h2>You have to pay Rs. 98722</h2>
          <div className="student-main-fees-middle-left">
            <p>Pay using UPI by scanning this QR code</p>
          </div>
          <div className="student-main-fees-middle-right">
            <p>Pay using Eazy Pay</p>
          </div>
        </div>
        <div className="student-main-fees-bottom">
          <h2>Upload Fees Reciept here in PDF form</h2>
          <form>
            <input type="file"/>
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentFees
