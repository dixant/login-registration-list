import React, { Component } from "react";


import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      redirect: false
    };
  }

  
  validateForm() {
    const { userName, password } = this.state;
    return (
      userName.length > 0 &&
      password.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  componentDidUpdate =() => {
    if(this.state.redirect){
      console.log("redirecting");
      //return <Redirect to='/userlist' />
      window.location.href = "/userlist";
    }
    
  }
  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateForm()) {
        
        return;
      }
      else{
          console.log("done");
          let data={
              "userName" : this.state.userName,
              "password" : this.state.password
            };
          fetch("https://api.prontoitlabs.com/api/v1/user/login", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => {console.log('Success:', JSON.stringify(response))
          localStorage.setItem('userData', JSON.stringify(response.data));
          this.setState({
            redirect: true
          })
        })
          .catch(error => console.error('Error:', error));
      }
  }
  componentWillMount = () => {
      //console.log(JSON.parse(localStorage.getItem('userData')));
        if(localStorage.length >0){
            if (localStorage.getItem('userData') !== "null"){
                if(JSON.parse(localStorage.getItem('userData')).token){
                    window.location.href = "/userlist";
                }
            }
             
        }
      
  }
  
  render() {
    const { userName, password } = this.state;
    const isEnabled = userName.length > 0 && password.length > 0;
    console.log(isEnabled);
    return (
        <div className="login-page">
        <div className="form">
          
          <form className="login-form" id="login-form" onSubmit={this.handleSubmit}>
            <input id="userName" type="text" placeholder="username" autoFocus value={this.state.userName} onChange={this.handleChange} required="required" className="form-control"/>
            <input id="password" type="password" placeholder="password" onChange={this.handleChange.bind()} value={this.state.password} required="required" className="form-control"/>
            <button id="loginButton" disabled={!isEnabled}>login</button>
            <p className="message">Not registered? <a href="/register">Create an account</a></p>
            
          </form>
        </div>
      </div>
    );
  }
}