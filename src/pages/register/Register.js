import React, { useState } from 'react'

import {
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { registerInitiate } from '../../redux/actions/userAction';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Helmet } from 'react-helmet';
import logohelmet from '../../assets/img/png/logoHelmet.png';

const style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100vh",
    padding: 4
  },
  loginContainer: {
    display: "flex",
    padding: 2,
    maxWidth: 380,
    cursor: 'pointer',
  },
  textFieldStyle: {
    marginBottom: 2,
  },
  btnStyle: {
    height: 40,
    fontSize: 20,
    textTransform: 'none',
    backgroundColor: '#2791d9',
    marginTop: '.5'
  },
  customizetextFieldHeight: {
    height: 45
  },
  passwordFieldStyle: {
    height: 12
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: .5,
  },
  linkStyle: {
    marginLeft: 1,
    fontWeight: 'bold'
  }
}

export default function Register() {

  const history = useHistory();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    cpass: "",
    showPassword: false,
    errors: "",
    isLoading: false,
    fullName: ""
  })

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value })
  }

  const handleClickShowPassword = (e) => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const signup = () => {
    if (!values.email || !values.password || !values.cpass || !values.fullName) {
      alert("please fill up the following fields")
    }
    else if(values.password !== values.cpass) {
      alert("password does not match")
    }
    else {
      const data = {
        displayName: values.fullName,
        email: values.email,
        password: values.password
      }
      dispatch(registerInitiate(data, history));
    }
  }

  return (
    <Box sx={style.root}>
      <Helmet>
        <title>Register</title>
        <link rel="Collaboration Icon" href={logohelmet} />
      </Helmet>
      <Box component={Grid} container sx={style.loginContainer}>
        <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
          <Typography sx={{ fontSize: { xs: 30, md: 40 } }}>Create Account</Typography>
        </Grid>
        <Typography sx={style.textStyle}>Fullname</Typography>
        <TextField
          variant="outlined"
          fullWidth sx={style.textFieldStyle}
          InputProps={{
            sx: style.customizetextFieldHeight
          }}
          onChange={handleChange("fullName")}
          value={values.fullName}
        />
        <Typography sx={style.textStyle}>Email</Typography>
        <TextField
          variant="outlined"
          fullWidth
          sx={style.textFieldStyle}
          InputProps={{
            sx: style.customizetextFieldHeight
          }}
          value={values.email}
          onChange={handleChange("email")}
        />
        <Typography sx={style.textStyle}>Password</Typography>
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            sx={style.textFieldStyle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              sx: style.passwordFieldStyle
            }}
          />
        </FormControl>
        <Typography sx={style.textStyle}>Confirm Password</Typography>
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            value={values.cpass}
            onChange={handleChange('cpass')}
            sx={style.textFieldStyle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              sx: style.passwordFieldStyle
            }}
          />
        </FormControl>

        <Grid container justifyContent="center">
          <Button variant="contained" sx={style.btnStyle} fullWidth onClick={signup}>
            Sign up
          </Button>
        </Grid>
        <Grid container justifyContent="center">
          <Typography sx={{ fontSize: 14, textAlign: "center", marginTop: 2 }}>
            Already have an account?
            <Link style={style.linkStyle} to="/">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Box>
    </Box>
  )
}
