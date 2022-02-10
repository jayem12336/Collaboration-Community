import React, { useState,useEffect } from 'react';

import {
    Box,
    Button,
    Grid,
    TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { auth, db } from '../../utils/firebase';
import { doc, onSnapshot, collection, addDoc, updateDoc, orderBy, query, getDoc } from '@firebase/firestore';



import { useSelector } from "react-redux";

const style = {
    formContainer: {
        flexDirection: "column",
    },
    textfieldStyle: {
        border: 'none',
        marginTop: 2,
        width: 300
    },
    inputText: {
        fontWeight: 'bold'
    },
    btnStyle: {
        fontWeight: "bold"
    }
}

export default function PostDialog({ isPostOpen, toggleClass }) {

    
    const [values, setValues] = useState({
        title:"",
        desc:""
    });

    const { user } = useSelector((state) => state);

    const [userAuth, setUserAuth] = useState("");

    // const queryTimeStamp = query(colRef, orderBy("timestamp", "desc"));

    // useEffect(() => {
    //     onSnapshot(queryTimeStamp, (snapshot) => {
    //         setTitle(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //         setDesc(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     }
    //     )

    // }, [])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])


    const createpost = async() => {
        if (values.title === "" || values.desc === "") {
            alert("please fill up the following fields")
        }
        else {
            await addDoc(collection(db, "post"), {
                title: values.title,
                desc: values.desc,
                user: userAuth.displayName,
                timestamp: new Date(),

            });
            toggleClass();
        }
    }

    return (
        <div>
            <Dialog
                open={isPostOpen}
                onClose={toggleClass}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Create Post"}
                </DialogTitle>
                <DialogContent>
                    <Box component={Grid} container justifyContent="center" sx={style.formContainer}>
                        <TextField
                            variant="outlined"
                            placeholder="Title of Author"
                            sx={style.textfieldStyle}
                            fullWidth
                            onChange={handleChange("title")}
                            value={values.title}
                            InputProps={{
                                sx: style.inputText
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Description"
                            sx={style.textfieldStyle}
                            fullWidth
                            multiline
                            minRows={5}
                            onChange={handleChange("desc")}
                            value={values.desc}
                            InputProps={{
                                sx: style.inputText
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={toggleClass} sx={style.btnStyle}>
                        Cancel
                    </Button>
                    <Button onClick={createpost} autoFocus sx={style.btnStyle}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}