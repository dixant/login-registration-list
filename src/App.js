import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import {Pagination} from 'react-bootstrap';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserList from './components/UserList/UserList';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header logo={logo} ></Header>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route  path="/login" component={Login} />
            <Route  path="/register" component={Register} />
            <Route  path="/userlist" component={UserList} />
          </Switch>
		    </Router>
      </div>
    );
  }
}

export default App;
