import React from 'react';
import {Register} from '../Components/RegisterPage/Register';
import { RegisterCarousel } from '../Components/RegisterPage/Carousel.js';
import '../Styles/RegisterPage.css';

export class RegisterPage extends React.Component{
      
    render(){
    
      return (
        <div>
            
            <div className="registerAndCarousel">
              <div className="carouselComponent">
                <RegisterCarousel/>
              </div>
              <div className="registerComponent"> 
                <Register/>
              </div>
            </div>
            
        </div>
        );
      };
    }
