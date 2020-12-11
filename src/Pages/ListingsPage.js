import React from 'react';
import { ListingsContainer } from '../Components/ListingsPage/ListingsContainer.js';
import { Searchbar } from '../Components/ListingsPage/Searchbar.js';

export class ListingsPage extends React.Component{
      
    render(){
    
      return (
        <div >
            <h1 style={{textAlign: "center"}}>Listings Page</h1>
            <Searchbar/>
            <ListingsContainer/>
        </div>
        );
      };
    }
