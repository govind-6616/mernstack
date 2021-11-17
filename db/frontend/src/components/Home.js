import React,{useEffect,useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import mern from "../images/mern.jpg";
import "./nav.css";

const Home = () => {
    const history = useHistory();
    const[userData,setUserData]=useState({
        username:"MERNSTACK"
    });

    const callHome=async()=>{
        try{
const res=await fetch('/getData',{
    method:'GET', 
        headers:{
            accept: "application/json",
            "Content-Type":"application/json"
    },
    credentials: "include"
});
const data=await res.json();
console.log("hello home name");
setUserData(data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callHome();

    }, []);
    return (
        <>
            <div className="container">
                <div className="main-container">
                    <div className="img">
                        <img src={mern} alt="image"></img>
                    </div>
                    <div className="main-data">
                        <div className="head"><h1> {userData.username} </h1>
                            <p>Welcome you all to my first mern project hope you like it.</p>
                            <button type="button" className='mbtn' value="Explore" onClick={()=>history.push('/About')}>Explore</button>
                        </div>
                    </div>
                </div>
                <div className="secondary-container">
                    <div className="secondary">
                        <div className="sec-item"><h2>Registeration</h2><button type="submit" className="btn" onClick={()=>history.push('/Signup')}>Registeratioin</button></div>
                        <div className="circle"><h3>Step-1</h3></div>
                        <div className="sec-item"><h2>Login</h2><button type="submit" className="btn" onClick={()=>history.push('/Login')}>Login</button></div>
                        <div className="circle"><h3>Step-2</h3></div>
                        <div className="sec-item"><h2>Explore</h2><button type="submit" className="btn" onClick={()=>history.push('/About')}>Explore</button></div>
                        <div className="circle"><h3>Step-3</h3></div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;