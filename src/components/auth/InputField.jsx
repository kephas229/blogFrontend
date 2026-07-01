import React, { useState } from "react";

const InputField = ({ label, icon, type = "text", name, value, onChange, placeholder, error }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group has-validation">
        <span className="input-group-text">
          <i className={`bi ${icon}`}></i>
        </span>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />
        {isPassword && (
          <button type="button" className="btn btn-outline-secondary" onClick={() => setVisible(!visible)}>
            <i className={`bi ${visible ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
          </button>
        )}
        {/* has-validation + ordre correct permet à Bootstrap d'afficher ce message */}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default InputField;