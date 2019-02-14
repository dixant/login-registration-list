import React, { Component } from "react";
import "./Register.css";
import { Redirect } from 'react-router-dom'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      gender: "",
      redirect: false
    };
  }
  componentDidUpdate =() => {
    if(this.state.redirect){
      console.log("redirecting");
      //return <Redirect to='/userlist' />
      window.location.href = "/userlist";
    }
    
  }
  validateForm() {
    const { userName, password,gender } = this.state;
    return (
      userName.length > 0 &&
      password.length > 0 &&
      (gender.toLocaleLowerCase() === "male" || gender.toLocaleLowerCase() === "female")
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateForm()) {
        
        return;
      }
      else{
          let data={
              "userName" : this.state.userName,
              "password" : this.state.password,
              "gender" : this.state.gender.toUpperCase()
            };
            console.log(JSON.stringify(data));
            let url = 'https://api.prontoitlabs.com/api/v1/user';
          fetch(url, {
            headers: { "Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(data),
            sync: true,
          }).then(res => res.json())
          .then(response => {console.log('Success:', response)
         
          console.log(response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data));
          console.log(JSON.parse(localStorage.getItem('userData')));
          this.setState({
            redirect: true
          })
                    })
          .catch(error => console.error('Error:', error));
      }
  }
  
  render() {
    
    const { userName, password, gender } = this.state;
    const isEnabled = userName.length > 0 && password.length > 0 && (gender.toLocaleLowerCase() === "male" || gender.toLocaleLowerCase() === "female");
    return (
        <div className="login-page">
        <div className="form">
          <form className="register-form" id="register-form" onSubmit={this.handleSubmit}>
            <input id="userName" type="User" placeholder="User Name" autoFocus value={this.state.userName} onChange={this.handleChange} required="required" className="form-control"/>
            <input id="password" type="password" autoComplete="true" placeholder="Password" onChange={this.handleChange.bind()} value={this.state.password} required="required" className="form-control"/>
            <select id="gender" type="gender" onChange={this.handleChange.bind()} value={this.state.gender} required="required" className="form-control">
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHERS">OTHERS</option>
            </select>

            <button id="createButton" disabled={!isEnabled}>create</button>
            <p className="message">Already registered? <a href="/login">Sign In</a></p>
          </form>
        </div>
      </div>
    );
  }
}

