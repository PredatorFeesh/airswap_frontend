import React from 'react';
import { cities } from '../Utils/requests';

export class ProfilePage extends React.Component{

    // constructor() {
    //   this.state = {
        
    //   };
    // }

    async testButton() {
      // Test user id 11
      // Test user Listing id 9
      const ret = await cities();
      console.log("Ret: ");
      console.log(ret);
    }
      
    render(){
    
      return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={this.testButton}>Test me</button>
        </div>
        );
      };
    }
