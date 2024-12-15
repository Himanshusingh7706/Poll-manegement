import React from "react";

const ErrorComponent = ({ errorMessage }) => {
  return errorMessage && <p className="text-red-700 text-xs">{errorMessage}</p>;
};

export default ErrorComponent;
