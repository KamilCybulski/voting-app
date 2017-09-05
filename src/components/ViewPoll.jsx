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
 * @param {string} uid User's id, used to keep track of who had voted on what;
 * @returns {Promise} Contains {committed: boolean, snapshot: nullable}
 */
const vote = (pollID, optionIndex, uid) => {
  const polls = firebase.database().ref('/polls');
  const votersRef = polls.child(pollID).child('voters');

  const makeAVote = () => {
    const option = polls.child(`${pollID}/options/${optionIndex}/votes`);
    const usersVote = polls.child(`${pollID}/voters/${uid}`);

    return usersVote.set(true)
      .then(option.transaction(current => current + 1));
  };

  votersRef.once('value')
    .then(snap => snap.val())
    .then((voters) => {
      if (!voters || !Object.prototype.hasOwnProperty.call(voters, uid)) {
        return makeAVote();
      }
      return undefined;
    });
};

const notLoggedMsg = (
  <p className="text-center text-red" >
    You need to be logged in to vote
  </p>
);

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
        {!user ? notLoggedMsg : poll.options.map((option, index) => (
          <RaisedButton
            primary
            className="width200 margin10"
            key={index}
            label={option.name}
            onClick={() => vote(pollID, index, user.uid)}
            disabled={poll.voters && Object.prototype.hasOwnProperty
                                      .call(poll.voters, user.uid)}
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
