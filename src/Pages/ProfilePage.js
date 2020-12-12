import React from 'react';

import { UserDetails } from '../Components/ProfilePage/UserDetails.js';
import { UserListingsDetails } from '../Components/ProfilePage/UserListingsDetails.js';

export class ProfilePage extends React.Component{
      
    render(){
    
      return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={async () => {await this.testButton();}}> Click Test </button>
            <UserDetails/>
            <UserListingsDetails/>
        </div>
        );
      };
    }
