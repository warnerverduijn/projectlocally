import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            registrationErrors: ""
        }
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
            firstname,
            lastname,
            email,
            username,
            password
        } = this.state;

        axios.post('http://localhost:8080/api/auth/signup', {
                firstName: firstname,
                lastName: lastname,
                email: email,
                username: username,
                password: password
        }
        // ,
        //     { withCredentials: true }
            ).then(response =>{
                console.log("registration: ", response);
                if(response.status === '200'){
                    this.props.handleSuccessfulAuth(response.data);
                }

        }).catch(error => {
            console.log("registration error", error);
        })
        console.log("form submitted");
        event.preventDefault();
    }

    render(){
        return (
            <div>
             <form className="RegForm" onSubmit={this.handleSubmit}>

                 <input
                     type= "text"
                     name="firstname"
                     placeholder="Voornaam"
                     value={this.state.firstname}
                     onChange={this.handleChange}
                     required
                 />

                 <input
                     type= "text"
                     name="lastname"
                     placeholder="Achternaam"
                     value={this.state.lastname}
                     onChange={this.handleChange}
                     required
                 />

                 <input
                     type= "email"
                     name="email"
                     placeholder="Email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     required
                 />

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

                 <button type="submit">Register</button>

             </form>
            </div>
        );
    }
}
