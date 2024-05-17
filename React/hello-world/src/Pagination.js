import React from "react";
import { MdNavigateNext,MdNavigateBefore} from 'react-icons/md';
import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages){
      onPageChange(currentPage + 1);
      console.log(totalPages)
    }
    
  };

  return (
    <div className="buton-prev">
      <button disabled={currentPage === 1} onClick={handlePreviousPage} className="prev-next">
        <MdNavigateBefore/>
      </button>
      <span className="span-next">{`Page  ${currentPage} `}</span>
      <button disabled={currentPage === totalPages} onClick={handleNextPage} className="prev-next">
        <MdNavigateNext className="icon-next"/>
      </button>
    </div>
  );
}

export default Pagination;
