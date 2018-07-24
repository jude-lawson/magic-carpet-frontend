import React from 'react';
import Button from '@material-ui/core/Button'

const LoginPage = (props) => {
  return (
    <Button onClick={props.handleLogin}
            variant='contained'>Log In With Lyft</Button>
  );
}

export default LoginPage;
