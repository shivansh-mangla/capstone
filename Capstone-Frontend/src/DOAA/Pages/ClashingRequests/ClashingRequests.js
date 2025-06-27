import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout.js'
import ClashingRequestList from './ClashingRequestComponents/ClashingRequestList.js'
import './ClashingRequests.css';

const clashingData = {
    CSED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
        { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
    ],
    ECED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 2, date: '01 March, 2024' },
        { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
    ],
    MED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 1, date: '01 March, 2024' },
    ]
};

const ClashingRequest = () => {
    

    return (
        <div className="clashing-request-container">
            <Sidebar />
            <div className="clashing-request-main">
                <Logout />

                {Object.entries(clashingData).map(([deptName, deptData]) => (
                    <ClashingRequestList
                        key={deptName}
                        data={deptData}
                        department={deptName}
                    />
                ))}

            </div>
        </div>
    );
};

export default ClashingRequest;
