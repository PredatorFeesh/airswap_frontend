import React from 'react';

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
            requests: []
        };
    }

    componentDidMount() {
        receivedRequests().then(data => {
            if (data != false) {
                const list = data["Requested by"];
                this.setState({requests: list});
            }
        });
    }

    render(){
    
      return (
        <div className="RequestedPage">
            <h1>You have been requested to swap with</h1>
        </div>
        );
      };
    }
