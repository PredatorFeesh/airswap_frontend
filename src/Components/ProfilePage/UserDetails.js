import React from 'react';
import { Form, Button } from 'react-bootstrap';

export class UserDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"", 
            picture:"", 
            description:"", 
            email:""
        };

        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleEmailEvents=this.handleEmailEvents.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handlePictureChange=this.handlePictureChange.bind(this);
        this.handleSubmitevents=this.handleSubmitevents.bind(this);
    }
   

    handleEmailEvents(event) {
        this.setState({ email: event.target.value });
      }
    
      handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
      }
    
      handleNameChange(event) {
        this.setState({ name: event.target.value });
      }

      handlePictureChange(event) { //should this even be 
        this.setState({ picture: event.target.value }); //need to pass this function as a prop below
      }



    async handleSubmitevents(event) {
        /*
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
        */
    }
    

    render(){
    
      return (
        <div  style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto", marginBottom:"5px"}}>
            <h2>User Details Form</h2>
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

                <Form>
                    <Form.Group>
                        <Form.File id="exampleFormControlFile1" label="Upload your picture :)"  />
                    </Form.Group>
                </Form>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>User Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={this.state.description} onChange={this.handleDescriptionChange}/>
                </Form.Group>
                <Button variant="primary" 
                    type="button"
                    value="Register"
                    data-test="submit"
                    onClick={this.handleSubmitevents}>
                    Update Profile
                </Button>
            </Form>
        </div>
        );
      };
    }
