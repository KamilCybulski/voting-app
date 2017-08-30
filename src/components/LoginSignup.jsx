import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginSignup extends React.Component {

  /**
   * Email and pass both hold values for corresponding TextFields
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
    };
  }

  /**
   * Signup and login form.
   * @return {object} React element
   */
  render() {
    return (
      <div className="center-items fullscreen">
        <Paper
          zDepth={2}
          className="standard-width standard-height flex-column"
        >
          <h2>Login</h2>

          <TextField
            hintText="Email"
          /><br />
          <br />

          <TextField
            hintText="Password"
            type="password"
          /><br />

          <div className="flex-row">
            <FlatButton label="Cancel" />
            <FlatButton label="Submit" />
          </div>
        </Paper>
      </div>
    );
  }
}


export default LoginSignup;

