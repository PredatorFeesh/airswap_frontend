import React from 'react';

export class ListingsCard extends React.Component{
      
    render(){
    
      return (
        <div style={{border: "2px solid black", margin: "10px"}}>
            <a href={`/profile/${this.props.ownerId}`}><h3>Listings Card</h3></a>
            <p>address: {this.props.address}</p>
            <p>city: {this.props.city}</p>
            <p>date: {this.props.date}</p>
            <p>description: {this.props.description}</p>
            <p>img: {this.props.img}</p>
            <p>listingId: {this.props.listingId}</p>
            <p>isListed: {this.props.isListed}</p>
            <p>ownerDescription: {this.props.ownerDescription}</p>
            <p>email: {this.props.email}</p>
            <p>lastName: {this.props.lastName}</p>
            <p>ownerImg: {this.props.ownerImg}</p>
            <p>phoneNumber: {this.props.phoneNumber}</p>
            <p>ownerId: {this.props.ownerId}</p>
            

        </div>
        );
      };
    }
