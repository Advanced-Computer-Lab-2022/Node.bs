import React from 'react';
import SidebarButton from './SidebarButton/SidebarButton';
import './Sidebar.scss';
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropdown from './../util/CountryDropdown/CountryDropdown';
function Sidebar() {
  return (
    <div class="container-fluid">
      <div class="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton icon={faLaptopHouse} label="Dashboard" primary />
        <SidebarButton icon={faMedal} label="Certificates" />
        <SidebarButton icon={faClipboard} label="Tests" />
        <SidebarButton icon={faCog} label="Settings" />
        <CountryDropdown />
      </div>
      <div className="profileDetails"> </div>
    </div>
  );
}

export default Sidebar;
