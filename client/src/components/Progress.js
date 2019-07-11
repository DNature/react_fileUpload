import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <div className="progress mt-4 mb-2">
      <div
        style={{ width: `${percentage}%` }}
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
      >
        {percentage}
      </div>
    </div>
  );
};
Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
