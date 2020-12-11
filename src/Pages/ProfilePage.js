import React from 'react';
import { getProfile, isLoggedIn } from '../Utils/requests'
import { UserDetails } from '../Components/ProfilePage/UserDetails.js';
import { UserListingsDetails } from '../Components/ProfilePage/UserListingsDetails.js';
export class ProfilePage extends React.Component{

    async testButton() {
      const ret = await getProfile(2);
      console.log(ret);
    }
      
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
