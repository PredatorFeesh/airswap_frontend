import React from "react";
import { Button, Form } from 'react-bootstrap';
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
        <h1>Ready to AirSwAP?</h1>
        <div>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label >Name</Form.Label>
              <Form.Control 
                    type="text" 
                    placeholder="First and Last Please" 
                    value={this.state.name} 
                    onChange={this.handleNameChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label >Email address</Form.Label>
              <Form.Control 
                  type="email"
                  data-test="email" 
                  placeholder="Enter email"  
                  value={this.state.email}
                  onChange={this.handleEmailEvents}
                    />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  data-test="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}/>
            </Form.Group>
            <Button variant="primary" 
                    type="button"
                    value="Register"
                    data-test="submit"
                    onClick={this.handleSubmitevents}>
              Register
            </Button>
          </Form>
        </div>  
      </div>
    );
  }
}
