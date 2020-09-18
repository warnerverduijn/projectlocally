import React, { Component } from "react";
import AuthService from "../services/auth.service";
import MyMapComponent, {Maps} from "./maps.component";
import Map from "./maps.component";
import GoogleMap from "./maps.component";
import Profilepicture from "./profilepic.png"



export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <img src={Profilepicture} alt="profile-img" className="profile-img-card"/>
                        <strong>{currentUser.username}</strong>
                    </h3>

                    {/*<p>*/}
                    {/*    <strong>Id:</strong>{" "}*/}
                    {/*    {currentUser.id}*/}
                    {/*</p>*/}
                    {/*<p>*/}
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                    {/*</p>*/}
                    {/*<p>*/}
                    {/*<strong>Username:</strong>{" "}*/}
                    {/*{currentUser.username}*/}
                    {/*</p>*/}

                </header>
                {/*<p>*/}
                {/*    <strong>Token:</strong>{" "}*/}
                {/*    {currentUser.accessToken.substring(0, 20)} ...{" "}*/}
                {/*    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
                {/*</p>*/}

                {/*<ul>*/}


                {/*<strong>Authorities:</strong>*/}

                {/*{currentUser.roles &&*/}
                {/*currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
                {/*</ul>*/}


                <p className="willem">Zet jouw ontdekking hier op de kaart</p>

                {/*<MyMapComponent/>*/}

                <GoogleMap/>

            </div>
        );
    }
}
