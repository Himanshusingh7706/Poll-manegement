import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const PasswordField = ({ label, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form.Group className="mb-1 px-4">
      <Form.Label>{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          className="pe-5"
          type={showPassword ? 'text' : 'password'}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={!!error}
        />
        <span
          className={`password-toggle-icon ${error ? 'mx-5' : 'mx-3'}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeFill /> : <EyeSlashFill />}
        </span>
      </div>
      {error && <div className="text-danger password-error">{error}</div>}
    </Form.Group>
  );
};

export default PasswordField;
