import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Thumbnail = ({ id, name }) => (
  <Link to={`/poll/${id}`} >
    <div className="width200 height200 center-items">
      {name}
    </div>
  </Link>
);

Thumbnail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Thumbnail;
