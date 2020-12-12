import React from 'react';
import { Form } from 'react-bootstrap';

import { cities } from '../../Utils/requests';

export class Searchbar extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          cities: [{Name: "Loading..."}],
        };
    }

    componentDidMount() {
        this.getCities();
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
        this.props.searchCity(event.target.value);
    }
    

    render(){
        let optionsArr=[]
        for( let i=0; i<this.state.cities.length; i++){
            optionsArr.push(<option  key={i}>{this.state.cities[i].Name}</option>);
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
            </Form>


        </div>
        );
      };
    }
