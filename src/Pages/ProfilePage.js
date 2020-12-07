import React from 'react';
import { getProfile } from '../Utils/requests';

export class ProfilePage extends React.Component{

    async testButton() {
      const ret = await getProfile();
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
