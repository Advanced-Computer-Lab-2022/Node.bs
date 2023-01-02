import { useRef } from 'react';
import { useState } from 'react';
import alert from 'sweetalert2';
import { updateOverview } from '../../services/InstructorService';
const OverviewForm = ({ id }) => {
  // const [newOverview, setNewOverview] = useState('');
  const overviewInput = useRef();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (overviewInput.current.value !== '') {
      const response = await fetch(`http://localhost:8000/instructor/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ overview: overviewInput.current.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (!response.ok) {
        alert.fire('An error has occurred', '', 'error');
      }
      if (response.ok) {
        console.log('overview updated');
        alert.fire('Overview updated successfully', '', 'success');
        overviewInput.current.value = '';
      }
    } else {
      alert.fire('Bad input!', "please don't leave any blanks", 'warning');
    }
  };

  const handleUpdateOverview = async () => {
    const query = await updateOverview({
      instructorId: id,
      overview: overviewInput.current.value,
    });
    console.log('id: ' + id);
    console.log('overview: ' + overviewInput.current.value);
    if (query.status == 200) {
      alert.fire('Overview updated successfully', '', 'success');
    } else {
      alert.fire('An error has occurred', '', 'error');
    }
  };

  return (
    // <form className="overviewForm">
    <div>
      <h1>Update Biography</h1>
      <label htmlFor="input">New Biography: </label>
      <input
        type="text"
        maxLength="100"
        // OnChange={(e) => setNewOverview(e.target.value)}
        ref={overviewInput}
        // value={newOverview}
        placeholder="i teach maths.."
      />
      <button
        className="btn btn-outline-primary"
        onClick={() => handleUpdateOverview()}
      >
        Save
      </button>
    </div>
  );
};

export default OverviewForm;
