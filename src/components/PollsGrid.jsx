import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import LensIcon from 'material-ui/svg-icons/image/lens';
import Divider from 'material-ui/Divider';
import { cyan500 } from 'material-ui/styles/colors';
import Loader from '../utils/Loader';


function PollsGrid({ polls }) {
  return polls === undefined
    ? <Loader />
    : <div className="center-items margin-top-50 margin-bot-50">
      <h1 className="text-big text-bold text-center line-height-std">
        Check out all these pointless polls!
      </h1>
      <List className="margin-top-50">
        {Object.keys(polls).map(key => (
          <div key={key}>
            <Link to={`/poll/${key}`} className="no-text-decor" >
              <ListItem
                primaryText={polls[key].name}
                secondaryText={`made by: ${polls[key].owner}`}
                leftIcon={<LensIcon color={cyan500} />}
              />
            </Link>
            <Divider />
          </div>
        ))}
      </List>
    </div>;
}

PollsGrid.propTypes = {
  polls: PropTypes.objectOf(PropTypes.object),
};

export default PollsGrid;
