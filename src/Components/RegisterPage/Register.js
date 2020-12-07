import React from "react";
import { Button, Form } from 'react-bootstrap';

// import { login } from "../../Utils/requests";   <---Change register?

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loggedInError: false, //  <----Change?
    };

    this.handleNameEvents = this.handleNameEvents.bind(this);
    this.handleEmailEvents = this.handleEmailEvents.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitevents = this.handleSubmitevents.bind(this);
  }

  handleNameEvents(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailEvents(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmitevents(event) {  //<-----Change to work with register
    /*
    // handle submit events
    const status = await login(this.state.email, this.state.password);
    if (status) {
      // On success
      this.setState({ loggedInError: false });
    } else {
      this.setState({ loggedInError: true });
    }
    console.log(this.state.loggedIn);
    */
  }

  render() {
    return (
      <div>
        <h1>Ready to AirSwAP?</h1>
        <div>
          <Form>
            <Form.Group controlId="formBasicText
            ">
              <Form.Label >Name</Form.Label>
              <Form.Control type="text" placeholder="What is your name?" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label >Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>  
      </div>
    );
  }
}
