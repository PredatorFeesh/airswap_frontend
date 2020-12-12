import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { updateProfile } from "../../Utils/requests";

export class UserDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:"", 
            picture:"", 
            description:"", 
            email:"",
            phone_number: "",
        };

        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleEmailEvents=this.handleEmailEvents.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleSubmitevents=this.handleSubmitevents.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this);
    }
   
    componentDidMount () {
        console.log("PROFILE: ", this.props.profile);
        this.setState({
            name: this.props.profile["First Name"]+" "+this.props.profile["Last Name"] || "",
            picture: this.props.profile.Image || "",
            description: this.props.profile.UserDescription || "",
            email: this.props.profile.Email || "",
            phone_number: this.props.profile["Phone Number"] || "",
        })
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

      handleImageChange(event) {
        this.setState({image: event.target.value});
      }

      handlePhoneChange(event) {
        this.setState({phone_number: event.target.value});
      }



    async handleSubmitevents(event) {
        updateProfile(this.state.name, this.state.picture, this.state.phone_number, this.state.description);
    }
    

    render(){
    
      return (
        <div  style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto", marginBottom:"5px"}}>
            <h2>User Details Form</h2>
            <Form>
                <Form.Group controlId="formBasicText">
                <Form.Label >Name</Form.Label>
                <Form.Control 
                        readOnly={!this.props.isSelf}
                        type="text" 
                        placeholder="First and Last Please" 
                        value={this.state.name} 
                        onChange={this.handleNameChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control
                        readOnly={!this.props.isSelf} 
                        type="email"
                        data-test="email" 
                        placeholder="Enter email"  
                        value={this.state.email}
                        onChange={this.handleEmailEvents}
                            />
                    <Form.Text className="text-muted" readOnly={!this.props.isSelf}>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="formBasicText">
                <Form.Label >Phone Number</Form.Label>
                <Form.Control 
                        readOnly={!this.props.isSelf}
                        type="text" 
                        placeholder="Your phone number." 
                        value={this.state.phone_number} 
                        onChange={this.handlePhoneChange} />
                </Form.Group>


                <Form.Group controlId="formBasicText">
                <Form.Label >Picture</Form.Label>
                <Form.Control 
                        readOnly={!this.props.isSelf}
                        type="text" 
                        placeholder="Image location of you." 
                        value={this.state.picture} 
                        onChange={this.handleImageChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>User Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={this.state.description} onChange={this.handleDescriptionChange} readOnly={!this.props.isSelf}/>
                </Form.Group>
                <Button variant="primary" 
                    type="button"
                    value="Register"
                    data-test="submit"
                    onClick={this.props.isSelf ? this.handleSubmitevents : () => {}}>
                    Update Profile
                </Button>
            </Form>
        </div>
        );
      };
    }
