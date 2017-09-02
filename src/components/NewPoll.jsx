import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import shortid from 'shortid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ErrorMessage from '../utils/ErrorMessage';
import NoUserMessage from '../utils/NoUserMessage';
import Loader from '../utils/Loader';


const Option = ({ index, handleOptionsChange, text, removeOption }) => (
  <div>
    <TextField
      style={{ width: '226px' }}
      hintText="option"
      value={text}
      onChange={e => handleOptionsChange(index, e)}
    />
    <FlatButton
      style={{ minWidth: '30px' }}
      icon={<ClearIcon />}
      onTouchTap={() => removeOption(index)}
    />
  </div>
);

Option.propTypes = {
  index: PropTypes.number.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
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
   * removeOption
   * removes an item with given index from newPollOptions array
   * @param {number} index Index of the item to be removed;
   * @returns {undefined}
   */
  removeOption = (index) => {
    const options = this.state.newPollOptions.filter((e, i) => i !== index);
    this.setState({ newPollOptions: options });
  }

  /**
   * @returns {object} React element
   */
  render() {
    const options = this.state.newPollOptions;

    const userInterface = (
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

        <ErrorMessage text={this.state.nameErrMsg} />

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
              removeOption={this.removeOption}
            />
          ))}
        </div>

        <ErrorMessage text={this.state.optionsErrMsg} />

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

    // null means user is not logged in;
    const viewToRender = this.props.user === null
                            ? <NoUserMessage />
                            : userInterface;

    // undefined means the app does not know wheter user is logged in or not
    // the app waits for the response from firebase DB;
    return this.props.user !== undefined ? viewToRender : <Loader />;
  }
}

NewPoll.defaultProps = {
  user: undefined,
};

NewPoll.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
};

export default NewPoll;
