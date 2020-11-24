import React from 'react';

export class Login extends React.Component{
      
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        
        this.handleUsernameEvents = this.handleUsernameEvents.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitevents= this.handleSubmitevents.bind(this);
        }

        handleUsernameEvents(event) {
        this.setState({username: event.target.value});
        }
    
        handleSubmitevents(event) {
        // handle submit events
        }

        handlePasswordChange(event){
        this.setState({password: event.target.value});
        }

        render() {
            return (
                <div className=" TestLoginForm ">
                    <form onSubmit={this.handleSubmitevents}>
                        <label>User Name</label>
                        <input type="text" data-test="username" value={this.state.username} onChange={this.handleUsernameEvents} />
                        <label>Password</label>
                        <input type="password" data-test="password" value={this.state.password} onChange={this. handlePasswordChange } />
                        <input type="submit" value="Log In" data-test="submit" />
                    </form>   
                </div>
        );
      };
    }
