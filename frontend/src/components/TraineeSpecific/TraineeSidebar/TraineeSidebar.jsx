import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faBookOpen,
  faArrowTurnDown,
} from '@fortawesome/free-solid-svg-icons';
import SidebarButton from '../../Sidebar/SidebarButton/SidebarButton';
import CountryDropdown from '../../util/CountryDropdown/CountryDropdown';
import { resetPassword } from '../../../services/AdminService';

const TraineeSidebar = ({ getCourseCatalog, getMyCourses, id }) => {
  const sendMeAnEmail = async () => {
    // console.log(instructorId);
    const returned = await resetPassword(id);
    console.log(returned);
  };
  const [buttonPressed, setButtonPressed] = useState('Dashboard');
  const dashboardButtonHandler = () => {
    getCourseCatalog();
    setButtonPressed('Dashboard');
  };
  const enrolledCoursesButtonHandler = () => {
    setButtonPressed('Enrolled');
    getMyCourses();
  };
  return (
    <div class="container-fluid sidebar-container">
      <div class="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton
          click={dashboardButtonHandler}
          icon={faLaptopHouse}
          label="Dashboard"
          primary={buttonPressed === 'Dashboard' ? true : false}
        />
        <SidebarButton
          icon={faMedal}
          label="Certificates"
          primary={buttonPressed === 'Certificates' ? true : false}
          click={() => setButtonPressed('Certificates')}
        />
        <SidebarButton
          icon={faClipboard}
          label="Tests"
          primary={buttonPressed === 'Tests' ? true : false}
          click={() => setButtonPressed('Tests')}
        />
        <SidebarButton
          icon={faCog}
          label="Settings"
          primary={buttonPressed === 'Settings' ? true : false}
          click={() => setButtonPressed('Settings')}
        />
        <SidebarButton
          icon={faBookOpen}
          label="Enrolled Courses"
          primary={buttonPressed === 'Enrolled' ? true : false}
          click={() => enrolledCoursesButtonHandler()}
        />
        <SidebarButton
          icon={faArrowTurnDown}
          click={() => sendMeAnEmail()}
          label="Reset Password"
        />
        <CountryDropdown />
      </div>
    </div>
  );
};
export default TraineeSidebar;
