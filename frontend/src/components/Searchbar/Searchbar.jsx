import React from 'react';
import './Searchbar.scss';
import './../ProfileCard/ProfileCard.scss';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Searchbar() {
  return (
    <div className="form-outline row justify-content-end ">
      <div className="col-9">
        <input
          id="searchbar"
          type="text"
          className="form-control form-input"
          placeholder="&#x1F50D; Search courses.."
          style={{ borderRadius: '25px' }}
        />
      </div>
      <div className="edit-icon-container col-3 " id="filter-icon-container">
        <FontAwesomeIcon
          icon={faFilter}
          className="edit-icon"
          id="filter-icon"
        />
      </div>
    </div>
  );
}

export default Searchbar;
