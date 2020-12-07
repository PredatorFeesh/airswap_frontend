import React from 'react';
import { logout } from "../Utils/requests";

export class Logout extends React.Component{

    logout () {
        logout();
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <button onClick={this.logout} className="confirm-logout">
                    {`Click here to confirm logout`}    
                </button>
            </div>
        );
    }
}