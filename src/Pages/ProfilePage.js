import React from 'react';
import '../Styles/ProfileStyles/ProfilePage.css';
import { UserDetails } from '../Components/ProfilePage/UserDetails.js';
import { UserListingsDetails } from '../Components/ProfilePage/UserListingsDetails.js';

import { getProfile } from '../Utils/requests';

export class ProfilePage extends React.Component{
      
    constructor(props) {
      super(props);
      this.state = {
        id: parseInt(this.props.match.params.id),
        isSelf: parseInt(this.props.match.params.id) == -1,
        isLoaded: false,
        profile: {}, // Listing is profile.Listing
      };
    }

    getProfileAndListing = () => {
      if (this.state.isSelf) {
        // Get our profile
        getProfile().then(data => {
          if (data == false) return;
          this.setState({profile: data, isLoaded: true,});
        });
      } else {
        // Oterwise get their profile
        getProfile(this.state.id).then(data => {
          if (data == false) return;
          this.setState({profile: data, isLoaded: true,});
        });
      }
    }

    componentDidMount () {      
      if (!this.state.isLoaded) this.getProfileAndListing();
    }

    render(){
    
      return (
        <div className="profileOuterMost">
            
            <div className="inlineComponents">
            {this.state.isLoaded ?
              <> 
                <UserDetails isSelf={this.state.isSelf} id={this.state.id} profile={this.state.profile} />
                <UserListingsDetails isSelf={this.state.isSelf} id={this.state.id} listing={this.state.profile.Listing} />
              </>
              :
              <h1>Loading...</h1>
            }
            </div>
        </div>
        );
      };
    }
