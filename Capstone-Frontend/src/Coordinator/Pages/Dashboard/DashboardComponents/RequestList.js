import React, { useEffect, useState } from 'react';
import './RequestList.css';
import axios from 'axios'
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';
import Timetable from '../../../../Student/Components/TimeTable';
import { toast } from 'react-toastify';

const PendingTable = ({ data, requestType, department }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [tableData, setTableData] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDetailsRow, setSelectedDetailsRow] = useState(null); // NEW


    useEffect(() => {
        if (Array.isArray(data)) {
            setTableData(data);
        }
    }, [data]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const mappedData = data.map(item => ({
                ...item,
                category: item.stage === 2 ? 'Timetable' : 'Fees'
            }));
            setTableData(mappedData);
        }
    }, [data]);


    // Rejection popup states
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData =[...tableData].sort((a, b) => {
        if( !sortConfig.key) return 0;

            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="coordinator-sort-icon" />;
        return sortConfig.direction === 'asc' ? (
            <FaSortUp className="coordinator-sort-icon" />
        ) : (
            <FaSortDown className="coordinator-sort-icon" />
        );
    };

    const handleAccept = (row) => {
        // alert(`Accepted request of ${row.name}`);
        let updatedRow = { ...row, stage: 3 };
        if(row.stage == 4)
        updatedRow = { ...row, stage: 5 };
        axios.post("http://localhost:5000/api/coordinator/update-application", updatedRow)
        .then((res) =>{
            setTableData((prev) => prev.filter((item) => item !== row));
            toast.success("Application Accepted successfully!!");
        })
        .catch((err)=>{
            console.error("Error accepting application:", err);
            alert("Failed to accept request. Please try again.");
        });
    };

    const handleRejectClick = (row) => {
        setSelectedRow(row);
        setRejectionReason('');
        setShowRejectPopup(true);
    };

    const confirmReject = () => {
        const updatedComments = [...selectedRow.comments];
        updatedComments[1] = rejectionReason;

        const updatedRow = { ...selectedRow, stage: 10, comments: updatedComments };
        axios.post("http://localhost:5000/api/coordinator/update-application", updatedRow)
        .then((res) => {
            setTableData((prev) => prev.filter((item) => item !== selectedRow));
            setShowRejectPopup(false);
            toast.success("Application Rejected successfully!!");
        })
        .catch((err) => {
            console.error("Error rejecting application:", err);
            alert("Failed to reject request. Please try again.");
        });
    };

    const cancelReject = () => {
        setShowRejectPopup(false);
        setSelectedRow(null);
        setRejectionReason('');
    };


    const showDetailsPopup = (row) => {
        setSelectedDetailsRow(row);
        setIsPopupOpen(true);
    };

    const closeDetailsPopup = () => {
        setIsPopupOpen(false);
        setSelectedDetailsRow(null);
    };


    return (
        <div className="coordinator-pending-table">
            <h3>{requestType}</h3>
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
                        <th onClick={() => handleSort('appID')}>
                            Application ID {getSortIcon('appID')}
                        </th>
                        <th onClick={() => handleSort('category')}>
                            Category {getSortIcon('category')}
                        </th>
                        <th>
                            Details
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                            <td>
                                <FaUser className="coordinator-user-icon" /> {row.name}
                            </td>
                            <td>{row.year}</td>
                            <td>{row.application_id}</td>
                            <td>{row.category}</td>
                            <td>
                                <button onClick={() => showDetailsPopup(row)}>Get Details</button>
                            </td>
                            <td>
                                {requestType === 'Pending' ? (
                                    <>
                                        <button onClick={() => handleAccept(row)}>Accept</button>
                                        <button onClick={() => handleRejectClick(row)}>Reject</button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showRejectPopup && (
                <div className="coordinator-reject-popup">
                    <div className="coordinator-popup-content">
                        <h4>Reject Request: {selectedRow.name}</h4>
                        <textarea
                            placeholder="Enter reason (optional)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="coordinator-popup-buttons">
                            <button onClick={confirmReject}>Confirm Reject</button>
                            <button onClick={cancelReject}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {isPopupOpen && (
                <div className="coordinator-details-popup">
                    <div className="coordinator-popup-content2">
                        <h1>Application Id: #{selectedDetailsRow?.application_id}</h1>
                        <h5>Roll No: {selectedDetailsRow?.roll_no}</h5>
                        <h5>Email: {selectedDetailsRow?.email}</h5>
                        <h5>Subgroup: {selectedDetailsRow?.subgroup}</h5>
                        {selectedDetailsRow?.opted_courses.map((val, ind)=>{
                            return <h4>- {val[0]} opted with {val[1]}</h4>
                        })}
                        <Timetable data={selectedDetailsRow?.new_time_table} ed={selectedDetailsRow?.elective_data}/>
                        <h4>
                            Application Form Link:{" "}
                            <a href={selectedDetailsRow?.url} target="_blank" rel="noopener noreferrer">
                            Click Here
                            </a>
                        </h4>
                        <h4>
                            Fee Reciept Link:{" "}
                            <a href={selectedDetailsRow?.fee_receipt_link} target="_blank" rel="noopener noreferrer">
                            Click Here
                            </a>
                        </h4>
                        <button onClick={closeDetailsPopup} className='coordinator-popup-close-btn'>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingTable;
