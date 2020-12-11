import React from 'react';
import { ListingsCard } from './ListingsCard.js'; 

export class ListingsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          searchBarQuery: false, // false then show all subscribed to city listings, else show only what is wanted from the searchbar
          listings: [
                { 
                    address:"17 waverly Pl apt9", city: "Madison", date:"12/12/20", description:"Beautiful town", image:"picture of my home", listingId:"1", isListed:"true", 
                    owner: {
                        ownerDescription:"Tall, blond, looks russian but is actually Ukrainian", email:"pablo.escobar@colombiaCocain.edu", firstName:"Pasha", image:"img", 
                        lastName:"Aleks", phoneNumber:"3479242401", userId:"007"
                    }
                },
                { 
                    address:"London", city: "City of London ", date:"12/12/20", description:"Great old city", image:"big clock", listingId:"2", isListed:"true",
                     owner: {
                        ownerDescription:"cool, brunet ", email:"cool.brunet@xyz.com", firstName:"june", image:"img", lastName:"bug", phoneNumber:"no phone", userId:"008"
                    }
                }
        ] 
        };
    /*
        
        this.handleSubmitevents = this.handleSubmitevents.bind(this);
    */  
    }  

    componentWillMount(){
        //to query the DB and fetch the cities. Should check the searchbar query props. Should set the listings state [{}] 
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
