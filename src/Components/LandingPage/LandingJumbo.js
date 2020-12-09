import React from 'react';
import { Jumbotron, Container} from 'react-bootstrap';
import '../../Styles/LandingPage/LandingJumbo.css';

export class LandingJumbo extends React.Component{

    render(){
        return (
            <Jumbotron fluid className="LandingJumbo">
                <Container className="center">
                    <div >
                        <h1>AirSwAP</h1>
                        <p>
                        A modern way to experience culture
                        </p>
                    </div>
                </Container>
            </Jumbotron>
        )
    }
}