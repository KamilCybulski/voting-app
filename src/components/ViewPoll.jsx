import React from 'react';
import PropTypes from 'prop-types';

const ViewPoll = props => (
  <div>
    This is a poll with id: {props.match.params.id}
  </div>
);
ViewPoll.propTypes = {
};

export default ViewPoll;
