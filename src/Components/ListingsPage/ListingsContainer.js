import React from 'react';
import { Card } from 'react-bootstrap';
import { ListingsCard } from './ListingsCard.js'; 
import '../../Styles/ListingsPage/ListingsContainer.css';
export class ListingsContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          searchBarQuery: false, // false then show all subscribed to city listings, else show only what is wanted from the searchbar
        };
    }      

    render(){
        
        let listingsArr=[]
        for(let i=0; i<this.props.listings.length; i++){
            listingsArr.push(
                    <ListingsCard 
                                  className="listingCard"
                                  address={this.props.listings[i].Address} 
                                  city={this.props.listings[i].City}
                                  date={this.props.listings[i].Date}
                                  description={this.props.listings[i].Description}
                                  img={this.props.listings[i].Image}
                                  listingId={this.props.listings[i].ListingID}
                                  isListed={this.props.listings[i].is_listed}
                                  ownerDescription={this.props.listings[i].Owner.UserDescription}
                                  email={this.props.listings[i].Owner.Email}
                                  lastName={this.props.listings[i].Owner["First Name"]}
                                  ownerImg={this.props.listings[i].Owner.Image}      
                                  phoneNumber={this.props.listings[i].Owner["Phone Number"]}
                                  ownerId={this.props.listings[i].Owner.UserID}  
                                  key={`list-${i}`}                        
                                  />
                );
        }

      return (
        <div className="outerMostContainer" style={{ marginLeft: "auto", marginRight: "auto"}}>
            
            <Card className="topCard">
                <Card.Body>Where will you go next?</Card.Body>
            </Card>
            {listingsArr}
        </div>
        );
      };
    }
