import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/Navbar';
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Avatar
} from '@mui/material';
import { auth, db } from '../../utils/firebase';
import { logoutInitiate } from '../../redux/actions/userAction';
import { useDispatch } from "react-redux";

import { useHistory } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import logohelmet from '../../assets/img/png/logoHelmet.png';

const style =
{
    root: {
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100vh",
        padding: 4
    },
    ProfileContainer: {
        marginTop: 10,
        display: "flex",
        padding: 2,
        maxWidth: 380,
        cursor: 'pointer',
        boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
    },
    textUserNameField: {
        marginBottom: 2,
    },
    InputStyle: {
        height: 18,
        fontWeight: "bold"
    },
    avatarStyle: {
        height: 100,
        width: 100
    }
}
export default function Profile() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [userAuth, setUserAuth] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    const logout = () => {
        dispatch(logoutInitiate(history));
    }

    return (
        <Box>
            <NavBar />
            <Helmet>
                <title>Profile</title>
                <link rel="Collaboration Icon" href={logohelmet} />
            </Helmet>
            <Box sx={style.root}>
                <Box component={Grid} container sx={style.ProfileContainer}>
                    <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Avatar src="" sx={style.avatarStyle} />
                    </Box>
                    <Typography sx={style.textUserField}>Email</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={userAuth.email}
                        sx={style.textUserNameField}
                        inputProps={{
                            sx: style.InputStyle
                        }}
                        disabled={true}
                    />
                    <Typography sx={style.textUserField}>Name</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={userAuth.displayName}
                        sx={style.textUserNameField}
                        inputProps={{
                            sx: style.InputStyle
                        }}
                        disabled={true}
                    />

                    <Grid container justifyContent="center">
                        <Button variant="contained" sx={style.btnStyle} fullWidth >
                            Save Profile
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                        <Button variant="contained" sx={style.btnStyle} fullWidth onClick={logout}>
                            Logout
                        </Button>
                    </Grid>

                </Box>
            </Box>
        </Box>
    )
}
