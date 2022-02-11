import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/Navbar';

import { updateProfile } from "firebase/auth";
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Avatar
} from '@mui/material';
import { auth } from '../../utils/firebase';
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
        padding: 4,
        marginBottom: { xs: 8},
    },
    ProfileContainer: {
        marginTop: { xs: 18, md: 10 },
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
    const [disableTextField, setDisableTextField] = useState(true)
    const [userAuth, setUserAuth] = useState("");

    const [values, setValues] = useState({
        email: "",
        displayName: ""
    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value })
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
            setValues({ ...values, email: authUser.email, displayName: authUser.displayName })
        })
    }, [])

    const logout = () => {
        dispatch(logoutInitiate(history));
    }

    const updateProfileBtn = () => {
        if (values.email === "" || values.displayName === "") {
            alert("Please fill up the following fields")
        }
        else {
            updateProfile(userAuth, {
                displayName: values.displayName,
                email: values.email,
            }).then(() => {
                alert("Successfully updated profile");
                window.location.reload(false)
            }).catch((error) => {
                alert(error);
            });
        }
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
                        value={values.email}
                        onChange={handleChange("email")}
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
                        value={values.displayName}
                        onChange={handleChange("displayName")}
                        sx={style.textUserNameField}
                        inputProps={{
                            sx: style.InputStyle
                        }}
                        disabled={disableTextField}
                    />
                    <Grid container justifyContent="center">
                        <Button variant="contained" sx={style.btnStyle} fullWidth onClick={() => setDisableTextField(false)}>
                            Edit Profile
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                        <Button variant="contained" sx={style.btnStyle} fullWidth onClick={updateProfileBtn}>
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
