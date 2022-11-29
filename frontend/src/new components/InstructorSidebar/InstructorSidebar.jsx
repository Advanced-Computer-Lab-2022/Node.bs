import React from "react";
import SidebarButton from "./../../components/Sidebar/SidebarButton/SidebarButton";
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faChalkboardTeacher,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryDropdown from "./../../components/util/CountryDropdown/CountryDropdown";
import AddCourse from "../AddCourse/AddCourse";
import AddTest from "../AddTest/AddTest"

/////////////////////ADD QUIZ ADDITIONS///////////////////
import { faFile } from "@fortawesome/free-solid-svg-icons";

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

        <SidebarButton icon={faFile} label="Add Test" toBeAdded="Test" />
        <AddTest courseId= "63837c6b7f0a308cdd417908" 
                instructorId= "635f37bcde75e20effb14fc3"
                subtitleId= "635f5a2f0e456e7d8fcf6bd5"
                  />
      </div>
    </div>
  );
};

export default InstructorSidebar;
