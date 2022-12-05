import { useRef } from 'react';
// import { useState } from 'react';
import alert from 'sweetalert2';
const PasswordForm = ({ id, type }) => {
  // const [formOldPassword, setFormOldPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const passwordRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== '') {
      const response = await fetch(`http://localhost:8000/${type}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ password: passwordRef.current.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert.fire('An error has occurred', '', 'error');
      }
      if (response.ok) {
        console.log('password updated');
        alert.fire('Password updated successfully', '', 'success');
      }
    } else {
      alert.fire('Bad input!', "please don't leave any blanks", 'warning');
    }
  };

  return (
    <form className="passwordForm" onSubmit={handleFormSubmit}>
      <h1> Update Password</h1>
      {/* <label htmlFor="input">Old Password: </label>
      <input
        type="text"
        maxLength="16"
        OnChange={(e1) => setFormOldPassword(e1.target.value)}
        // value={formOldPassword}
        placeholder="Old Password"
      /> */}
      <label htmlFor="input">New Password: </label>
      <input
        type="text"
        maxLength="16"
        // OnChange={(e2) => setNewPassword(e2.target.value)}
        ref={passwordRef}
        // value={newPassword}
        placeholder="New Password"
      />
      <button className="btn btn-outline-primary">Change Password</button>
    </form>
  );
};

export default PasswordForm;
