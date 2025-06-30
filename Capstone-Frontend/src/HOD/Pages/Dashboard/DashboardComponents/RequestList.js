import React, { useState } from 'react';
import './RequestList.css';
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';

const PendingTable = ({ data, requestType, department }) => {

    console.log(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
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

    return (
        <div className="pending-table">
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
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                            <td>
                                <FaUser className="user-icon" /> {row.name}
                            </td>
                            <td>{row.year}</td>
                            <td>{row.courses}</td>
                            <td>{row.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingTable;