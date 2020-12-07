import React from "react";
import { register } from "../../Utils/requests";


export class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      loggedInError: false,
    };

    this.handleEmailEvents = this.handleEmailEvents.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmitevents = this.handleSubmitevents.bind(this);
  }

  handleEmailEvents(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmitevents(event) {
    // handle submit events
    const status = await register(this.state.email, this.state.password, this.state.name);
    if (status) {
      // On success
      this.setState({ loggedInError: false });
      window.location.href = "/profile";
    } else {
      this.setState({ loggedInError: true });
    }
    console.log(this.state.loggedIn);
  }

  render() {
    return (
      <div className="RegisterForm ">
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
          <label>Name (In the format: First Last)</label>
          <input
            type="text"
            data-test="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input
            type="button"
            value="Register"
            data-test="submit"
            onClick={this.handleSubmitevents}
          />
        </form>
      </div>
    );
  }
}
