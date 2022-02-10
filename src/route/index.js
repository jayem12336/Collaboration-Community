import React, { useEffect } from 'react'
import Login from '../pages/login/Login'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from '../pages/register/Register';
import { auth } from '../utils/firebase';
import Home from '../pages/home/Home'

import { getAuth } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

import theme from '../utils/theme';

import { createTheme, ThemeProvider } from '@mui/material';
import { setUser } from '../redux/actions/userAction';

export default function RouterComponent() {

    const dispatch = useDispatch();
    const THEME = createTheme(theme);
    const { user } = useSelector((state) => state);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser));
            } else {
                dispatch(setUser(null));
            }
        })
    }, [dispatch])

    console.log(user);

    
    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Switch>
                    <Route component={Login} path="/" exact />
                    <Route component={Register} path="/register" exact />
                    <Route component={Home} path="/home" exact />
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
