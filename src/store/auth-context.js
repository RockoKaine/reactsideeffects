import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext({
    isLoggedIn : false,
// we add onnlogout here witha dummy function so that this way our autocompletion with visual code 
// studio will recognize it as a method that can be accessed through
    onLogout: ()=>{}, 
    onLogin : (email, password)=>{}


});

export const AuthContextProvider = (props)=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // the useEffect will only run if the dependancies change which sonce this one doesnt have any it
// only run at the beginning when the  app starts
  useEffect(()=>{

    const loggedInData = localStorage.getItem('isLoggedIn');

    if(loggedInData === "1"){
  
      setIsLoggedIn(true);
    }
  

  }, [])



    const logoutHandler = () =>{
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }

    const loginHandler = ()=>{
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}} >{props.children}</AuthContext.Provider>
}

export default AuthContext;