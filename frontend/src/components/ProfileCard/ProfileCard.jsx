import React from 'react';
import './../ProfileCard/ProfileCard.scss';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ProfileCard() {
  return (
    <div id = "profile-card">
      <div className="row" >
        <div className="col-9">
          {/* <h2>Profile</h2> */}
        </div>
        <div className="col">
          <div className="edit-icon-container">
            <FontAwesomeIcon icon={faPencil} className="edit-icon" />
          </div>
        </div>
      </div>
      <div className="profile-picture">
        <img src="https://www.ambal.ru/96227118551.jpg" alt="ronnie coleman" />
      </div>
      <div className="user-details">
        <h4>Ronnie Coleman</h4>
        <h6 className="font-secondary">Individual Trainee</h6>
      </div>
    </div>
  );
}

export default ProfileCard;
