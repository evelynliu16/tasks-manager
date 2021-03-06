import React, { Component } from "react";
import axios from "axios";
import Register from "./Register";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;
        
        axios.post("http://localhost:3000/signin",
            { user: {
                username: username,
                password: password,
                }
            },
            { withCredentials: true })
            .then(response => {
                if (response.data.status === "created") {
                    this.handleSuccessfulAuth(response.data);
                } else {
                    alert("You username or password is incorrect")
                }
            })
            .catch(error => {
                console.log("Login error", error);
            });
        
        event.preventDefault();
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/home")
    }

    componentDidUpdate(prevStates, prevProps) {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            this.props.history.push('/home'); 
        }
    } 

    render() {
        return (
            <div style={{ padding: "20px" }}>
                <h2 className="app-name">TASKS MANAGER</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        className="fadeIn second"
                        placeholder="Username"
                        style={{ margin: "10px" }}
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />

                    <input type="password"
                        placeholder="Password"
                        name="password"
                        style={{ margin: "10px" }}
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    /><br/>

                    <button type="submit">Sign in</button>
                </form>
                <Register handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        );
    }
}

export default Login;