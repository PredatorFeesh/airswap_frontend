import React from 'react';
import { Form } from 'react-bootstrap';

export class Searchbar extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          
          cities: [
            {name:"London"}, {name: "Moscow"}
            ] 
        };
   
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount(){
        //to query the DB and fetch the cities. setState with the fetch response 
      }

    handleSelect(event){
        console.log("big fat butts");
        console.log(Date.now())
    }
    render(){
    
        let optionsArr=[]
        for( let i=0; i<this.state.cities.length; i++){
            optionsArr.push(<option onClick={this.handleSelect()} >{this.state.cities[i].name}</option>)
        }
      return (
        <div style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto", marginBottom:"5px"}}>
            
            <h1 style={{textAlign: "center"}}>Search bar</h1>
            <Form  >
                <Form.Group controlId="exampleForm.ControlSelect1" placeholder="Large text">
                    
                    
                    <Form.Control as="select">
                        <option value="" disabled selected>Select City: </option>
                        {optionsArr}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
        );
      };
    }
