import React from "react";
import "./Searchbar.scss";
import "./../ProfileCard/ProfileCard.scss";
import "./../util/CountryDropdown/CountryDropdown.scss";

import Filter from "../Filter/Filter";
function Searchbar() {
  return (
    <div className="form-outline row justify-content-end ">
      <div className="col-9">
        <input
          id="searchbar"
          type="text"
          className="form-control form-input"
          placeholder="&#x1F50D; Search courses.."
          style={{ borderRadius: "25px" }}
        />
      </div>

      <Filter />
    </div>
  );
}

export default Searchbar;
