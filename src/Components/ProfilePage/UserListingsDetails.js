import React from 'react';
import { Form, Button } from 'react-bootstrap';

export class UserListingsDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cityOption:["London", "New York", "Kiev", "Moscow"], // <--------Needs to be fetched in and populated
            picture:"", 
            description:"", 
            location:"",
            citySelection: ""
        };


        this.handlePictureChange=this.handlePictureChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleCitySelectionChange=this.handleCitySelectionChange.bind(this);
        this.handleLocationChange=this.handleLocationChange.bind(this);
        this.handleSubmitevents=this.handleSubmitevents.bind(this);
    }
   

    
    
      handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
      }
    
      handleCitySelectionChange(event) {
        this.setState({ citySelection: event.target.value });
      }

      handlePictureChange(event) { //
        this.setState({ picture: event.target.value }); //need to pass this function as a prop below
      }

      handleLocationChange(event) { 
        this.setState({location: event.target.value }); 
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
        
        let optionsArr=[]
        for( let i=0; i<this.state.cityOption.length; i++){
            optionsArr.push(<option  key={i}>{this.state.cityOption[i]}</option>)
        }

      return (
        <div  style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto", marginBottom:"5px"}}>
            <h2>User Listing Details Form</h2>
      <p>Selected city is: {this.state.citySelection}</p>
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1" placeholder="Large text">
                    <Form.Label >Select Your City</Form.Label>
                    <Form.Control as="select" onChange={this.handleCitySelectionChange} >
                        {optionsArr}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                <Form.Label >Location Address</Form.Label>
                <Form.Control 
                        type="text" 
                        placeholder="What is the address?" 
                        value={this.state.location} 
                        onChange={this.handleLocationChange} />
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
                    Update Listing
                </Button>
            </Form>
        </div>
        );
      };
    }