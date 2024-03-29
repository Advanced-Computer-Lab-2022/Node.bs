import React from 'react';
import './../ProfileCard/ProfileCard.scss';
import { faPencil, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactModal from 'react-modal';
import OverviewForm from '../OverviewForm/OverviewForm';
import PasswordForm from '../PasswordForm/PasswordForm';
import { logOut } from '../../services/GuestService';
import './../ProfileCard/ProfileCard.scss';
import {
  faMoneyBillTrendUp,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

import { getWalletAmount } from '../../services/IndividualTraineeService';
import { useEffect } from 'react';
import { getMoneyOwedPerMonth } from '../../services/InstructorService';

const logOutHandler = async () => {
  await logOut();
  window.location.href = '/signin';
};
// import React from 'react';
// import './../ProfileCard/ProfileCard.scss';
// import {
//   faMoneyBillTrendUp,

//   faWallet,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';
// import ReactModal from 'react-modal';
// import OverviewForm from '../OverviewForm/OverviewForm';
// import PasswordForm from '../PasswordForm/PasswordForm';
// import { getWalletAmount } from '../../services/IndividualTraineeService';
// import { useEffect } from 'react';
// import { getMoneyOwedPerMonth } from '../../services/InstructorService';

function ProfileCard({ id, type }) {
  const [viewEditProfile, setViewEditProfile] = useState(false);

  useEffect(() => {
    // console.log(type);
    if (type === 'individual') {
      handleGetWalletAmount();
    }
    if (type === 'instructor') {
      handleGetMoneyOwedPerMonth();
    }
  }, []);

  const [wallet, setWallet] = useState(0);
  const handleGetWalletAmount = async () => {
    const wallet = await getWalletAmount({ individualTraineeId: id });
    if (wallet) {
      console.log(wallet.data);
      setWallet(wallet.data);
    }
  };

  /////////////INSTRUCTOR GET MONEY OWED PER MONTH//////////////
  const [moneyOwedPerMonth, setMoneyOwedPerMonth] = useState(0.0);
  const handleGetMoneyOwedPerMonth = async () => {
    const query = await getMoneyOwedPerMonth({ instructorId: id });

    if (query) {
      console.log(query);
      setMoneyOwedPerMonth(query.data);
    }
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
        <img
          src="https://external-preview.redd.it/vHK-C-Wx28llvnpcqe-H3CHbjxywA347arliw31bBSM.png?format=pjpg&auto=webp&s=1597553082499b2a5fb9beb0b795f1729dcc391c"
          alt="ronnie coleman"
        />
      </div>
      <div className="user-details">
        <h4>{localStorage['name']}</h4>
        <h6 className="font-secondary">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h6>
      </div>
      <div className="row">
        <div className="col-12">
          {' '}
          {type == 'individual' && (
            <div className="row">
              <button
                className="btn btn-outline-dark disabled"
                onClick={() => handleGetWalletAmount()}
              >
                <h3>
                  <FontAwesomeIcon icon={faWallet} /> {' ' + wallet} $
                </h3>
                {console.log(id)}
              </button>
            </div>
          )}
          {type === 'instructor' && (
            <div className="row">
              {' '}
              <button
                className="btn btn-outline-dark disabled"
                onClick={() => handleGetMoneyOwedPerMonth()}
              >
                <h3>
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} />{' '}
                  {' ' + moneyOwedPerMonth} $
                </h3>
                {console.log(id)}
              </button>
            </div>
          )}
        </div>
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
