import * as actionTypes from '../types';

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from '@firebase/firestore';

import { db } from '../../utils/firebase';

const registerSuccess = (user) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: user
});

const handleNew = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const payload = { displayName: user.displayName, email: user.email, uid: user.uid };
    await setDoc(docRef, payload);
}

export const registerInitiate = (userData, history) => (dispatch) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: userData.displayName,
                }).then(() => {
                    handleNew(user);
                    dispatch(registerSuccess(user));
                    history.push('/home');
                }).catch((error) => {
                    alert(error);
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    } catch (err) {
    }
}

export const loginSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user
});


export const loginInitiate = (email, password, history) => (dispatch) => {
    try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(loginSuccess(user));
                history.push('/home')
                //   history.push('/classroom');
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });

    } catch (err) {
    }
}

export const setUser = (user) => async (dispatch) => {
    try {
        await dispatch({ type: actionTypes.SET_USER, payload: user });
    } catch (err) {
    }
}

const logoutSuccess = (user, history) => {
    history.push('/');
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        // payload: user
    };
}

export const logoutInitiate = (user, history) => async (dispatch) => {
    sessionStorage.clear();
    try {
        const auth = getAuth();
        auth.signOut().then(() => {

            dispatch(logoutSuccess(user, history));
        }).catch((error) => {
            // An error happened.
        });
    } catch (err) {
    }
}


