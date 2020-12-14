import React from 'react';

import { ListingsCard } from '../Components/ListingsPage/ListingsCard.js'; 

import {receivedRequests} from '../Utils/requests';

export class ViewRequested extends React.Component{
    // Who you have been requested by

    constructor(props) {
        super(props);
        // Example request:
        /* {
            Email: "emily@email.com"
            "First Name": "Emily"
            Image: "default.jpg"
            "Last Name": "Henry"
            Listing: Object { Address: "Emily's address", City: "London", Date: "Sat, 12 Dec 2020 00:00:00 GMT", … }
            "Phone Number": null
            UserDescription: null
            UserID: 9
        */
        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        receivedRequests().then(data => {
            if (data != false) {
                const list = data["Requested by"];
                this.setState({listings: list});
            }
        });
    }

    render(){

        let listingsArr=[]
        for(let i=0; i<this.state.listings.length; i++){
            listingsArr.push(
                    <ListingsCard address={this.state.listings[i].Listing.Address} 
                                  city={this.state.listings[i].Listing.City}
                                  date={this.state.listings[i].Listing.Date}
                                  description={this.state.listings[i].Listing.Description}
                                  img={this.state.listings[i].Listing.Image}
                                  listingId={this.state.listings[i].Listing.ListingID}
                                  isListed={this.state.listings[i].Listing.is_listed}
                                  ownerDescription={this.state.listings[i].UserDescription}
                                  email={this.state.listings[i].Email}
                                  lastName={this.state.listings[i]["First Name"]}
                                  ownerImg={this.state.listings[i].Image}      
                                  phoneNumber={this.state.listings[i]["Phone Number"]}
                                  ownerId={this.state.listings[i].UserID}  
                                  key={`list-${i}`}                        
                                  />
                );
        }

    
      return (
        <div className="RequestedPage">
            <h1>You have been requested to swap with</h1>

            {listingsArr}

        </div>
        );
      };
    }
