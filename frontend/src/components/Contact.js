import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import img from "../images/images (1).jpeg";
import "./nav.css";

const Contact = () => {
    const [userData, setUserData] = useState({});
    const history = useHistory();
    const callContact = async () => {
        try {
            const res = await fetch('/contactData', {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            // history.push('/login');
            console.log(err);
        }
    }

    useEffect(() => {
        callContact();
    }, []);

    return (
        <>
            <div className="contact-container" style={{ backGround: "whitesmoke;" }}>
                <div className="contact-item">
                    <div className="item"><h3>Reach Us</h3>
                        <p>C-15 Ram Nagar Jaipur</p>
                    </div>
                    <div className="item"><h3>Phone Number</h3>
                        <p>8890801145</p>
                    </div>
                    <div className="item"><h3>E-Mail Us</h3>
                        <p>info@merndeveloper.com</p>
                    </div>
                </div>
                <div className="contact-item2">
                    <div className="d1">
                        <div className="main">
                            <div className="info"></div>
                            <form method="post" className="form">
                                <img src={img} style={{ float: "right", margin: "-7% 0% 0% 0%" }} alt="image" />
                                <input type="email" placeholder="Your E-mail"
                                    name="username" value={userData.email} />

                                <input type="email" placeholder="Receiver's E-mail"
                                    name="username" />

                                <input type="text" placeholder="Your Name"
                                    name="username" value={userData.name} />
                                <textarea style={{ width: "90%", height: "150px", padding: "18px", outline: 'none', fontSize: "20px" }} placeholder="Enter Message" />


                                <button type="submit" name="login" value="Login" className="btn">Send Message</button>

                            </form>
                        </div>
                    </div>
                    <div className="d2">
                        <div className="map"><iframe className="map-value" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29515.405804133916!2d75.8071
                        1328149532!3d26.884199999620495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6a7
                        2196d157%3A0x4dc28e5450b9dbde!2sCentral%20Park!5e0!3m2!1sen!2sin!4v1629009247617!5m2!1sen!2sin"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact;