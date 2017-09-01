import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';

const Option = ({ index, handleChange, text }) => (
  <div>
    <TextField
      hintText="option"
      value={text}
      onChange={e => handleChange(index, e)}
    />
  </div>
);


class NewPoll extends React.Component {
  /**
   * @param {object} props Contains user object;
   * newPollName(string) Name of your new poll;
   * newPollOptions(Array of strings) Holds poll's options;
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      newPollName: '',
      newPollOptions: ['Kirk', 'Piccard', "Maui"],
    };
  }

  /**
   * saveToDB
   * saves the poll held in a state to the database;
   * @returns {Promise} Contains void;
   */
  saveToDB = () => {
    const data = {
      name: 'Kirk vs Piccard',
      owner: this.props.user.email,
      options: [
        {
          name: 'Piccard',
          votes: 10,
        },
        {
          name: 'Kirk',
          votes: 15,
        },
      ],
    };

    const newPoll = firebase.database().ref('/polls').push().key;
    return firebase.database().ref().update({ [`/polls/${newPoll}`]: data });
  }

  handleChange = (index, e) => {
    const options = this.state.newPollOptions.slice();
    options[index] = e.target.value;
    this.setState({ newPollOptions: options });
  }

  /**
   * @returns {object} React element
   */
  render() {
    const options = this.state.newPollOptions;

    return (
      <div className="fullscreen flex-column">
        {options.map((item, index) => (
          <Option
            index={index}
            text={item}
            handleChange={this.handleChange}
          />
        ))}
      </div>
    );
  }
}

NewPoll.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

export default NewPoll;
