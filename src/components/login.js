import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    logged_in=false;
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        const {
            username,
            password
        } = this.state;

        axios.post('http://localhost:8080/api/auth/signin', {
                userName: username,
                password: password
        }
        // ,
        //     { withCredentials: true }
            ).then(response =>{
                console.log("res from login: ", response);
                if(response.data.logged_in === true){
                    this.props.handleSuccessfulAuth(response.data);
                }

        }).catch(error => {
            console.log("login error", error);
        })
        event.preventDefault();
    }

    render(){
        return (
            <div>
             <form className="logForm" onSubmit={this.handleSubmit}>

                 <input
                     type= "text"
                     name="username"
                     placeholder="Gebruikersnaam"
                     value={this.state.username}
                     onChange={this.handleChange}
                     required
                 />

                 <input
                     type= "password"
                     name="password"
                     placeholder="Password"
                     value={this.state.password}
                     onChange={this.handleChange}
                     required
                 />

                 <button type="submit">Login</button>

             </form>
            </div>
        );
    }
}
