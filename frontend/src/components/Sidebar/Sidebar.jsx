import React from 'react';
import SidebarButton from './SidebarButton/SidebarButton';
import './Sidebar.scss';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropdown from './../util/CountryDropdown/CountryDropdown';
function Sidebar() {
  return (
    <div class="container-fluid">
      <div class="">
        <h6
          className="brand"
          style={{ marginBottom: '25%', paddingLeft: '3%' }}
        >
          <FontAwesomeIcon icon={faDoorOpen} className="logo" /> CourseIndoors
        </h6>
        <SidebarButton />
        <CountryDropdown />
        <div className="profileDetails"> </div>
      </div>
    </div>
  );
}

export default Sidebar;
