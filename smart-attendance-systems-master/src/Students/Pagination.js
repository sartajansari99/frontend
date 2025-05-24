import React from 'react';
import './Students.css';

const Pagination = ({ totalStudents, studentsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  return (
    <div className="pagination">
      {[...Array(totalPages).keys()].map((num) => (
        <span
          key={num}
          onClick={() => setCurrentPage(num + 1)}
          className={currentPage === num + 1 ? 'active' : ''}
        >
          •
        </span>
      ))}
    </div>
  );
};

export default Pagination;
