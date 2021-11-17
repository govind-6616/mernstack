import React, { createContext, useReducer } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Logout from "./components/Logout";
import Edit from "./components/Edit";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { initialState,reducer } from "../src/Reducer/useReducer";

export  const UserContext=createContext();

const App=()=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    return(
       
        <>
        <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
        <Nav/>
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Contact" component={Contact}/>
        <Route path="/About" exact component={About}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Logout" component={Logout}/>
    </Switch>
   </BrowserRouter>
        </UserContext.Provider>
        </>
    )
}
export default App;