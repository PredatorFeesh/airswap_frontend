import React from 'react';
import {Login} from '../Components/LoginPage/Login';
import '../Styles/LoginPage/outermost.css';
import  LoginJumbo from '../Components/LoginPage/LoginJumbo.js';

export class LoginPage extends React.Component{


    render(){
    
      return (
        <div className="loginPageOuterDiv">
            <Login/>
            <LoginJumbo/>
        </div>
        );
      };
    }
