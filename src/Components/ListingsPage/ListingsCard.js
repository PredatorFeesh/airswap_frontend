import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../Styles/ListingsPage/ListingsCard.css';

export class ListingsCard extends React.Component{
      
    render(){
    
      return (
        <div  >
            <Card className="cardOuter">
              <Card.Img variant="top" style={{maxHeight:"600px", maxWidth:"800px"}}src={this.props.img} />
                <Card.Text className="underImgText">
                  {this.props.city}, {this.props.address}
                </Card.Text>

              <Card.Body>
                <h3>Take you next adventure to {this.props.city}?</h3>
                <h6>Where you will be staying:</h6>
                <Card.Text>
                  {this.props.description}. {}
                </Card.Text>
                <h6>Who will stay at your place?</h6>
                <Card.Text>
                  {this.props.ownerDescription}. {}
                </Card.Text>
                
                <Button variant="outline-success" href={`/profile/${this.props.ownerId}`}>Find Out More</Button>
              </Card.Body>
            </Card>
        </div>
        );
      };
    }
