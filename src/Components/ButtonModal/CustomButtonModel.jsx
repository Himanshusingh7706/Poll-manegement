import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const CustomButton = ({
  isLoading,
  variant,
  children,
  className,
  type='button',
  ...props
}) => {
  return (
    <Button
      className={`button-custom ${className}`}
      variant={isLoading ? 'secondary' : variant}
      type={type}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner animation="border" size="sm" /> : children}
    </Button>
  );
};

export default CustomButton;
