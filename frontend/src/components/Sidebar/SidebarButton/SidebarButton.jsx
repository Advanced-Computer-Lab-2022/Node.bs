import React from 'react';
import './SidebarButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SidebarButton({ icon, label, primary }) {
  return (
    <button
      type="button"
      class={
        'btn sidebar-btn btn-md btn-block ' +
        (primary ? 'btn-primary' : 'btn-secondary')
      }
      id="sidebarButton"
    >
      <span className="content">
        <FontAwesomeIcon icon={icon} className="icon" />
        {label}
      </span>
    </button>
  );
}

export default SidebarButton;
