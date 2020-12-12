import React from 'react';
import { ListingsContainer } from '../Components/ListingsPage/ListingsContainer.js';
import { Searchbar } from '../Components/ListingsPage/Searchbar.js';

import { listings } from "../Utils/requests";

export class ListingsPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

    componentDidMount() {
      this.updateListings();
    }

    updateListings = () => {
        listings().then(data => {
            if (data == false) {
                // If we failed the request
                this.setState({listings: []});
                return;
            }
            this.setState({listings: data});
        });
    }

    searchCity = (cityName) => {
      if(cityName == "Followed Cities") {
        this.updateListings();
      } else {
        listings(cityName).then(data => {
          if (data == false) {
            return;
          }
          this.setState({listings: data.Listings});
        });
      }
    }
      
    render(){
    
      return (
        <div >
            <h1 style={{textAlign: "center"}}>Listings Page</h1>
            <Searchbar
              searchCity={this.searchCity}
            />
            <ListingsContainer
              listings={this.state.listings}
            />
        </div>
        );
      };
    }
