import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../utils/Loader';

/**
 * vote
 * vote for an option
 * @param {string} pollID Databse key for a given poll;
 * @param {number} optionIndex Index of an option in the options array;
 * @returns {Promise} Contains {committed: boolean, snapshot: nullable}
 */
const vote = (pollID, optionIndex) => {
  const option = firebase.database().ref(`/polls/${pollID}/options/${optionIndex}/votes`);

  return option.transaction(current => current + 1);
};

const ViewPoll = ({ poll, user, pollID }) => (
  <div>
    {!poll
      ? <Loader />
      : <div className="full-width flex-column" >
        <div className="width300 center-items">
          <VictoryChart
            domainPadding={30}
            theme={VictoryTheme.material}
          >
            <VictoryBar
              data={poll.options.map(option => ({
                x: option.name,
                y: option.votes,
              }))}
            />
          </VictoryChart>
        </div>
        {!user ? null : poll.options.map((option, index) => (
          <RaisedButton
            primary
            className="width200 margin10"
            key={index}
            label={option.name}
            onTouchTap={() => vote(pollID, index)}
          />
        ))}
      </div>}
  </div>
);

ViewPoll.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string,
    options: PropTypes.array,
    owner: PropTypes.string,
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  pollID: PropTypes.string,
};

export default ViewPoll;
