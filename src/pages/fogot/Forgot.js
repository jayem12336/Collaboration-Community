import React, { useState } from 'react';

import {
    Typography,
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useHistory } from 'react-router-dom';
import Logo from '../../assets/img/png/ColabLogo.png';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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
        fontSize: 18,
        textTransform: 'none',
        backgroundColor: '#2791d9',
        marginTop: 2
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ForgotPassword() {


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

    const history = useHistory();

    const [values, setValues] = useState({
        email: "",

    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value })
    }

    const resetPassword = () => {
        if (values.email === "") {
            setOpenError(true);
        } else {
            const auth = getAuth();
            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    setOpenSuccess(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }

    }

    return (
        <Box sx={style.root}>
            <Helmet>
                <title>Forgot Password</title>
                <link rel="Collaboration Icon" href={logohelmet} />
            </Helmet>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        Please Fill up the following fields
                    </Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                    <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                        Password Recovery send
                    </Alert>
                </Snackbar>
            </Stack>
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
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={values.email}
                />
                <Grid container justifyContent="center">
                    <Button variant="contained" sx={style.btnStyle} fullWidth onClick={resetPassword}>
                        Send Recovery Password
                    </Button>
                </Grid>
                <Grid container justifyContent="center">
                    <Button variant="contained" sx={style.btnStyle} fullWidth onClick={() => history.push('/login')}>
                        Back to Login
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}
