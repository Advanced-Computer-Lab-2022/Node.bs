import React from 'react';
import './SidebarButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SidebarButton({ icon, label, primary, toBeAdded, click }) {
  return (
    <button
      type="button"
      class={
        'btn sidebar-btn btn-md btn-block ' +
        (primary ? 'btn-primary' : 'btn-secondary')
      }
      id="sidebarButton"
      data-bs-toggle="modal"
      data-bs-target={'#add' + toBeAdded + 'Modal'}
      onClick={click}
    >
      <span className="content">
        <FontAwesomeIcon icon={icon} className="icon" />
        {label}
      </span>
    </button>
  );
}

export default SidebarButton;
