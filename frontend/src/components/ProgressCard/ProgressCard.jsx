import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './../ProgressCard/ProgressCard.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProgressCircle from './../ProgressCircle/ProgressCircle';
function ProgressCard() {
  return (
    <div>
      {/* <h2>My Courses</h2> */}
      <div class="card" id="progress-card">
        <div class="card-body">
          <ProgressCircle />
          <div class="description">
            <h5 class="card-title">For-loops in python</h5>
            <h6 class="card-subtitle mb-2 text-muted">12 sub-chapters</h6>
            {/* <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ right: '5%', bottom: '40%', position: 'absolute' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
