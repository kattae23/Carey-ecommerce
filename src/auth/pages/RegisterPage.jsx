import { useForm } from "react-hook-form"
import { Link as LinkRouter } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Carey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const validationSchema = yup.object({
  firstName: yup.string().required('The fisrt name is required'),
  lastName: yup.string().required('The last name is required'),
  email: yup.string().required('The email is required').email('The email is not a valid format'),
  password: yup.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must be match.')
})

export const RegisterPage = () => {


  const theme = createTheme();

  const { startRegister, errorMessage } = useAuthStore();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = ({ firstName, lastName, email, password }, e) => {
    e.preventDefault()
    startRegister({ firstName, lastName, email, password })
  }

  const [onSetWatchPassword, setOnSetWatchPassword] = useState(false);
  const [onSetWatchConfirmPassword, setOnSetWatchConfirmPassword] = useState(false);

  const onWatchPassword = (e) => {
    setOnSetWatchPassword(!onSetWatchPassword);
  }
  const onWatchConfirmPassword = (e) => {
    setOnSetWatchConfirmPassword(!onSetWatchConfirmPassword);
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error in the authentication", errorMessage, 'error')
    }
  }, [errorMessage]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    {...register('firstName', { required: true })}
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    {...register('lastName', { required: true })}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    {...register('email', { required: true })}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    {...register('password', { required: true })}
                    name="password"
                    label="Password"
                    type={`${onSetWatchPassword ? 'text' : 'password'}`}
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" onChange={onWatchPassword} color="primary" />}
                    label="Show password"
                  />
                </Grid>
              </Grid>
              {
                (errors.firstName) &&
                <p className="text-left text-red-700 mb-4 mt-5">{errors.firstName?.message}</p>
                ||
                (errors.lastName) &&
                <p className="text-left text-red-700 mb-4 mt-5">{errors.lastName?.message}</p>
                ||
                (errors.email) &&
                <p className="text-left text-red-700 mb-4 mt-5">{errors.email?.message}</p>
                ||
                (errors.password) &&
                <p className="text-left text-red-700 mb-4 mt-5">{errors.password?.message}</p>
                ||
                (errors.confirmPassword) &&
                <p className="text-left text-red-700 mb-4 mt-5">{errors.confirmPassword?.message}</p>
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={LinkRouter} to={'/auth/login'} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

