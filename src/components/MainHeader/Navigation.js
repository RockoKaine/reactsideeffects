import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = () => {
  // return (
    // <AuthContext.Consumer>
      /* 
      
      consumer takes a child which should be a funntion and the argument is the context data
      which is the object from auth-context

      there can be an error because we are using authcontext.provider becuase we have a default 
      value for isloggedin from auth context while using a provider. and the default value is 
      only connsumed if we dont have a provider. provider isnt technically needed if you have a 
      default value. but we do it this way because we have a value that can change. this way can be 
      ugly though  

      */
/* {(ctx) =>{
  return (
    <nav className={classes.nav}>
    <ul>
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Users</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Admin</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <button onClick={props.onLogout}>Logout</button>
        </li>
      )}
    </ul>
  </nav>
  )
}} */
   
  // </AuthContext.Consumer>



  const ctx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
    <ul>
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Users</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Admin</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <button onClick={ctx.onLogout}>Logout</button>
        </li>
      )}
    </ul>
  </nav>
  );
};

export default Navigation;
