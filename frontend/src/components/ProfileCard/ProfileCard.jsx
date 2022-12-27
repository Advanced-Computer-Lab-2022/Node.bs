import React from 'react';
import './../ProfileCard/ProfileCard.scss';
import { faPencil, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactModal from 'react-modal';
import OverviewForm from '../OverviewForm/OverviewForm';
import PasswordForm from '../PasswordForm/PasswordForm';
import { logOut } from '../../services/GuestService';

function ProfileCard({ id, type }) {
  const [viewEditProfile, setViewEditProfile] = useState(false);
  const logOutHandler = async () => {
    await logOut();
    window.location.href = '/signin';
  };
  return (
    <div id="profile-card">
      <div className="row">
        <div className="col-9">{/* <h2>Profile</h2> */}</div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <div
              className="edit-icon-container"
              onClick={() => setViewEditProfile(true)}
            >
              <FontAwesomeIcon icon={faPencil} className="edit-icon" />
            </div>
            <div
              className="edit-icon-container"
              onClick={() => logOutHandler()}
            >
              <FontAwesomeIcon icon={faSignOut} className="edit-icon" />
            </div>
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
      <ReactModal
        isOpen={viewEditProfile}
        onRequestClose={() => setViewEditProfile(false)}
        style={{
          content: {
            width: '40vw',
            height: '35vh',
            margin: 'auto',
          },
        }}
      >
        {type === 'instructor' && <OverviewForm id={id} />}
        <PasswordForm type={type} id={id} />
      </ReactModal>
    </div>
  );
}

export default ProfileCard;
