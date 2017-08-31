import React from 'react';
import { Redirect } from 'react-router-dom';
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
   * shouldBeRedirected(boolean) if set to true, user will be redirected to Home
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
      errMsg: '',
      slideIndex: 0,
      shouldBeRedirected: false,
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
   * clearForm
   * set state.pass to empty string;
   * @returns {undefined}
   */
  clearForm = () => {
    this.setState({ pass: '' });
  }

  /**
   * signUp
   * Create a new user account
   * @returns {Promise} Contains a user
   */
  signUp = () => {
    const auth = firebase.auth();
    const email = this.state.email;
    const pass = this.state.pass;
    auth.createUserWithEmailAndPassword(email, pass)
      .then(() => {
        this.setState({ shouldBeRedirected: true });
      })
      .catch((err) => {
        this.setState({ errMsg: err.message });
        this.clearForm();
      });
  }

  /**
   * logIn
   * Sign in a user
   * @returns {Promise} Contains a user
   */
  logIn = () => {
    const auth = firebase.auth();
    const email = this.state.email;
    const pass = this.state.pass;
    auth.signInWithEmailAndPassword(email, pass)
      .then(() => {
        this.setState({ shouldBeRedirected: true });
      })
      .catch((err) => {
        this.setState({ errMsg: err.message });
        this.clearForm();
      });
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

    const errorMessage = (
      <div className="width300 center-items text-red padding10 border-box text-center">
        {this.state.errMsg}
      </div>
    );

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
        <br />
        {errorMessage}
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
        {errorMessage}
        <RaisedButton
          label="Sign up"
          primary
          style={buttonStyle}
          onTouchTap={this.signUp}
        />
      </div>
    );

    const forms = (
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

    const redirect = <Redirect to="/" />;

    return this.state.shouldBeRedirected ? redirect : forms;
  }
}


export default LoginSignup;
