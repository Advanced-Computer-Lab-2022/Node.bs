import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./../components/CourseListItem.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function CourseListItem() {
  return (
    <div>
      <div className="list-item">
        <div class="row">
          <div class="col-sm-auto">
            <div className="course-icon">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
                alt="course icon"
              />
            </div>
          </div>
          <div class="col-sm">
            <p className="course-title">
              Python for beginners
              <p className="course-info subtitle">10 subtitles</p>
            </p>
          </div>
          <div class="col">Oct 10</div>
          <div class="col">
            4.9 <FontAwesomeIcon icon={faStar} alt="star" />
          </div>
        </div>
        <div className="title-subtitle"></div>
      </div>
      
    </div>
  );
}

export default CourseListItem;
