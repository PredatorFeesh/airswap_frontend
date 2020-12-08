import React from 'react';
import { Jumbotron, Container} from 'react-bootstrap';
import '../../Styles/LoginPage/LoginJumbo.css';

class LoginJumbo extends React.Component{

    render(){
        return (
            <Jumbotron fluid className="LoginJumbo">
                <Container className="center">
                    <div >
                        <h2>Start Your Journey </h2>
                        
                        <p>" Travel changes you. As you move through this life and this world you change things slightly,
                           you leave marks behid, however small. And in return, 
                           life and travel leaves marks on you." 
                        </p> 
                        <p>- Anthony Bourdain</p>
                        
                    </div>
                </Container>
            </Jumbotron>
        )
    }
}

export default LoginJumbo