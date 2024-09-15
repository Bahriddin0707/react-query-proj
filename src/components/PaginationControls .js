import React from "react";

const PaginationControls = React.memo(
  ({ onPrevious, onNext, hasPrevious, hasNext, currentPage, totalPages }) => {
    return (
      <div>
        {hasPrevious && <button onClick={onPrevious}>Previous Page</button>}
        <span className="page">
          Page {currentPage} of {totalPages}
        </span>
        {hasNext && <button onClick={onNext}>Next Page</button>}
      </div>
    );
  }
);

export default PaginationControls;
