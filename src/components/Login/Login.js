import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action)=>{

  if(action.type === 'USER_INPUT'){

    return {value: action.val, isValid: action.val.includes('@')}

  }

  if(action.type === 'INPUT_BLUR'){
     return {value: state.value, isValid: state.value.includes('@')}
  }

  return {value:'', isValid: false}
}


const passwordReducer = (state, action)=>{
  if(action.type === 'USER_INPUT'){

    return {value: action.val, isValid: action.val.trim().length > 6}

  }

  if(action.type === 'INPUT_BLUR'){
     return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {value:'', isValid: false}

  
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value:'', 
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value:'',
    isValid: null
  })


  const authCtx = useContext(AuthContext)

  // here we are destructering and giving isValid an alias to be used elsewhere.

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;




  //here useeffect will run now everytime the dependancies enteredEmail and enteredPassword 
  //are changed we could all setFormIsValid as well but with the useState react gaurantees 
  //that they will never change

  useEffect(()=>{
// we are making it so that we only check for validity after 500ms of not typing
// and then we return clearTimeOut to reset the timer.

    const identifier = setTimeout(()=>{
      console.log('Chekcing Validity')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
  
    }, 500);

    return ()=>{
      console.log('Clean Up');
      clearTimeout(identifier);
    };
    


  }, [emailIsValid, passwordIsValid])



  const emailChangeHandler = (event) => {
    
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );

  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );

  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
