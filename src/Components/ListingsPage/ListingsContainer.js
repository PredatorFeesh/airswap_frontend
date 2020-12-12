import React from 'react';
import { ListingsCard } from './ListingsCard.js'; 

import { listings } from '../../Utils/requests';

export class ListingsContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          searchBarQuery: false, // false then show all subscribed to city listings, else show only what is wanted from the searchbar
          listings: [] 
        };
    }  

    componentDidMount() {
        this.updateListings();
    }

    updateListings() {
        listings().then(data => {
            if (data == false) {
                // If we failed the request
                this.setState({listings: []});
                return;
            }
            this.setState({listings: data});
            console.log(this.state.listings);
        });
    }
    

    render(){
        
        let listingsArr=[]
        for(let i=0; i<this.state.listings.length; i++){
            listingsArr.push(
                    <ListingsCard address={this.state.listings[i].address} 
                                  city={this.state.listings[i].city}
                                  date={this.state.listings[i].date}
                                  description={this.state.listings[i].description}
                                  img={this.state.listings[i].img}
                                  listingId={this.state.listings[i].listingId}
                                  isListed={this.state.listings[i].isListed}
                                  ownerDescription={this.state.listings[i].owner.ownerDescription}
                                  email={this.state.listings[i].owner.email}
                                  lastName={this.state.listings[i].owner.firstName}
                                  ownerImg={this.state.listings[i].owner.img}      
                                  phoneNumber={this.state.listings[i].owner.phoneNumber}
                                  ownerId={this.state.listings[i].owner.userId}  
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
