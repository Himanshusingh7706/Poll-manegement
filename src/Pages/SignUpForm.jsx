import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Container, Card } from 'react-bootstrap';
import ToastMessage from '../Components/ToastMessage'; 
import { signup } from '../slices/authSlice';
import { fetchRoles } from '../slices/rolesSlice';
import { validateField, validateForm } from '../utils/validationUtils';
import SuccessModal from '../Components/SuccessModal';
import CustomButton from '../Components/ButtonModal/CustomButtonModel';
import PasswordField from '../Components/PasswordField';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success'
  });
  const [SignupSuccessModal, setSignupSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.roles.roles);

  useEffect(() => {
    dispatch(fetchRoles()); 
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isFormValid } = validateForm(formData, true);
    setFormErrors(errors);

    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await dispatch(signup(formData)).unwrap();
      setSignupSuccessModal(true);
    } catch (error) {
      setToast({
        show: true,
        message: error?.message || 'Email Alredy Exist Try with another email.',
        variant: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(
      value,
      name,
      { ...formData, [name]: value },
      true
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleModalOkClick = () => {
    navigate('/');
    setSignupSuccessModal(false);
  };

  return (
    <div className="signup-main-container">
      <Container className="signup-container pt-20">
        <Card className="signup-card">
          <h2 className="text-center mb-1 text-3xl">Sign Up</h2>

          <Form noValidate onSubmit={handleSubmit}>
            {/* First Name Field */}
            <Form.Group className="mb-1 px-4">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleValueChange}
                isInvalid={!!formErrors.firstName}
                isValid={formErrors.firstName === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Last Name Field */}
            <Form.Group className="mb-1 px-4">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleValueChange}
                isInvalid={!!formErrors.lastName}
                isValid={formErrors.lastName === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-1 px-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleValueChange}
                isInvalid={!!formErrors.email}
                isValid={formErrors.email === ''}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Role Selection */}
            <Form.Group className="mb-1 px-4">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="roleId"
                value={formData.roleId}
                onChange={handleValueChange}
                isInvalid={!!formErrors.roleId}
                isValid={formErrors.roleId === ''}
              >
                <option value="">Select Role</option>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No roles available</option>
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.roleId}
              </Form.Control.Feedback>
            </Form.Group>
            

            {/* Password Field */}
            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleValueChange}
              error={formErrors.password}
            />

            {/* Confirm Password Field */}
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleValueChange}
              error={formErrors.confirmPassword}
            />

            {/* Submit Button */}
            <div className="px-4">
              <CustomButton
                type="submit"
                isLoading={isLoading}
                variant="success"
                className="signup-button"
              >
                Sign Up
              </CustomButton>
            </div>
          </Form>

          {/* Link to Login */}
          <div className="text-center mt-3 mb-4">
            Already have an account? <Link to="/" className='text-blue-700'>Login</Link>
          </div>
        </Card>

        {/* Toast Message for Error Handling */}
        <ToastMessage
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          message={toast.message}
          variant={toast.variant}
        />

        {/* Success Modal */}
        <SuccessModal
          show={SignupSuccessModal}
          onClose={() => setSignupSuccessModal(false)}
          message="Sign Up Successfully!!"
          subtext="Your account has been created successfully. You can now log in."
          okButton="OK"
          onOkClick={handleModalOkClick}
        />
      </Container>
    </div>
  );
};

export default SignUpForm;
