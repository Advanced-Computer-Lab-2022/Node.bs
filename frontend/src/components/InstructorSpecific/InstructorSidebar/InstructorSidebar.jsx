import React from 'react';
import SidebarButton from '../../Sidebar/SidebarButton/SidebarButton';
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faChalkboardTeacher,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropdown from './../../util/CountryDropdown/CountryDropdown';
import AddCourse from '../AddCourse/AddCourse';
import { useState } from 'react';

const InstructorSidebar = ({
  showInstructorCourses,
  getCourseCatalog,
  instructorId,
}) => {
  const dashboardButtonHandler = () => {
    getCourseCatalog();
    setButtonPressed('Dashboard');
  };
  const myCoursesButtonHandler = () => {
    showInstructorCourses();
    setButtonPressed('My Courses');
  };
  const [buttonPressed, setButtonPressed] = useState('Dashboard');
  return (
    <div class="container-fluid sidebar-container">
      <div className="logo">
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
          primary={buttonPressed === 'Certificates' ? true : false}
          icon={faMedal}
          label="Certificates"
          click={() => setButtonPressed('Certificates')}
        />
        <SidebarButton
          primary={buttonPressed === 'Tests' ? true : false}
          icon={faClipboard}
          label="Tests"
          click={() => setButtonPressed('Tests')}
        />
        <SidebarButton
          primary={buttonPressed === 'Settings' ? true : false}
          icon={faCog}
          label="Settings"
          click={() => setButtonPressed('Settings')}
        />
        <SidebarButton
          primary={buttonPressed === 'Add Course' ? true : false}
          icon={faBook}
          label="Add Course"
          toBeAdded="Course"
          click={() => setButtonPressed('Add Course')}
        />
        <AddCourse InstructorId={instructorId} />
        <SidebarButton
          primary={buttonPressed === 'My Courses' ? true : false}
          icon={faChalkboardTeacher}
          label="My Courses"
          click={myCoursesButtonHandler}
        />

        <CountryDropdown />
      </div>
    </div>
  );
};

export default InstructorSidebar;
