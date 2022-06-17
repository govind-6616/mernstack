import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./nav.css";
const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    
    const callAbout = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;

            }

        }
        catch (err) {
            history.push('/Login');
            console.log(err);

        }
    }
    useEffect(() => {
        callAbout();

    }, []);
    return (
        <>
            <div id="input" style={{margin:"5% auto",width:"45%",border:"1px solid blue",boxShadow:"15px 18px 15px 8px black;"}}>
                <div className="about-head">
                    <h1>{userData.name}</h1>
                    <p>{userData.jobprofile}</p>
                </div>
                <table>
                    <tr>
                        <th>Profile</th>
                       
                    </tr>

                    <tr>
                        <td>City</td>
                        <td>{userData.city}</td>
                    </tr>
                    <tr>
                        <td>Mobile_Number</td>
                        <td>{userData.mobile}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>qualification</td>
                        <td>{userData.qualification}</td>
                    </tr>

                    <tr>
                        <td>Gender</td>
                        <td>{userData.gender}</td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>{userData._id}</td>
                    </tr>
                    <tr>
                        <th>Skill_Set</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>Languages</td>
                        <td>{userData.Languages}</td>
                    </tr>
                    <tr>
                        <td>Frameworks</td>
                        <td>{userData.Frameworks}</td>
                    </tr>
                    <tr>
                        <td>Databases</td>
                        <td>{userData.Databases}</td>
                    </tr>
                    <tr>
                        <td>Project</td>
                        <td><a href="">{userData.projectLinks}</a></td>
                    </tr>
                </table>
            </div>
            
        </>
    )
}
export default About;