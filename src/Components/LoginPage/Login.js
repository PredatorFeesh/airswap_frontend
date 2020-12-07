import React from "react";
import { login } from "../../Utils/requests";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedInError: false,
    };

    this.handleEmailEvents = this.handleEmailEvents.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitevents = this.handleSubmitevents.bind(this);
  }

  handleEmailEvents(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmitevents(event) {
    // handle submit events
    const status = await login(this.state.email, this.state.password);
    if (status) {
      // On success
      this.setState({ loggedInError: false });
    } else {
      this.setState({ loggedInError: true });
    }
    console.log(this.state.loggedIn);
  }

  render() {
    return (
      <div className=" TestLoginForm ">
        {this.state.loggedInError && <p>Error logging in!</p>}
        <form>
          <label>Email</label>
          <input
            type="text"
            data-test="email"
            value={this.state.email}
            onChange={this.handleEmailEvents}
          />
          <label>Password</label>
          <input
            type="password"
            data-test="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            type="button"
            value="Log In"
            data-test="submit"
            onClick={this.handleSubmitevents}
          />
        </form>
      </div>
    );
  }
}
