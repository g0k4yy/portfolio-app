import React from 'react'
import { Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";


function NavbarComponent() {
    let { loggedIn, user ,logout } = useAuth();
    return (
        <div>
            <Navbar bg="dark">
                <Link to="/main">
                    <Button variant="light">Portfolio App</Button>
                </Link>
                
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {!loggedIn && (
                            <>
                                <Link to="/signup">
                                    <Button variant="light">Register</Button>
                                </Link>
                            </>
                        )}
                        {loggedIn && (
                            <>
                            <Link to="/signin"><Button variant="light" onClick={ logout } style={{justifyContent:"center"}} >Logout</Button></Link>
                            <Navbar.Text style={{paddingLeft:"15px"}}> Signed in as:  <a href="#login" style={{paddingRight:"5px" , paddingLeft:"5px"}}>
                                {user.email}{(localStorage.getItem("activeuser"))}</a></Navbar.Text>
                            </>
                        )}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
export default NavbarComponent
