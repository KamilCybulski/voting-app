import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ text }) => (
  <div
    className="width300 center-items text-red padding10 border-box text-center"
  >
    {text}
  </div>
);

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
