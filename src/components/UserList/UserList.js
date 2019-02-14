import React, { Component } from "react";
import "./UserList.css";
import Pager from 'react-pager';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.state = {
      token: "",
      userData: [],
      total:       44,
			current:     1,
			visiblePage: 7,
    };
  }


  componentDidMount = () => {
    console.log("hello");
    let token;
    if(localStorage.length > 0){
      if(localStorage.getItem('userData')){
        token =  JSON.parse(localStorage.getItem('userData')).token;
      }
    }
    //let token =  JSON.parse(localStorage.getItem('userData')).token;
    console.log(token);
    let url = "https://api.prontoitlabs.com/api/v1/user?page=0&size=25";
    fetch(url, {
      headers: { "X-AUTH-TOKEN": token},
      method: 'GET'
    }).then(res => res.json())
    .then(response => {console.log('Success:', JSON.stringify(response))
    //localStorage.setItem('userData', JSON.stringify(response.data));
         this.setState({
           userData: response.data.content
         })
          
          })
         
        
  }
  handleSelect = () => {
    
  }
  handlePageChanged(newPage) {
    this.setState({ current : newPage });
    let token;
    if(localStorage.length > 0){
      if(localStorage.getItem('userData')){
        token =  JSON.parse(localStorage.getItem('userData')).token;
      }
    }
    //let token =  JSON.parse(localStorage.getItem('userData')).token;
    console.log(token);
    let url = "https://api.prontoitlabs.com/api/v1/user?page="+newPage+"&size=25";
    fetch(url, {
      headers: { "X-AUTH-TOKEN": token},
      method: 'GET'
    }).then(res => res.json())
    .then(response => {console.log('Success:', JSON.stringify(response))
    //localStorage.setItem('userData', JSON.stringify(response.data));
         this.setState({
           userData: response.data.content
         })
          
          })
	}
  render() {
    console.log(this.state.userData);
    if(localStorage.length <= 0){
      if(!localStorage.getItem('userData')){
        window.location.href = "/login";
      }
    }
    
    let rows = this.state.userData.map(userData => {
      return <UserListDetails key = {
        userData.id
      }
      data = {
        userData
      }
      />
    })
    return (
        <div className="userList">
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Gender</th>
              </tr>
              
                {rows}
              
            </tbody>
          </table>
          
          <Pager
            total={this.state.total}
            current={this.state.current}
            visiblePages={this.state.visiblePage}
            titles={{ first: '<|', last: '>|' }}
            className="pagination-sm pull-right"
            onPageChanged={this.handlePageChanged}
          />
      </div>
    );
  }
}

const UserListDetails = (props) => {
  return(
  <tr>
    <td>{props.data.id}</td>
    <td>{props.data.userName}</td>
    <td>{props.data.password}</td>
    <td>{props.data.gender}</td>
  </tr>
  );
}


