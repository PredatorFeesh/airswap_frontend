import React from "react";
import { login } from "../../Utils/requests";
import { Card, Button, Form } from 'react-bootstrap';
import '../../Styles/LoginPage/loginCard.css';

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
      window.location.href = "/profile";
    } else {
      this.setState({ loggedInError: true });
    }
    console.log(this.state.loggedIn);
  }

  render() {
    return (
      <div className="LoginCard ">
        {this.state.loggedInError && <p>Error logging in!</p>}

        <Card >
          <Card.Img variant="top" src="https://s27363.pcdn.co/wp-content/uploads/2017/09/Once-A-Year.jpg.optimal.jpg" />
          <Card.Body className="loginForm">
            <Card.Title>Welcome Back</Card.Title>
            <Form >
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
          </Card.Body>
        </Card>
        
        
        
        
      </div>
    );
  }
}
