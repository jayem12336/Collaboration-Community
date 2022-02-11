import React, { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { auth, db, storage } from '../../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from '@firebase/firestore';

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

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("")

    const [values, setValues] = useState({
        title: "",
        desc: ""
    });

    const [userAuth, setUserAuth] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const storagaRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storagaRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setUrl(downloadURL)
                });
            }
        );
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    const createpost = async () => {
        if (values.title === "" || values.desc === "") {
            alert("please fill up the following fields")
        }
        else {
            await addDoc(collection(db, "post"), {
                title: values.title,
                desc: values.desc,
                user: userAuth.displayName,
                timestamp: new Date(),
                image: url
            });
            setValues({ ...values, title: '', desc: '' })
            setImage(null);
            toggleClass();
            setProgress(0)
            setUrl("")
        }
    }

    const closeModal = () => {
        setValues({ ...values, title: '', desc: '' });
        setImage(null);
        toggleClass();
        setProgress(0)
        setUrl("")
    }

    console.log(image)

    return (
        <div>
            <Dialog
                open={isPostOpen}
                onClose={closeModal}
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

                        <Box container justifyContent="center" sx={{marginTop: 2}}>
                            <Typography>Choose Image Here</Typography>
                            <form onSubmit={formHandler}>
                                <input type="file" className="input"/>
                                <button type="submit">Preview</button>
                            </form>
                            <hr />
                        </Box>
                        {
                            url === "" ? "" :
                                <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2 }}>
                                    <Box
                                        component="img"
                                        src={url}
                                        alt="logo"
                                        sx={{ width: 150, height: 100 }}
                                    />
                                </Box>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal} sx={style.btnStyle}>
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