import React from 'react';

import { UserDetails } from '../Components/ProfilePage/UserDetails.js';
import { UserListingsDetails } from '../Components/ProfilePage/UserListingsDetails.js';

export class ProfilePage extends React.Component{
      
    constructor(props) {
      super(props);
      this.state = {
        id: 0,
        isSelf: false,
      };
    }

    componentDidMount () {
      const id = this.props.match.params.id

      this.setState({isSelf: (id == -1 ? true : false), id});
    }

    render(){
    
      return (
        <div>
            <h1>Profile Page</h1>
            <UserDetails isSelf={this.state.isSelf} id={this.state.id} />
            <UserListingsDetails isSelf={this.state.isSelf} id={this.state.id} />
        </div>
        );
      };
    }
