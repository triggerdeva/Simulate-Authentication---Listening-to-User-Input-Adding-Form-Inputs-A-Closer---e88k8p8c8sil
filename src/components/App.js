import React, { useState } from "react";
import "../styles/App.css";
import User from "../models/user";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const App = () => {

  const [state, setState] = useState({
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    signupConfirmPassword:"",
    user: new User('', '', ''),
  })
  const [valid, setValidity] = useState(true)
  const [flag, setFlag] = useState(false)

  let logEmail, logPass;

  const onStateChange = (e) => {
    let key = e.target.name;
    let values = e.target.value;
   
    setState({
      ...state,
      [key]: values,
    })
    if (key === 'signupConfirmPassword') {
      if (state.signupPassword === values) {
        setFlag(true)
      }   
    }
  }

  const onSuccessChange = () => {
    if (flag) {
      let newUser = new User(state.signupEmail, state.signupPassword, state.signupName)
      setState({
        ...state,
        user: newUser,
      })
    }
  }

  const setInput = (e) => {
    if (e.target.name === "loginEmail")
      logEmail = e.target.value;

    else if (e.target.name === "loginPassword")
      logPass = e.target.value;
  }

  const onCheck = () => {
    if (logEmail === state.signupEmail && logPass === state.signupPassword) {
      setValidity(false)
    }
    else {
      setState({
        ...state,
        user: new User('', '', ''),
      })
    }
  }
  const logout = () => {
    setValidity(true)
  }
  if (valid) return (
    <div id="main">

      <table id="all-users">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
          <tr>

            <td>{state.user.name}</td>
            <td>{state.user.email}</td>
            <td>{state.user.password}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <form className="signup-form">
          <label htmlFor="name">Name</label>
          <input type="text" name="signupName" id="signupName" onChange={onStateChange} />
          <label htmlFor="email">Email</label>
          <input type="email" name="signupEmail" id="signupEmail" onChange={onStateChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="signupPassword" id="signupPassword" onChange={onStateChange} />
          <label htmlFor="confirmPassword" >Confirm Password</label>
          <input onChange={onStateChange}
            type="password"
            name="signupConfirmPassword"
            id="signupConfirmPassword"
          />
        </form>
        <button id="signup-button" onClick={onSuccessChange}>Signup</button>
        <form className="login-styles">
          <label htmlFor="loginEmail">Email</label>
          <input id="loginEmail" name="loginEmail" type="email" onChange={setInput} />
          <label htmlFor="loginPassword">Password</label>
          <input id="loginPassword" name="loginPassword" type="password" onChange={setInput} />
        </form>
        <button id="login-button" onClick={onCheck}>Login</button>
      </div>
    </div>
  );

  else
    return (
      <div id="main">

        <table id="all-users">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
            <tr>

              <td>{state.user.name}</td>
              <td>{state.user.email}</td>
              <td>{state.user.password}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <h3 id="username">{state.signupName}</h3>
          <h3 id="email">{state.signupEmail}</h3>
          <button id="logout-button" onClick={logout}>Logout</button>
        </div>
      </div>

    );


};

export default App;
