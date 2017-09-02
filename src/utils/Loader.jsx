import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = () => (
  <div className="fullscreen center-items">
    <CircularProgress size={120} thickness={8} />
  </div>
);

export default Loader;
