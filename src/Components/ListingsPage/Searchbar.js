import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { cities, followedCities, follow, unfollow } from '../../Utils/requests';

export class Searchbar extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          cities: [{Name: "Loading..."}],
          currentCity: 'Followed Cities',
          followedCities: [],
        };
    }

    componentDidMount() {
        this.getCities();
        this.getFollowedCities();
    }

    getFollowedCities() {
        followedCities().then(data => {
            if (data == false){
                return;
            }
            this.setState({followedCities: data.Cities});
        })
    }

    getCities() {
        cities().then(data => {
            if (data == false) {
                this.setState({cities: []});
                return;
            }
            const cities = [{Name: "Followed Cities"}].concat(data.Cities);
            this.setState({cities});
        });
    }

    searchCity = (event) => {
        this.setState({currentCity: event.target.value});
        this.props.searchCity(event.target.value);
    }

    unfollowSelectedCity = () => {
        unfollow(this.state.currentCity);
        this.getFollowedCities();
    }

    followSelectedCity = () => {
        follow(this.state.currentCity);
        this.getFollowedCities();
    }
    

    render(){
        // Get options for cities
        let optionsArr = [];
        for( let i=0; i<this.state.cities.length; i++){
            optionsArr.push(<option  key={i}>{this.state.cities[i].Name}</option>);
        }

        // Get button follow or unfollow city
        let followUnfollow = undefined;
        if (this.state.followedCities.findIndex(cityObj => cityObj.Name == this.state.currentCity) >= 0) {
            // If we are already following
            followUnfollow = <Button variant="primary" 
                type="button"
                value="Unfollow"
                data-test="unfollow"
                onClick={this.unfollowSelectedCity}>
                {`Unfollow`}
            </Button>;
        } else if (this.state.currentCity == "Followed Cities") {
            // If on followed cities screen
        } else {
            // If we aren't following
            followUnfollow = <Button variant="primary" 
                type="button"
                value="Follow"
                data-test="follow"
                onClick={this.followSelectedCity}>
                {`Follow`}
            </Button>;
        }

      return (

        <div style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto", marginBottom:"5px"}}>
            <h1 style={{textAlign: "center"}}>Search bar</h1>
            
            
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1" placeholder="Large text">
      
                <h3>Search for your next destination!</h3>
                    <Form.Control as="select" value={this.state.citySelected} onChange={this.searchCity} >
                        {optionsArr}
                    </Form.Control>
                </Form.Group>
                {followUnfollow}
            </Form>


        </div>
        );
      };
    }
