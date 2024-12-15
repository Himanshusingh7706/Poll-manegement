export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// password validation
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

//  validation for name fields minimum 4 characters
export const isValidName = (name) => {
  return name.length > 3;
};

export const validateField = (value, fieldName, formData, isSignup = false) => {
  if (!value.trim()) {
    return `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required.`;
  }

  // Name validation
  if ((fieldName === 'firstName' || fieldName === 'lastName' )&& !isValidName(value)) {
    return `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } must be at least 4 characters long.`;
  }
  if (fieldName === 'email' && !isValidEmail(value)) {
    return 'Please enter a valid email address.';
  }
  if (fieldName === 'password') {
    if (!isSignup) {
      return '';
    }
    if (!isValidPassword(value)) {
      return 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.';
    }
  }
  if (isSignup && fieldName === 'confirmPassword') {
    if (value !== formData.password) {
      return 'Passwords do not match.';
    }
  }
  return '';
};
export const validateForm = (formData, isSignup = false) => {
  let errors = {};
  let isFormValid = true;
  Object.keys(formData).forEach((key) => {
    const errorData = validateField(formData[key], key, formData, isSignup);
    errors[key] = errorData;
    if (errorData.length) {
      isFormValid = false;
    }
  });
  return { errors, isFormValid };
};

export const validateAddEditForm = (data) => {
  const newErrors = { title: "", optionTitle: "" };
  let isVallid = true;

  if (data.title?.trim() === "" || data.title?.length < 10) {
    newErrors.title = "Question must be at least 10 characters long";
    isVallid = false;
  }

  if (data.optionTitle?.trim() === "") {
    newErrors.optionTitle = "Option must not be empty";
    isVallid = false;
  }

  if (data.options?.length < 2) {
    newErrors.optionTitle = "There must be at least two options";
    isVallid = false;
  }

  return { newErrors, isVallid };
};