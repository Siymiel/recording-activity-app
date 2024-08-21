import React from 'react';

const RadioGroup = ({ selectedValue, onChange }) => {
  return (
    <div className="radio-group">
      <p>Is this your final answer?</p>
      <label>
        <input
          type="radio"
          value="true"
          checked={selectedValue === 'true'}
          onChange={(e) => onChange(e.target.value)}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          value="false"
          checked={selectedValue === 'false'}
          onChange={(e) => onChange(e.target.value)}
        />
        False
      </label>
    </div>
  );
};

export default RadioGroup;