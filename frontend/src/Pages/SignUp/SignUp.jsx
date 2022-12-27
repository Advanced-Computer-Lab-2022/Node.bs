// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { signUp } from '../../services/GuestService';
import alert from 'sweetalert2';
import Modal from 'react-modal';
import Loading from 'react-loading';

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

export default function SignUp() {
  const [firstNameValid, setFirstNameValid] = useState('');
  const [lastNameValid, setLastNameValid] = useState('');
  const [usernameValid, setUsernameValid] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [showTerms, setShowTerms] = useState(false);

  const onChange = (event) => {
    const newData = data;
    newData[event.target.name] = event.target.value;
    setData(newData);
    console.log(data);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { firstName, lastName, username, email, password, acceptTerms } =
      data;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //firstname
    if (firstName.length === 0) {
      setFirstNameValid('field cannot be blank');
    } else {
      setFirstNameValid('');
    }
    //lastname
    if (lastName.length === 0) {
      setLastNameValid('field cannot be blank');
    } else {
      setLastNameValid('');
    }
    //username
    if (username.length === 0) {
      setUsernameValid('field cannot be blank');
    } else {
      setUsernameValid('');
    }
    //email
    if (email.length === 0) {
      setEmailValid('field cannot be blank');
    } else if (!emailRegex.test(email)) {
      setEmailValid(
        'please enter a valid email, a valid format is in the form "abc@xyz.com"'
      );
    } else {
      setEmailValid('');
    }
    //password
    if (password.length === 0) {
      setPasswordValid('field cannot be blank');
    } else if (!passwordRegex.test(password)) {
      setPasswordValid(
        'password must contain the following : At least 8 characters, At least one lowercase letter, At least one uppercase letter, At least one digit, At least one special character (@, $, !, %, *, ?, &)'
      );
    } else {
      setPasswordValid('');
    }

    if (acceptTerms) {
      if (
        !firstNameValid &&
        firstName.length > 0 &&
        !lastNameValid &&
        lastName.length > 0 &&
        !usernameValid &&
        username.length > 0 &&
        !emailValid &&
        email.length > 0 &&
        !passwordValid &&
        password.length > 0
      ) {
        console.log(acceptTerms);
        try {
          const response = await signUp({
            email,
            password,
            username,
            firstName,
            lastName,
          });

          if (response.status === 400) {
            alert.fire(response.data.error, 'please try again!', 'warning');
          } else if (response.status === 201) {
            alert.fire(
              response.data.message,
              'You now have access to CourseIndoors',
              'success'
            );
            setTimeout(() => {
              window.location.href = '/signin';
            }, 1500);
          } else {
            alert.fire(response.data.error, 'please try again', 'error');
          }
        } catch (e) {
          alert.fire(e.response.data.error, 'please try again!', 'warning');
        }
      }
    } else {
      alert.fire('Please accept Terms and conditions', '', 'warning');
    }

    setLoading(false);
  };

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
        {loading && (
          <Box className="d-flex flex-column  justify-content-center align-items-center h-100">
            <h1>Signing you up!</h1>
            <Loading color="black" type="spin" />
          </Box>
        )}
        {!loading && (
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
              Sign up as a trainee
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={onChange}
                    error={!!firstNameValid}
                    helperText={firstNameValid}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={onChange}
                    error={!!lastNameValid}
                    helperText={lastNameValid}
                  />
                </Grid>
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onChange}
                    error={!!emailValid}
                    helperText={emailValid}
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="1"
                        name="acceptTerms"
                        onClick={(event) => {
                          setData({
                            ...data,
                            acceptTerms: event.target.checked,
                          });
                          console.log(data);
                        }}
                        color="primary"
                      />
                    }
                    label={
                      <>
                        I fully understand and accept the{' '}
                        <span
                          style={{
                            color: '#6aa5ff',
                            textDecoration: 'underline',
                          }}
                          onClick={() => setShowTerms(true)}
                        >
                          Terms and conditions
                        </span>
                      </>
                    }
                  />
                  <Modal
                    isOpen={showTerms}
                    onRequestClose={() => setShowTerms(false)}
                    style={{
                      content: {
                        width: '35vw',
                        height: '35vh',
                        margin: 'auto',
                        marginRight: '50vw',
                      },
                    }}
                  >
                    <h1>Terms and conditions</h1>
                    <ul>
                      <li>Website policy....</li>
                      <li>Payment policy....</li>
                      <li>Refund policy....</li>
                    </ul>
                  </Modal>
                </Grid>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 2, bgcolor: '#6aa5ff' }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
