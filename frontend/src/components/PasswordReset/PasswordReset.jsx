import React from 'react';
import PasswordForm from './../PasswordForm/PasswordForm';
import { useParams } from 'react-router-dom';
const PasswordReset = () => {
  const { id, type } = useParams();
  return (
    <div className="container-fluid">
      <PasswordForm
        type={
          type === '0'
            ? 'instructor'
            : type === '1'
            ? 'individual'
            : 'corporate'
        }
        id={id}
      />
    </div>
  );
};

export default PasswordReset;
