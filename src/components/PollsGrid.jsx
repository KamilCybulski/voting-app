import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../utils/Loader';
import Thumbnail from '../utils/Thumbnail';

function PollsGrid({ polls }) {
  return polls === undefined
    ? <Loader />
    : <div className="full-width flex-row-wrap">
      {Object.keys(polls).map(key => (
        <Thumbnail key={key} id={key} name={polls[key].name} />
        ))}
    </div>;
}

PollsGrid.defaultProps = {
  polls: {},
};

PollsGrid.propTypes = {
  polls: PropTypes.objectOf(PropTypes.object),
};

export default PollsGrid;
