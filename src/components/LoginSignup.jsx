import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


class LoginSignup extends React.Component {

  /**
   * Email and pass both hold values for corresponding TextFields.
   * slideIndex controls sliding tabs.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
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
        <br />
        <FlatButton label="Log in" style={buttonStyle} />
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
        <FlatButton label="Sign up" style={buttonStyle} />
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
