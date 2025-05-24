import React from 'react';
import './Students.css';

const FilterSidebar = ({ onFilter }) => {
  return (
    <div className="filter-sidebar">
      <h3>FILTER STUDENT</h3>
      <button onClick={() => onFilter('batch')}>sort By Batches</button>
      <button onClick={() => onFilter('branch')}>sort By Branch</button>
      <button onClick={() => onFilter('attendance')}>sort By Attendance</button>
      <button onClick={() => onFilter('sgpa')}>sort By SGPA</button>
    </div>
  );
};

export default FilterSidebar;
