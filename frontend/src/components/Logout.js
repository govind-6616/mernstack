import React ,{useEffect,useContext} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Logout=()=>{
    const {state,dispatch}=useContext(UserContext);
    const history=useHistory();
    useEffect(()=>{
fetch('/logout',{
    method:"GET",
    headers:{
        accept:"application/json",
        "Content-Type":"application/json"
    },
    credentials:"include"
}).then((res)=>{
    dispatch({type:"USER",payload:false})
    history.push('/Login'); 
if(!res.status===200){
    const error=new Error(res.error);
    throw error;
}
})

    });
    return(
        <>
        <h1>User Logout</h1>
        </>
    )
}
export default Logout;