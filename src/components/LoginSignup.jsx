import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import firebase from 'firebase';


class LoginSignup extends React.Component {

  /**
   * email(string) holds value for email TextField
   * pass(string) holds value form password TextField
   * errMsg(string) holds any potential error message recieved from database;
   * slideIndex(number [0,1]) controls sliding tabs;
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
      errMsg: '',
      slideIndex: 0,
    };
  }

  handleSlideIndexChange = (value) => {
    this.setState({ slideIndex: value });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePassChange = (e) => {
    this.setState({ pass: e.target.value });
  }

  /**
   * set state.email to empty string;
   * set state.pass to empty string;
   * @returns {undefined}
   */
  clearForm = () => {
    this.setState({ email: '', pass: '' });
  }

  /**
   * Create a new user account
   * @returns {Promise} Contains a user
   */
  signUp = () => {
    const auth = firebase.auth();
    const email = this.state.email;
    const pass = this.state.pass;
    auth.createUserWithEmailAndPassword(email, pass)
      .catch((err) => {
        this.setState({ errMsg: err.message });
      });
    this.clearForm();
  }

  /**
   * Sign in a user
   * @returns {Promise} Contains a user
   */
  logIn = () => {
    const auth = firebase.auth();
    const email = this.state.email;
    const pass = this.state.pass;
    auth.signInWithEmailAndPassword(email, pass)
      .catch((err) => {
        this.setState({ errMsg: err.message });
      });
    this.clearForm();
  }

  /**
   * Signup and login form.
   * @return {object} React element
   */
  render() {
    const textFieldStyle = {
      width: '300px',
      marginTop: '15px',
    };

    const buttonStyle = {
      width: '300px',
      marginTop: '10px',
    };

    const loginForm = (
      <div className="width300">
        <TextField
          hintText="Email"
          style={textFieldStyle}
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          style={textFieldStyle}
          value={this.state.pass}
          onChange={this.handlePassChange}
        />
        {this.state.errMsg}
        <br />
        <RaisedButton
          label="Log in"
          primary
          style={buttonStyle}
          onTouchTap={this.logIn}
        />
      </div>
    );

    const signupForm = (
      <div className="width300">
        <TextField
          hintText="Email"
          style={textFieldStyle}
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          style={textFieldStyle}
          value={this.state.pass}
          onChange={this.handlePassChange}
        />
        <br />
        {this.state.errMsg}
        <RaisedButton
          label="Sign up"
          primary
          style={buttonStyle}
          onTouchTap={this.signUp}
        />
      </div>
    );

    return (
      <div className="center-items fullscreen">
        <Tabs
          onChange={this.handleSlideIndexChange}
          value={this.state.slideIndex}
          className="width300"
        >
          <Tab label="Log in" value={0} />
          <Tab label="Sign up" value={1} />
        </Tabs>

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlideIndexChange}
          className="width300"
        >
          {loginForm}
          {signupForm}
        </SwipeableViews>
      </div>
    );
  }
}


export default LoginSignup;
