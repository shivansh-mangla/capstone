import React, { useEffect, useState } from 'react';
import '../../Dashboard/DashboardComponents/RequestList.css';
import './ClashingRequestList.css';
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';

const ClashingRequestList = ({ data, department }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });   // Manages the current sorting configuration (column key and direction)
    const [requests, setRequests] = useState(data);     // Stores the list of clashing requests (filtered when accepted/rejected)
    const [showModal, setShowModal] = useState(false);         // Controls the visibility of the rejection reason modal
    const [selectedRequest, setSelectedRequest] = useState(null);       // Keeps track of the currently selected request for rejection
    const [rejectionReason, setRejectionReason] = useState('');     // Stores the input text for the rejection reason


    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAccept = (row) => {
        console.log('Accepted:', row);
        setRequests((prev) => prev.filter((r) => r !== row));
    };

    const handleRejectClick = (row) => {
        setSelectedRequest(row);
        setShowModal(true);
    };

    const handleModalOk = () => {
        console.log('Rejected:', selectedRequest, 'Reason:', rejectionReason);
        setRequests((prev) => prev.filter((r) => r !== selectedRequest));
        setShowModal(false);
        setSelectedRequest(null);
        setRejectionReason('');
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setSelectedRequest(null);
        setRejectionReason('');
    };

    const sortedData = [...requests].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="sort-icon" />;
        return sortConfig.direction === 'asc' ? (
            <FaSortUp className="sort-icon" />
        ) : (
            <FaSortDown className="sort-icon" />
        );
    };

    // useEffect(()=>{
    //     console.log(data);
    // })

    return (
        <div className="doaa-classing-request-table">
            <h3>Clashing Requests</h3>
            <h4>{department}</h4>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            Student Name {getSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('year')}>
                            Year {getSortIcon('year')}
                        </th>
                        <th onClick={() => handleSort('courses')}>
                            Courses {getSortIcon('courses')}
                        </th>
                        <th onClick={() => handleSort('date')}>
                            Branch {getSortIcon('date')}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                            <td className='doaa-classing-request-username'><FaUser className="user-icon" /> 
                                <div>{row.name}</div>
                            </td>
                            <td>{row.year}</td>
                            <td>{row.opted_courses.length}</td>
                            <td>{row.branch}</td>
                            <td className='doaa-classing-request-button-area'>
                                <button
                                    className="action-btn accept"
                                    onClick={() => handleAccept(row)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="action-btn reject"
                                    onClick={() => handleRejectClick(row)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h4>Enter Reason for Rejection (optional)</h4>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Type reason here..."
                        />
                        <div className="modal-buttons">
                            <button onClick={handleModalOk} className="action-btn accept">OK</button>
                            <button onClick={handleModalCancel} className="action-btn reject">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClashingRequestList;
