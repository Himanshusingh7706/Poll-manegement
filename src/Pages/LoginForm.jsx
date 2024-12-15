import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Card } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { validateField, validateForm } from '../utils/validationUtils';
import ToastMessage from '../Components/ToastMessage';
import { Link } from 'react-router-dom';
import CustomButton from '../Components/ButtonModal/CustomButtonModel';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [formError, setFormErrors] = useState({
    email: '',
    password: ''
  });
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const { errors, isFormValid } = validateForm(formData, false);
    setFormErrors(errors);
    if (!isFormValid) {
      return;
    }
    dispatch(
      login({
        email: formData.email.trim(),
        password: formData.password.trim()
      })
    )
      .unwrap()
      .then(() => navigate('/polls'))
      .catch(() => setShowErrorToast(true));
  };
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    const error = validateField(value, name, formData);
    setFormErrors({
      ...formError,
      [name]: error
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="login-main-container">
      <Container className="login-container">
        <Card className="login-card">
          <h2 className="text-center mb-4 text-3xl">Login</h2>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleValueChange}
                isInvalid={!!formError.email}
              />
              <Form.Control.Feedback type="invalid" className="text-error">
                {formError.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="pe-3"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleValueChange}
                  isInvalid={!!formError.password}
                />
                <span
                  className={`password-toggle-icon ${
                    formError.password ? 'mx-5' : 'mx-3'
                  }`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeFill /> : <EyeSlashFill />}
                </span>
              </div>
              {formError.password && (
                <div className="text-danger mt-1 text-error">
                  {formError.password}
                </div>
              )}
            </Form.Group>

            <div className="">
              <CustomButton
                type="submit"
                isLoading={isLoading}
                variant="primary"
                className="login-button"
              >
                Login
              </CustomButton>
            </div>
          </Form>
          <div className="text-center mt-3">
            <span>Not a Member? </span>
            <Link to="/signup" className="text-primary">
              Sign Up Now
            </Link>
          </div>
        </Card>

        <ToastMessage
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          message={error || 'An error occurred'}
          variant="danger"
        />
      </Container>
    </div>
  );
};

export default Login;
