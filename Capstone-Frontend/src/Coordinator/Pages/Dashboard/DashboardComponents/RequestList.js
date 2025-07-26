import React, { useEffect, useState } from 'react';
import './RequestList.css';
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';

const PendingTable = ({ data, requestType, department }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            setTableData(data);
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
        alert(`Accepted request of ${row.name}`);
        setTableData((prev) => prev.filter((item) => item !== row));
    };

    const handleRejectClick = (row) => {
        setSelectedRow(row);
        setRejectionReason('');
        setShowRejectPopup(true);
    };

    const confirmReject = () => {
        setTableData((prev) => prev.filter((item) => item !== selectedRow));
        setShowRejectPopup(false);
    };

    const cancelReject = () => {
        setShowRejectPopup(false);
        setSelectedRow(null);
        setRejectionReason('');
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
                        <th onClick={() => handleSort('courses')}>
                            Courses {getSortIcon('courses')}
                        </th>
                        <th onClick={() => handleSort('date')}>
                            Applied Date {getSortIcon('date')}
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
                            <td>{row.courses}</td>
                            <td>{row.date}</td>
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
        </div>
    );
};

export default PendingTable;
