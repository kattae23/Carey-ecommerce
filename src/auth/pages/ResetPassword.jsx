import { useForm } from "react-hook-form"
import { Link as LinkRouter } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { onLogin, onLogout, onUpdateUser } from "../../store/auth/authSlice"
import { useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { LockOpen } from "@mui/icons-material";
import { ecommerceApi } from "../../api";
import { useParams } from "react-router-dom";
import { Footer, Navbar } from "../../ui/components";
import { useSelector } from "react-redux";


const validationSchema = yup.object({
  password: yup.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must be match.')
})

export const ResetPassword = () => {

  const { id, token } = useParams()

  const { register, formState: { errors }, watch, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()

  const onSubmit = async (renewData) => {
    const { password } = renewData;
    const { data } = await ecommerceApi.put(`/users/${user.uid}`, { password })
    if (data) {
      navigate(`/home`, {
        replace: true
      })
    }
  }


  useEffect(() => {
    const confirmUser = async () => {
      const { data } = await ecommerceApi.get(`/reset/reset-password/${id}/${token}`)
      dispatch(onLogin({
        ...data.user
      }))
    }
    confirmUser()
  }, []);

  const theme = createTheme();

  const [watchPassword, setWatchPassword] = useState(false);

  const handleWatchPasssword = () => {
    setWatchPassword(!watchPassword)
  }

  return (
    <>
      <Navbar />
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
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <TextField
                type={'password'}
                margin="normal"
                {...register('password', { required: true })}
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
              />
              <TextField
                type={'password'}
                margin="normal"
                {...register('confirmPassword', { required: true })}
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoFocus
              />
              {
                (errors.password) &&
                <p className="text-left text-sm text-red-700 mb-4 mt-2">{errors.password?.message}</p> || (errors.confirmPassword) &&
                <p className="text-left text-sm text-red-700 mb-4 mt-2">{errors.confirmPassword?.message}</p>
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  )
}
