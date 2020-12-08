import React from 'react';
import { LogoDescription } from '../Components/LandingPage/LogoDescription.js';
import { LandingCarousel } from '../Components/LandingPage/LandingCarousel.js' ;
import { LandingJumbo } from '../Components/LandingPage/LandingJumbo.js';
import '../Styles/LandingPage/LandingBackround.css'

export class LandingPage extends React.Component{
      
    render(){
    
      return (
        <div className="background">
            <div>

            </div>
            <div>
                <LandingJumbo/>
                <LandingCarousel/>
            </div>
        </div>
        );
      };
    }
