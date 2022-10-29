import React from "react";
import "./../components/Searchbar.scss";
import {faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Searchbar() {


  return (
    <div>
      <div class="form-outline">
        <FontAwesomeIcon icon={faSearch} className="fa-search" />
        <input
          type="text"
          class="form-control form-input"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Searchbar;
