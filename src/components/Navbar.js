import React from "react";

const Navbar = ({ setPage, page }) => {
  return (
    <nav>
      <button
        onClick={() => setPage("planets")}
        className={page === "planets" ? "active" : ""}
      >
        Planets
      </button>
      <button
        onClick={() => setPage("people")}
        className={page === "people" ? "active" : ""}
      >
        People
      </button>
    </nav>
  );
};

export default Navbar;
