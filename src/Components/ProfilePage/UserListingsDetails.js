import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { updateListing, sentRequests, openListing, closeListing } from "../../Utils/requests";

export class UserListingsDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cityOption:["London", "New York", "Kiev", "Moscow"], // <--------Needs to be fetched in and populated
            picture:"", 
            description:"", 
            location:"",
            citySelection: "",
            isListed: false,
        };


        this.handlePictureChange=this.handlePictureChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleCitySelectionChange=this.handleCitySelectionChange.bind(this);
        this.handleLocationChange=this.handleLocationChange.bind(this);
        this.handleSubmitevents=this.handleSubmitevents.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
    }

    componentDidMount() {
      this.setState({
        id: this.props.listing.ListingID || "",
        location: this.props.listing.Address || "",
        picture: this.props.listing.Image || "",
        description: this.props.listing.Description || "",
        citySelection: this.props.listing.City || "",
        isListed: this.props.listing.is_listed || "",
      });
      
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

      handleImageChange(event) {
        this.setState({image: event.target.value});
      }

    failedUpdate = () => {
      // When we failed to update profile. @P
    }

    failChangeListingStatus = () => {
      // When we fail to change listing status @P
    }

    failRequest = () => {
      // When we fail to send a request to the user @P
    }

    successUpdate = () => {
      // When we succesful update user info
    }

    successChangeListingStatus = () => {
      // When we successfully change status of listing open or close
    }

    successRequest = () => {
      // When a request was successfully made
    }


    async handleSubmitevents(event) {
      const response = updateListing(this.state.location, this.state.citySelection, this.state.picture, this.state.description).then(data => {});
      if (response == false) {
        this.failedUpdate();
      } else {
        this.successUpdate();
      }
    }

    closeListing = () => {
      const response = closeListing();
      if (response != false) {
        this.setState({isListed: false});
        this.successChangeListingStatus();
      } else {
        this.failChangeListingStatus();
      }
    }

    openListing = () => {
      const response = openListing();
      if (response != false) {
        this.setState({isListed: true});
        this.successChangeListingStatus();
      } else {
        this.failChangeListingStatus();
      }
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
                    <Form.Control as="select" value={this.state.citySelection} onChange={this.handleCitySelectionChange} disabled={!this.props.isSelf} >
                        {optionsArr}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                <Form.Label >Location Address</Form.Label>
                <Form.Control 
                        readOnly={!this.props.isSelf}
                        type="text" 
                        placeholder="What is the address?" 
                        value={this.state.location} 
                        onChange={this.handleLocationChange} />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                <Form.Label >Picture</Form.Label>
                <Form.Control 
                        readOnly={!this.props.isSelf}
                        type="text" 
                        placeholder="Location of image of your home." 
                        value={this.state.picture} 
                        onChange={this.handleImageChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>User Description</Form.Label>
                    <Form.Control readOnly={!this.props.isSelf} as="textarea" rows={3} value={this.state.description} onChange={this.handleDescriptionChange}/>
                </Form.Group>
                <Button variant="primary" 
                    readOnly={!this.props.isSelf}
                    type="button"
                    value="Register"
                    data-test="submit"
                    onClick={this.props.isSelf ? this.handleSubmitevents : () => {}}>
                    Update Listing
                </Button>
                { this.props.isSelf &&
                  <>
                    { this.state.isListed ?
                      <Button variant="primary" 
                          type="button"
                          value="CloseListing"
                          data-test="submit"
                          onClick={this.closeListing}>
                          Close Listing
                      </Button>
                      :
                        <Button variant="primary" 
                            type="button"
                            value="OpenListing"
                            data-test="submit"
                            onClick={this.openListing}>
                            Open Listing
                        </Button>
                    }
                  </>
                }
            </Form>
        </div>
        );
      };
    }
