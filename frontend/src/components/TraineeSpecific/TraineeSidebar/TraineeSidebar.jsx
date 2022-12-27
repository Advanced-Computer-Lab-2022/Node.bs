import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faBookOpen,
  faArrowTurnDown,
  faFlag,
  faArrowUp,
  faSortUp,
  faLevelUp,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import SidebarButton from "../../Sidebar/SidebarButton/SidebarButton";
import CountryDropdown from "../../util/CountryDropdown/CountryDropdown";
import { resetPassword } from "../../../services/AdminService";
import { getIndividualTraineeReportsIssued } from "../../../services/IndividualTraineeService";
import ReportsIssued from "../../ReportsIssued/ReportsIssued";
import { getCorporateTraineeReportsIssued } from "../../../services/CorporateTraineeService";
const TraineeSidebar = ({ getCourseCatalog, getMyCourses, id, corporate }) => {
  const sendMeAnEmail = async () => {
    // console.log(instructorId);
    const returned = await resetPassword(id);
    console.log(returned);
  };
  const [buttonPressed, setButtonPressed] = useState("Dashboard");
  const dashboardButtonHandler = () => {
    getCourseCatalog(false);
    setButtonPressed("Dashboard");
  };
  const enrolledCoursesButtonHandler = () => {
    setButtonPressed("Enrolled");
    getMyCourses();
  };

  const popularCoursesButtonHandler = () => {
    setButtonPressed("Popular");
    getCourseCatalog(true);
  };

  const [allReports, setAllReports] = useState({});
  const getIndividualTraineeReports = async () => {
    console.log("individualTraineeId: " + id);
    const returnedReports = await getIndividualTraineeReportsIssued({
      individualTraineeId: id,
    });
    setAllReports(returnedReports);
  };
  const getCorporateTraineeReports = async () => {
    console.log("corporateTraineeId: " + id);
    const returnedReports = await getCorporateTraineeReportsIssued({
      corporateTraineeId: id,
    });
    setAllReports(returnedReports);
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
          primary={buttonPressed === "Dashboard" ? true : false}
        />
        <SidebarButton
          icon={faMedal}
          label="Certificates"
          primary={buttonPressed === "Certificates" ? true : false}
          click={() => setButtonPressed("Certificates")}
        />
        <SidebarButton
          icon={faClipboard}
          label="Tests"
          primary={buttonPressed === "Tests" ? true : false}
          click={() => setButtonPressed("Tests")}
        />
        <SidebarButton
          icon={faCog}
          label="Settings"
          primary={buttonPressed === "Settings" ? true : false}
          click={() => setButtonPressed("Settings")}
        />
        <SidebarButton
          icon={faThumbsUp}
          label="Popular Courses"
          primary={buttonPressed === "Popular" ? true : false}
          click={() => popularCoursesButtonHandler()}
        />
        <SidebarButton
          icon={faBookOpen}
          label="Enrolled Courses"
          primary={buttonPressed === "Enrolled" ? true : false}
          click={() => enrolledCoursesButtonHandler()}
        />
        <SidebarButton
          icon={faArrowTurnDown}
          click={() => sendMeAnEmail()}
          label="Reset Password"
        />
        <SidebarButton
          primary={buttonPressed === "Reports Issued" ? true : false}
          icon={faFlag}
          label="Reports Issued"
          toBeViewed={"ReportsIssued"}
          click={
            !corporate
              ? getIndividualTraineeReports
              : getCorporateTraineeReports
          }
        />
        <ReportsIssued reports={allReports} />

        <CountryDropdown />
      </div>
    </div>
  );
};
export default TraineeSidebar;
