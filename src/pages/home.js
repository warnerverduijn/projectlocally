import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Register from "../components/register";
import Login from "../components/login";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        // TODO update parent component
        this.props.handleLogin(data);
        this.props.history.push("/Profile")
    }

    render() {
        return (
          <div className="HomePage">
              {/*<h1>Home</h1>*/}
              {/*<h1>Status: {this.props.loggedInStatus}</h1>*/}
              <Register handleSuccessfulAuth={this.handleSuccessfulAuth}/>
              <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
          </div>
        );
    }
}

