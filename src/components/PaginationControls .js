import React from "react";

const PaginationControls = React.memo(
  ({ onNext, onPrevious, hasNext, hasPrevious }) => {
    return (
      <div>
        {hasPrevious && <button onClick={onPrevious}>Previous Page</button>}
        {hasNext && <button onClick={onNext}>Next Page</button>}
      </div>
    );
  }
);

export default PaginationControls;
