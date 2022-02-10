import React, { useState } from 'react';

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

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../assets/img/png/ColabLogo.png';

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
        // boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
    },
    textFieldStyle: {
        marginBottom: 2,
        height: 50
    },
    textUserNameField: {
        marginBottom: 2,
    },
    btnStyle: {
        height: 40,
        fontSize: 20,
        textTransform: 'none',
        backgroundColor: '#2791d9',
        marginTop: '.5'
    },
    textUserField: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: .5,
    },
    labelStyle: {
        color: 'black'
    },
    InputStyle: {
        height: 18
    },
    linkStyle: {
        marginLeft: 1,
        fontWeight: 'bold'
    }
}

export default function Login() {

    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
        errors: "",
        isLoading: false,

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

    const login = () => {
        if (!values.email || !values.password) {
            alert("please fill up the following fields")
        }
        else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    history.push('/home')
                    //   history.push('/classroom');
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setValues({ ...values, errors: errorMessage, isLoading: false, password: "" })
                    alert(errorMessage)
                });
        }
    }

    return (
        <Box sx={style.root}>
            <Box component={Grid} container sx={style.loginContainer}>
                {/* <Box component={Grid} container justifyContent="center">
                    <Typography sx={{ fontSize: { xs: 30, md: 40 }, }}>Welcome Back!</Typography>
                </Box> */}
                <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Box
                        component="img"
                        src={Logo}
                        alt="logo"
                        sx={{ width: 150, height: 100 }}
                    />
                </Box>
                <Typography sx={style.textUserField}>Email</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    sx={style.textUserNameField}
                    inputProps={{
                        sx: style.InputStyle
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && login(e)}
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={values.email}
                />
                <Typography sx={style.textUserField}>Password</Typography>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        sx={style.textFieldStyle}
                        onKeyDown={(e) => e.key === 'Enter' && login(e)}
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
                        placeholder="Password"
                    />
                </FormControl>
                <Grid container justifyContent="flex-end">
                    <Typography sx={{ fontSize: 14, color: "blue", marginBottom: 1, marginTop: 1 }}>
                        Forgot Password?
                    </Typography>
                </Grid>
                <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
                    <Typography sx={{ fontSize: 14 }}>
                        Don't Have an account?
                        <Link style={style.linkStyle} to="/register">
                            Sign up
                        </Link>
                        {/* <Button
                            variant="text"
                            sx={{ fontSize: 14, fontWeight: 'bold', textTransform: 'none' }}
                            onClick={() => history.push('/register')}
                        >
                        </Button> */}
                    </Typography>
                </Grid>
                <Grid container justifyContent="center">
                    <Button variant="contained" sx={style.btnStyle} fullWidth onClick={login}>
                        Sign in
                    </Button>
                </Grid>
                <Grid container justifyContent="center">
                    <Typography sx={{ fontSize: 14, marginBottom: 1, marginTop: 1, fontWeight: '500' }}>
                        -------- or continue with --------
                    </Typography>
                </Grid>
            </Box>
        </Box>
    )
}
