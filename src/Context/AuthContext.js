import React from 'react'
import { createContext , useState , useContext  } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
const [user, setUser] = useState({});
const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));

    const register = (values) => {
		setLoggedIn(true);
        JSON.stringify(localStorage.setItem("loggedIn",true))
        let user = {'email' : values.email , 'password': values.password , "loggedIn" : true}
        setUser(user);
        localStorage.setItem(values.email , JSON.stringify(user));
        localStorage.setItem("activeuser" , values.email);


	};
    const login = (values) => {
         console.log(values);
         let user = JSON.parse(localStorage.getItem(values.email))
         setUser(user);
         if (values.email == user.email && values.password == user.password) {
             setLoggedIn(true);
             JSON.stringify(localStorage.setItem("loggedIn",true))
             localStorage.setItem("activeuser" , values.email); 

         }

    }
    const logout = () => {
        setLoggedIn(false);
        setUser({});
        JSON.stringify(localStorage.setItem("loggedIn",false))
        localStorage.setItem("activeuser" , "");
    }
    const values = {
		loggedIn,
		user,
		register,
		logout,
        login
	};
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
 };

 const useAuth = () => useContext(AuthContext);

 export { AuthProvider, useAuth };