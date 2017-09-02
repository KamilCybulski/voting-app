import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import shortid from 'shortid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const Option = ({ index, handleOptionsChange, text }) => (
  <div>
    <TextField
      hintText="option"
      value={text}
      onChange={e => handleOptionsChange(index, e)}
    />
  </div>
);

Option.propTypes = {
  index: PropTypes.number.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

class NewPoll extends React.Component {
  /**
   * @param {object} props Contains user object;
   * newPollName(string) Name of your new poll;
   * newPollOptions(Array of strings) Holds poll's options;
   * optionIDs(Array of strings) Holds unique keys for Options;
   * nameErrMsg(string) contains error message for invalid poll name
   * optionsErrMsg(string) contains error message for invalid options
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      newPollName: '',
      newPollOptions: ['', ''],
      optionsIDs: [shortid.generate(), shortid.generate()],
      nameErrMsg: '',
      optionsErrMsg: '',
    };
  }

  /**
   * clearErrorMessages
   * Sets state { nameErrMsg, optionsErrMsg } to empty strings;
   * @returns {undefined}
   */
  clearErrorMessages = () => {
    this.setState({
      nameErrMsg: '',
      optionsErrMsg: '',
    });
  }

  /**
   * saveToDB
   * saves the poll held in a state to the database;
   * @returns {undefined}
   */
  saveToDB = () => {
    this.clearErrorMessages();

    if (!this.state.newPollName) {
      this.setState({
        nameErrMsg: 'Invalid poll name',
      });
    } else if (this.state.newPollOptions.length < 2) {
      this.setState({
        optionsErrMsg: 'At least 2 options required',
      });
    } else if (this.state.newPollOptions.some(str => str === '')) {
      this.setState({
        optionsErrMsg: 'Cannot submit empty options',
      });
    } else {
      const options = this.state.newPollOptions.map(item => ({
        name: item,
        votes: 0,
      }));

      const data = {
        name: this.state.newPollName,
        owner: this.props.user.email,
        options,
      };
      const newPoll = firebase.database().ref('/polls').push().key;
      firebase.database().ref().update({ [`/polls/${newPoll}`]: data });
    }
  }

  /**
   * resetState
   * sets the state back to initial value
   * @returns {undefined}
   */
  resetState = () => {
    this.setState({
      newPollName: '',
      newPollOptions: ['', ''],
      optionsIDs: [shortid.generate(), shortid.generate()],
      nameErrMsg: '',
      optionsErrMsg: '',
    });
  }

  /**
   * handleOptionsChange
   * Synchronize given item value in newPollOptions with corresponding TextField
   * @param {number} index Index of an item that should be altered;
   * @param {object} e Keyboard event object;
   * @returns {undefined}
   */
  handleOptionsChange = (index, e) => {
    const options = this.state.newPollOptions.slice();
    options[index] = e.target.value;
    this.setState({ newPollOptions: options });
  }

  /**
   * handleNameChange
   * Synchronize value of newPollName with corresponding TextField;
   * @param {object} e Keyboard event object;
   * @returns {undefined}
   */
  handleNameChange = (e) => {
    this.setState({
      newPollName: e.target.value,
    });
  }

  /**
   * addOption
   * Adds anoter option to the poll;
   * @returns {undefined}
   */
  addOption = () => {
    const newPollOptions = this.state.newPollOptions.concat(['']);
    const optionsIDs = this.state.optionsIDs.concat([shortid.generate()]);

    this.setState({ newPollOptions, optionsIDs });
  }

  /**
   * @returns {object} React element
   */
  render() {
    const options = this.state.newPollOptions;

    return (
      <div className="full-width flex-column margin-top-50">
        <h1 className="text-big text-bold">
          New poll
        </h1>
        <div className="margin-top-50">
          <TextField
            hintText="poll's title"
            value={this.state.newPollName}
            onChange={this.handleNameChange}
          />
        </div>

        {this.state.nameErrMsg}

        <RaisedButton
          className="width200 margin20"
          primary
          label="Add option"
          onTouchTap={this.addOption}
        />

        <div className="margin-top-50 margin-bot-50">
          {options.map((item, index) => (
            <Option
              key={this.state.optionsIDs[index]}
              index={index}
              hintText="option"
              text={item}
              handleOptionsChange={this.handleOptionsChange}
            />
          ))}
        </div>

        {this.state.optionsErrMsg}

        <div className="width300 flex-column margin-bot-50">
          <RaisedButton
            className="width200 margin20"
            label="Reset"
            primary
            onTouchTap={this.resetState}
          />
          <RaisedButton
            className="width200"
            label="submit"
            primary
            onTouchTap={this.saveToDB}
          />
        </div>

      </div>
    );
  }
}

NewPoll.defaultProps = {
  user: undefined,
};

NewPoll.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
};

export default NewPoll;
