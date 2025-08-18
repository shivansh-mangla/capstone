import React, { useEffect, useState } from 'react';
import './RequestList.css';
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';

import Timetable from '../../../../Student/Components/TimeTable';

const PendingTable = ({ data, requestType, department }) => {

    console.log(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDetailsRow, setSelectedDetailsRow] = useState(null); // NEW
    const [tableData, setTableData] = useState([]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
            if (Array.isArray(data)) {
                const mappedData = data.map(item => ({
                    ...item,
                    category: item.stage === 2 ? 'Timetable' : 'Fees'
                }));
                setTableData(mappedData);
            }
        }, [data]);

    const sortedData = [...tableData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="hod-sort-icon" />;
        return sortConfig.direction === 'asc' ? (
            <FaSortUp className="hod-sort-icon" />
        ) : (
                <FaSortDown className="hod-sort-icon" />
        );
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
        <div className="hod-pending-table">
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            

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