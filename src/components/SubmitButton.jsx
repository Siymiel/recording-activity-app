import React from 'react';

const SubmitButton = ({ isEnabled, onClick }) => {
  return (
    <button type="submit" disabled={!isEnabled} style={{ marginTop: '20px' }} onClick={onClick}>
      Submit
    </button>
  );
};

export default SubmitButton;
