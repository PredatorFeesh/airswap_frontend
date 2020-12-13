import React from 'react';
import { ListingsCard } from './ListingsCard.js'; 

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
                    <ListingsCard address={this.props.listings[i].Address} 
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
        <div style={{border: "5px solid black", width: "40%",marginLeft: "auto", marginRight: "auto"}}>
            
            <h2>Listings Container</h2>
            {listingsArr}
        </div>
        );
      };
    }
