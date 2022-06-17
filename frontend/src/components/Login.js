import React, { useContext, useState } from "react";
import {NavLink,useHistory} from "react-router-dom";
import img from "../images/images.png";
import { UserContext } from "../App";
import "./nav.css";

const Login = () => {

     const {state,dispatch}=useContext(UserContext);
    const history=useHistory();
    const [name, setName] = useState({
        username: "",
        password: ""
    });

    const inputEvent = (event) => {
        //        const value=event.target.value;
        //        const name=event.target.name;
        const { value, name } = event.target;
        setName((pre) => {
            console.log(pre);
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    const sendEvent=async (e)=>{
        e.preventDefault();
        const {username,password}=name;
        const res=await fetch('/login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username,password})
        });
        const data=await res.json();
        if(res.status===200 || ! data){
            dispatch({type:"USER",payload:true})
            document.getElementById('para').style.color="yellow";
    document.getElementById('para').innerHTML="Successful Login";
            window.alert("successful Login");            
            history.push('/About'); 
            }
            else{
              
                document.getElementById('para').style.color="Red";
    document.getElementById('para').innerHTML="Invalid Credentials";
                window.alert("failed Login ");
            }
    }

    return (
        <>
        <div className="main">
            <div className="info"><p id="para">Fill the form properly</p></div>
            <form method="post" className="form">
                
            <img src={img} style={{float:"right" ,marginRight:"30px"}} alt="image"/>
                    <input type="text" placeholder="Enter username"
                        onChange={inputEvent} name="username" value={name.username} />

                    <input type="password" placeholder="Enter Password "
                        onChange={inputEvent} name="password" value={name.password} />

                    <button type="submit" name="login" value="Login" onClick={sendEvent} className="btn">Login</button>
              
            </form>
            </div>
        </>
    );
};
export default Login;