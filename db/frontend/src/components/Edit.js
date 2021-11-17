import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import img from "../images/images.jpeg";
import "./nav.css";
const Edit = () => {
    const history = useHistory();
    const [nam, setNam] = useState({
        _id: "", city: "", mobile: "", qualification: ""
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

    const callEdit = async () => {
        const {_id,city,mobile,qualification}=nam;
        try {
            const res = await fetch('/update/:_id', {
                method: "PATCH",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                // credentials: "include",
                body: JSON.stringify({
                    _id, city, mobile, qualification
                })

            });
            const data = await res.json();
            setNam(data);
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;

            }

        }
        catch (err) {
            // history.push('/Login');
            console.log(err);

        }
    }
    useEffect(() => {
        callEdit();

    }, []);
    return (
        <>
            <div className="container">
                <div className="main">
                    <div className="info"><p id="para"> Fill the form properly</p></div>
                    <form method="post" className="form">

                        <img src={img} style={{ float: "right", margin: "20% 5% 0% 0%" }} alt="image" />
                        <input type="text" placeholder="Enter Id"
                            onChange={inputEvent} name="_id" value={nam._id} />

                        <input type="text" placeholder="Enter City"
                            onChange={inputEvent} name="city" value={nam.city} />

                        <input type="text" placeholder="Enter Phone Number "
                            onChange={inputEvent} name="mobile" value={nam.mobile} />

                        <input type="text" placeholder="Enter Qualification"
                            onChange={inputEvent} name="qualification" value={nam.qualification} />
                        <button type="submit"
                            className="btn" name="signup" value="register"
                            onClick={callEdit}>Edit</button>

                    </form>
                </div>
            </div>
        </>
    );
};
export default Edit;