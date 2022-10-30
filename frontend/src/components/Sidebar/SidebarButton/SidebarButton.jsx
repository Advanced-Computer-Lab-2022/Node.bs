import React from 'react';
import './SidebarButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
} from '@fortawesome/free-solid-svg-icons';

function SidebarButton() {
  return (
    <div className="SidebarButtonContainer">
      <button
        type="button"
        class="btn sidebar-btn btn-primary btn-md btn-block"
        id="sidebarButton"
      >
        <span className="content">
          <FontAwesomeIcon icon={faLaptopHouse} className="icon" />
          Dashboard
        </span>
      </button>
      <br />
      <button
        type="button"
        class="btn sidebar-btn btn-secondary btn-md btn-block"
        id="sidebarButton"
      >
        <span className="content">
          <FontAwesomeIcon icon={faClipboard} className="icon" />
          Tests
        </span>
      </button>
      <br />
      <button
        type="button"
        class="btn sidebar-btn btn-secondary btn-md btn-block"
        id="sidebarButton"
      >
        <span className="content">
          <FontAwesomeIcon icon={faMedal} className="icon" />
          Certificates
        </span>
      </button>
      <br />
      <button
        type="button"
        class="btn sidebar-btn btn-secondary btn-md btn-block"
        id="sidebarButton"
      >
        <span className="content">
          <FontAwesomeIcon icon={faCog} className="icon" />
          Settings
        </span>
      </button>
    </div>
  );
}

export default SidebarButton;
