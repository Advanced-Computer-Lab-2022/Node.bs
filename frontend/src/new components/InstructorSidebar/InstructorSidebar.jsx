import React from 'react';
import SidebarButton from './../../components/Sidebar/SidebarButton/SidebarButton';
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
import CountryDropdown from './../../components/util/CountryDropdown/CountryDropdown';
import AddCourse from '../AddCourse/AddCourse';

const InstructorSidebar = ({ showInstructorCourses, getCourseCatalog }) => {
  return (
    <div class="container-fluid">
      <div className="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton
          click={getCourseCatalog}
          icon={faLaptopHouse}
          label="Dashboard"
          primary
        />
        <SidebarButton icon={faMedal} label="Certificates" />
        <SidebarButton icon={faClipboard} label="Tests" />
        <SidebarButton icon={faCog} label="Settings" />
        <SidebarButton icon={faBook} label="Add Course" toBeAdded="Course" />
        <AddCourse />
        <SidebarButton
          icon={faChalkboardTeacher}
          label="My Courses"
          click={showInstructorCourses}
        />

        <CountryDropdown />
      </div>
    </div>
  );
};

export default InstructorSidebar;
