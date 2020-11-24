import React from 'react';
import {LogoDescription} from '../Components/LandingPage/LogoDescription.js'
import {Login} from '../Components/LandingPage/Login.js'


export class LandingPage extends React.Component{
      
    render(){
    
      return (
        <div>
            <h1>Landing Page</h1>
            <div>
                <LogoDescription/>
            </div>
            <div>
                <button>Register (will redirect to register page</button>
                <Login/>
            </div>
        </div>
        );
      };
    }
