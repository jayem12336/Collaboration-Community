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

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


  const [openError, setOpenError] = React.useState(false);

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const handleClick = () => {
    setOpenError(true);
    setOpenSuccess(true);
  };



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
      setValues({ ...values, errors: "Please Fill up the following fields", isLoading: false })
      setOpenError(true);
    }
    else if (values.password !== values.cpass) {
      setValues({ ...values, errors: "password does not match", isLoading: false })
      setOpenError(true);
    }
    else {
      const data = {
        displayName: values.fullName,
        email: values.email,
        password: values.password
      }
      setOpenSuccess(true);
      dispatch(registerInitiate(data, history));
    }
  }

  return (
    <Box sx={style.root}>
      <Helmet>
        <title>Register</title>
        <link rel="Collaboration Icon" href={logohelmet} />
      </Helmet>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {values.errors}
          </Alert>
        </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Register Successfully
          </Alert>
        </Snackbar>
      </Stack>

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
          onKeyDown={(e) => e.key === 'Enter' && signup(e)}
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
          onKeyDown={(e) => e.key === 'Enter' && signup(e)}
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
            onKeyDown={(e) => e.key === 'Enter' && signup(e)}
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
            onKeyDown={(e) => e.key === 'Enter' && signup(e)}
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
