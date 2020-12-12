import React from 'react';
import { requests } from '../Utils/requests'

export class ProfilePage extends React.Component{

    async testButton() {
      const ret = await requests();
      console.log(ret);
    }
      
    render(){
    
      return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={async () => {await this.testButton();}}> Click Test </button>
        </div>
        );
      };
    }
