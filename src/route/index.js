import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Profile from '../pages/profile/Profile';

import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';

import { setUser } from '../redux/actions/userAction';
import { useSelector, useDispatch } from "react-redux";

import PublicRoute from './publicroute';
import PrivateRoute from './privateroute';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import notFound from '../pages/notFound';
import ForgotPassword from '../pages/fogot/Forgot';

import theme from '../utils/theme';
import { createTheme, ThemeProvider, Box } from '@mui/material';

export default function RouterComponent(props) {

    const dispatch = useDispatch();
    const THEME = createTheme(theme);
    const { user } = useSelector((state) => state);

    const [values, setValues] = useState({
        isAuthenticated: false,
        isLoading: true,
    })

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
                setValues({ isAuthenticated: true, isLoading: false });
            } else {
                dispatch(setUser(null));
                setValues({ isAuthenticated: false, isLoading: false });
            }
        })
    }, [dispatch])

    if (values.isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                // flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: "#4BAEA6",
                        animationDuration: '550ms',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={200}
                    thickness={4}
                    {...props}
                />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/login' />
                    </Route>
                    <PublicRoute
                        component={Login}
                        path="/login"
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                    />
                    <PublicRoute
                        component={Register}
                        path="/register"
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                    />
                    <PublicRoute
                        component={ForgotPassword}
                        path="/forgot"
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                    />
                    <PrivateRoute
                        component={Home}
                        path="/home"
                        isAuthenticated={values.isAuthenticated}
                    />
                    <PrivateRoute
                        component={Profile}
                        path="/profile"
                        isAuthenticated={values.isAuthenticated}
                    />
                    <Route component={notFound} path='/' />
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
