import React from 'react';

import {sentRequests} from '../Utils/requests';

export class ViewRequests extends React.Component{
    // Who you requested

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
        sentRequests().then(data => {
            if (data != false) {
                const list = data["Requested"];
                this.setState({requests: list});
            }
        });
    }

    render(){
    
      return (
        <div className="RequestsPage">
            <h1>You have requested to swap with</h1>
        </div>
        );
      };
    }
