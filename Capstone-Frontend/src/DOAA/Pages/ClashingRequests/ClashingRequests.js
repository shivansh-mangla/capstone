import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout.js'
import ClashingRequestList from './ClashingRequestComponents/ClashingRequestList.js'
import './ClashingRequests.css';

// const clashingData = {
//     CSED: [
//         { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
//         { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
//     ],
//     ECED: [
//         { name: 'Arnam Chaurasiya', year: 1, courses: 2, date: '01 March, 2024' },
//         { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
//     ],
//     MED: [
//         { name: 'Arnam Chaurasiya', year: 1, courses: 1, date: '01 March, 2024' },
//     ]
// };

const ClashingRequest = () => {
    const [allApplications, setAllApplications] = useState('');
    const [clashingData, setClashingData] = useState('');

    useEffect(() =>{
            const fetchApplications = async () =>{
                try {
                    const response = await fetch('http://localhost:5000/api/doaa/get-all-applications');
                    const data = await response.json();
                    console.log(data.data);
                    setAllApplications(data.data);
    
                    const clashing = [];
    
                    data.data.forEach((app) => {
                        if(app.clashing === true)
                            clashing.push(app);
                    });
                    
                    console.log(clashing);
                    setClashingData(clashing);

                } catch (error) {
                    console.error('Error fetching applications data:', error);
                  }
            };
    
            fetchApplications();
        }, []);


    return (
        <div className="clashing-request-container">
            <Sidebar />
            <div className="clashing-request-main">
                <Logout />

                {/* {Object.entries(clashingData).map(([deptName, deptData]) => ( */}
                    <ClashingRequestList
                        // key={deptName}
                        data={clashingData}
                        department={"CSED"}
                    />
                {/* ))} */}

            </div>
        </div>
    );
};

export default ClashingRequest;
