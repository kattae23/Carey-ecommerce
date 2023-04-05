import { useForm } from "react-hook-form"
import { Link as LinkRouter } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { clearErrorMessage, onChecking, onLogin, onLogout, onUpdateUser, onUpdateUserImg } from "../../store/auth/authSlice"
import { useDispatch } from "react-redux";
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
import { useState } from "react";
import { LockOpen } from "@mui/icons-material";
import { ecommerceApi } from "../../api";
import { Spinner } from "../../ecommerce/components/Spinner";
import { VITE_API_URL } from "../../api/ecommerceApi";


const validationSchema = yup.object({
  email: yup.string().required('The email is required').email('The email is not a valid format'),
  password: yup.string().min(8, 'Password must be at least 8 characters'),
})

export const RenewPassword = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const { register, formState: { errors }, watch, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (renewData) => {
    setIsLoading(true)
    const { data } = await ecommerceApi.post('/users/renew-password', renewData)
    setMessage(data)
    setIsLoading(false)
  }


  useEffect(() => {

    if (errorMessage !== undefined) {
      Swal.fire("Error in the authentication", errorMessage, 'error')
    }


  }, [errorMessage]);

  function handleCallbackResponse(response) {

    const body = { id_token: response.credential };

    fetch(`${VITE_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(resp => {
        // localStorage.setItem('email', resp.user.email)
        // location.reload();
        localStorage.setItem('token', resp.token)
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin({
          ...resp.user
        }))
      })
      .catch(console.warn);


  }

  useEffect(() => {

    window.google.accounts.id.initialize({
      client_id: "689910093377-ipl20p1siju3jbu8psf7hp6rkeq65n7c.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    })

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline', size: 'large'
      }
    )

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // try next provider if OneTap is not displayed or skipped
      }
    });

  }, []);

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

  const theme = createTheme();

  const [watchPassword, setWatchPassword] = useState(false);

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
              <LockOpen />
            </Avatar>
            <Typography component="h1" variant="h5">
              Send Email to Verify
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                {...register('email', { required: true })}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {
                  isLoading ? <Spinner /> : "Send Email"
                }
              </Button>
              
              <Grid container>
                <div>
                  {
                    (errors.email) &&
                    <p className="text-left text-red-700  mt-2">{errors.email?.message}</p>
                  }
                </div>
              </Grid>
              <div className="w-full flex justify-center mb-4">
                {
                  message !== null ? <>
                    <p className={`font-semibold text-gray-700 py-2 px-7 rounded-sm w-full text-center text-white ${message !== null && message?.msg === 'email sent...' ? 'bg-green-400' : ' bg-red-400'}`}>
                      {message?.msg}
                    </p>
                  </> : null

                }
              </div>
              <div
                id="g_id_onload"
                data-client_id="689910093377-ipl20p1siju3jbu8psf7hp6rkeq65n7c.apps.googleusercontent.com"
                data-callback="handleCredentialResponse"
                data-cancel_on_tap_outside="true"
              >
              </div>
              <div className="w-full flex justify-center items-center mb-5 mt-2">
                <div id="signInDiv">

                </div>
              </div>
              <Grid container>
                <Grid item>
                  <Link component={LinkRouter} variant="body2" to={'/auth/register'}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}
