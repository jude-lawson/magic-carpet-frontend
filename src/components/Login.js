import React from 'react';

const Login = (props) => {
  return (
    <div className='container'>
      <h1>Magic Carpet</h1>
      <button onClick={props.handleLogin} className='button'>Log In With Lyft</button>
    </div>
  );
}

export default Login;
