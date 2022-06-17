import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import img from "../images/images.jpeg";
import "./nav.css";

const Signup = () => {
    const history = useHistory();
    const [nam, setNam] = useState({
        username:"",name:"",email:"", password:"", cpassword:"", city:"", mobile:"", qualification:"",
        jobprofile:"",gender:"",Languages:"",Frameworks:"",Databases:"",projectLinks:""
    });
    const inputEvent = (event) => {
        //  const value=event.target.value;
        //     const name=event.target.name;
        const { value, name } = event.target;
        setNam((pre) => {
            console.log(pre);
            return {
                ...pre,
                [name]: value,
            };
        });
        // setNam({...nam,[name]:value});
    };
    const PostData = async (e) => {
        e.preventDefault();
        const { username,name,email, password, cpassword, city, mobile, qualification,
        jobprofile,gender,Languages,Frameworks,Databases,projectLinks } = nam;
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,name,email, password, cpassword, city, mobile, qualification,
                jobprofile,gender,Languages,Frameworks,Databases,projectLinks
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            document.getElementById('para').style.color = "red";
            document.getElementById('para').innerHTML = "user already exist"
            window.alert("user alreadt exist")
        }
        else if (res.status === 401 || !data) {
            document.getElementById('para').style.color = "Red";
            document.getElementById('para').innerHTML = "password not matching";
            window.alert("password not matched");
        }
        else {
            document.getElementById('para').style.color = "green";
            document.getElementById('para').innerHTML = "Successful Registeration";
            window.alert("successful registeration ");
            history.push('/Login');
        }

    }
    return (
        <>
            <div className="container">
                <div className="main">
                    <div className="info"><p id="para"> Fill the form properly</p></div>
                    <form method="post" className="form">

                        <img src={img} style={{ float: "right", margin: "20% 5% 0% 0%" }} alt="image" />
                        <input type="text" placeholder="Enter Username"
                            onChange={inputEvent} name="username" value={nam.username} />

                        <input type="text" placeholder="Enter Name"
                            onChange={inputEvent} name="name" value={nam.name} />
                             <input type="email" placeholder="Enter E-mail"
                            onChange={inputEvent} name="email" value={nam.email} />

                        <input type="password" placeholder="Enter Password"
                            onChange={inputEvent} name="password" value={nam.password} />

                        <input type="password" placeholder="Enter confirm Password"
                            onChange={inputEvent} name="cpassword" value={nam.cpassword} />

                        <input type="text" placeholder="Enter City"
                            onChange={inputEvent} name="city" value={nam.city} />

                        <input type="text" placeholder="Enter Phone Number "
                            onChange={inputEvent} name="mobile" value={nam.mobile} />

                        <input type="text" placeholder="Enter Qualification"
                            onChange={inputEvent} name="qualification" value={nam.qualification} />

                        <input type="text" placeholder="Job Profile(optional)"
                            onChange={inputEvent} name="jobprofile" value={nam.jobprofile} />

                        <input type="radio"  onChange={inputEvent} name="gender" value="Male" className="rbtn" />
                        <label for="ans1" className="lab">Male</label>

                        <input type="radio"  onChange={inputEvent}   name="gender" value="Female" className="rbtn" />
                        <label for="ans2"  className="lab">Female</label>
                        <br />

                        <input type='checkbox' value="HTML, CSS ,Javascript ,jquery" onChange={inputEvent} checked={nam.Languages} name="Languages"/>
                        <label htmlFor="v1"  className="lab2">HTML, CSS ,Javascript ,jquery</label>
                        <br />
                        <input type='checkbox' value="ReactJs / AngularJs (any one)" onChange={inputEvent}  checked={nam.Frameworks} name="Frameworks"/>
                        <label htmlFor="v2"  className="lab2">ReactJs / AngularJs  (any one)</label><br />
                        <input type='checkbox' value="MongoDB / Mysql / Firebase (any one)" onChange={inputEvent} checked={nam.Databases} name="Databases"/>
                        <label htmlFor="v3"  className="lab2">MongoDB / Mysql / Firebase  (any one)</label>
                        <br />
                     
                         
                         {/* <input type="text" style={{width:"80%"}} placeholder="Languages : HTML,CSS ,javascript (Any One)"
                            onChange={inputEvent} name="Languages" value={nam.Languages} />
                          
                             <input type="text" style={{width:"80%"}} placeholder="Frameworks : ReactJs / AngularJs (Any One)"
                            onChange={inputEvent} name="Frameworks" value={nam.Frameworks} />
                             <input type="text" style={{width:"80%"}} placeholder="Databases : MongoDB / Mysql / Firebase"
                            onChange={inputEvent} name="Databases" value={nam.Databases} /> */}
                            
                               <input type="text" placeholder="Project Links (optional)"
                          onChange={inputEvent} name="projectLinks" value={nam.projectLinks} />
                        <button type="submit"
                            className="btn" name="signup" value="register"
                            onClick={PostData}>Register</button>

                    </form>
                </div>
            </div>
        </>
    );
};
export default Signup;
