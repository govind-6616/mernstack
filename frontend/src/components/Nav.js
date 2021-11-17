import React, { useContext } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Nav = () => {
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <Link to="/"><a href="">Home</a></Link>
                    <Link to="/Contact"><a href="">Contact</a></Link>
                    <Link to="/About"><a href="">About</a></Link>
                    <Link to="/Logout"><a href="">Logout</a></Link>
                </>
            )
        }
        else {
            return (
                <>

                    <Link to="/"><a href="">Home</a></Link>
                    <Link to="/Contact"><a href="">Contact</a></Link>
                    <Link to="/About"><a href="">About</a></Link>
                    <Link to="/Login"><a href="">Login</a></Link>
                    <Link to="/Signup"><a href="">Signup</a></Link>
                </>
            )
        }

    }
    return (
        <>
            <div className='nav'>
                <RenderMenu />
            </div>
        </>
    )
}
export default Nav;