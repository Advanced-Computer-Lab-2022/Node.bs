import React from 'react';
import './../ProgressCircle/ProgressCircle.scss';
function ProgressCircle() {
  return (
    <div>
      {' '}
      <div class="c100 p97 small">
        <span>97%</span>
        <div class="slice">
          <div class="bar"></div>
          <div class="fill"></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCircle;
