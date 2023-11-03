import React, { useState } from 'react';
import Keycloak from 'keycloak-js';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

const Login = ({ authenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isLogged = () => {
    alert(username);
  };

  return (
    <Stack>
      <TextField onChange={(event) => setUsername(event.target.value)} />
      <TextField onChange={(event) => setPassword(event.target.value)} />
      <Button onClick={isLogged}>Login</Button>
    </Stack>
  );
};

export default Login;
