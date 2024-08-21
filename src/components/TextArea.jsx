import React from "react";

const TextArea = ({ value, onChange }) => {
  return (
    <textarea
      id="textarea"
      style={{ width: "100%", height: "100px", marginTop: "20px" }}
      value={value}
      onChange={onChange}
      placeholder="Please enter your response here."
    ></textarea>
  );
};

export default TextArea;
