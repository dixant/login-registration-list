import React from 'react';

const signoutHandler = function (event)  {
    localStorage.clear();
    window.location.href = "/login";
}

const Header = (props) => {
    let showButton = true;
    if(window.location.pathname === "/login" || window.location.pathname === "/register"){
        showButton = false;
    }
    return (
        <header className="App-header clearfix">
            <img src={props.logo} className="App-logo  pull-left " alt="logo" />
            <p className="inlineBlock">
            Login-Registration-List
            </p>
            {showButton ? <button className="pull-right" onClick={(e) => signoutHandler(e)}>SignOut</button> : null}
        </header>
    );
  
}

export default Header;
