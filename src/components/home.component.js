import React, { Component } from "react";

import UserService from "../services/user.service";
import LocationPost from "./location-post.component";
import axios from "axios";
import authHeader from "../services/auth-header";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }





    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                {/*<header className="jumbotron">*/}
                {/*    <h3>{this.state.content}</h3>*/}
                {/*    <h3>Hier komen de posts van alle gebruikers </h3>*/}
                {/*</header>*/}
                <div>
                    <LocationPost />

                </div>
            </div>
        );
    }
}
