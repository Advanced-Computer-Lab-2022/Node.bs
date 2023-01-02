import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import alert from 'sweetalert2';
import { registerToCourse as corpo } from '../../services/CorporateTraineeService';
import { registerToCourse as indi } from '../../services/IndividualTraineeService';

const Enrollin = () => {
  const { cid, id, type } = useParams();
  useEffect(() => {
    const callMe = async () => {
      if (type === '1') {
        try {
          await indi({ individualTraineeId: id, courseId: cid });
          alert.fire('You have registered successfully!', '', 'success');

          window.redirect('/individual');
        } catch (e) {
          console.log('ma3lesh');
        }
      } else {
        try {
          await corpo({ corporateTraineeId: id, courseId: cid });
          alert.fire('You have registered successfully!', '', 'success');

          window.redirect('/corporate');
        } catch (e) {
          console.log('ma3lesh');
        }
      }
    };
    callMe();
  }, []);
  return <h1>Regsitration successful!!!!!!</h1>;
};

export default Enrollin;
