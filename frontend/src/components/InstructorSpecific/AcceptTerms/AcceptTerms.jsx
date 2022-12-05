import React from 'react';
import { updateInstructorTerms } from '../../../services/InstructorService';
import Swal from 'sweetalert2';
const AcceptTerms = ({ id }) => {
  const handleTermsAcceptance = async () => {
    try {
      const response = await updateInstructorTerms(id);
      Swal.fire('Terms have been accepted successfully', '', 'success');
    } catch {
      Swal.fire('An error has occured', '', 'error');
    }
  };
  return (
    <div className="container-fluid">
      <h1>Terms and conditions</h1>
      <p>
        All videos and resources are in part owned by CourseIndoors©. Also all
        revenue recieved by instructors is subject to a 10% deduction going to
        CourseIndoors©. By hitting "Accept" you understand and abide by these
        conditions
      </p>
      <button
        className="btn btn-outline-success"
        onClick={() => handleTermsAcceptance()}
      >
        Accept
      </button>
    </div>
  );
};

export default AcceptTerms;
