import React from "react";
import SidebarButton from "./SidebarButton";
import "./../components/Sidebar.scss";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  return (
    <div class="containers">
      <div class="column">
        <h2 className = "brand">
          {" "}
          <FontAwesomeIcon icon={faDoorOpen} className="logo" />{" "}
          CourseIndoors
        </h2>
        <SidebarButton />

        <div className = "profileDetails">  </div>
      </div>
    </div>
  );
}

export default Sidebar;
