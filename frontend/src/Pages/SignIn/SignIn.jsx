// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './../../Context/AuthProvider';
import alert from 'sweetalert2';
import { signIn } from '../../services/GuestService';
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        CourseIndoors
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  console.log(Cookies.get());
  // const { auth, updateAuth } = useContext(AuthContext);
  const [usernameValid, setUsernameValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const onChange = (event) => {
    const newData = data;
    newData[event.target.name] = event.target.value;
    setData(newData);
    console.log(data);
  };

  const handleSubmit = async () => {
    const { username, password } = data;

    //username
    if (username.length === 0) {
      setUsernameValid('please enter your username');
    } else {
      setUsernameValid('');
    }

    //password
    if (password.length === 0) {
      setPasswordValid('please enter your password');
    } else {
      setPasswordValid('');
    }

    if (
      !usernameValid &&
      username.length > 0 &&
      !passwordValid &&
      password.length > 0
    ) {
      const response = await signIn({ username, password });
      // updateAuth(response.data._id, response.data.type);
      sessionStorage['id'] = response.data._id;
      sessionStorage['type'] = response.data.type;
      Cookies.set('type', response.data.type);
      window.location.href = '/' + response.data.type;
    }
  };

  // useEffect(() => {
  //   console.log(auth);
  //   if (auth.type) {
  //     // window.location.href = '/' + auth.type;
  //   }
  // }, [auth]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#6aa5ff' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={onChange}
                  error={!!usernameValid}
                  helperText={usernameValid}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChange}
                  error={!!passwordValid}
                  helperText={passwordValid}
                />
              </Grid>

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2, bgcolor: '#6aa5ff' }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Dont't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
