import React from 'react';

const Login = (props) => {
  return (
    <button onClick={props.handleLogin} className='button'>Log In With Lyft</button>
  );
}

export default Login;
