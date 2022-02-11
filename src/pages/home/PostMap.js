import React, { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Menu,
    MenuItem,
    Fade,
    IconButton
} from '@mui/material';

import { addDoc, collection, query, orderBy, onSnapshot, doc, deleteDoc } from '@firebase/firestore';

import { auth, db } from '../../utils/firebase';

import moment from 'moment';
import { BiShare } from 'react-icons/bi';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const style = {
    //helper
    homeContainer: {
        flexDirection: {
            md: 'row',
            sm: 'column',
            xs: 'column'
        },
        display: 'flex',
        padding: 2
    },
    //helper
    marginStyle: {
        marginTop: 1
    },
    cardStyle: {
        maxWidth: 345,
        height: 420,
        marginTop: 10,
    },
    imgStyle: {
        height: {
            xs: 200,
            sm: 300,
            md: 500,
        },
        width: {
            xs: 300,
            sm: 500,
            md: 700,
        },
    },
    postContainer: {
        display: "flex",
        padding: 2,
        maxWidth: 450,
        width: {
            sm: 400,
            md: 450,
        },
        boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
        borderRadius: 4
    },
    postimageStyle: {
        width: "100%",
        height: 300,
    },
    commentStyle: {
        flexDirection: 'row',
        display: 'flex',
        borderRadius: 2,
        width: '95%',
        marginTop: 4,
    },
    commentStyle2: {
        flexDirection: 'row',
        display: 'flex',
        borderRadius: 2,
        width: '100%',
        marginTop: 4,
        padding: 2,
        boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
    },
    shareStyle: {
        color: "#62666D",
        fontSize: 20
    },
    textComment: {
        color: "#62666D",
        marginTop: -.5,
        marginLeft: 2,
        fontSize: 17
    },
    submitBtn: {
        color: (theme) => theme.colors.textColor,
        "&:hover": {
            backgroundColor: '#26CE8D'
        }
    },
}

export default function PostMap({ postowner, timestamp, posttitle, postdesc, postimage, postid }) {

    const [showInput, setShowInput] = useState(false);

    const [userAuth, setUserAuth] = useState("");

    const [values, setValues] = useState({
        comment: '',
    });

    // const [totalDoclNumbers, setTotalDoclNumbers] = useState(0);

    const [commentList, setCommentList] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUserAuth(authUser)
        })
    }, [])

    const colRef = collection(db, "post", postid, 'comment');

    const queryTimeStamp = query(colRef, orderBy("timestamp", "desc"));

    useEffect(() => {
        onSnapshot(queryTimeStamp, (snapshot) => {
            setCommentList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            // setTotalDoclNumbers(snapshot.docs.length);
        }
        )
    }, [])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const userComment = async () => {
        await addDoc(collection(db, "post", postid, "comment"), {
            text: values.comment,
            name: userAuth.displayName,
            timestamp: new Date(),
        });
        setValues({ ...values, comment: "" });
    }

    const onDeletePost = async () => {
        if (userAuth.displayName !== postowner) {
            alert("can only delete your own post");
            handleClose();
        }
        else {
            await deleteDoc(doc(db, "post", postid));
            alert("Deleted Post");
            handleClose();
        }
    }

    return (
        <Box>
            <Box sx={style.homeContainer}>
                <Box sx={style.marginStyle}>
                    <Box component={Grid} container justifyContent="center" sx={style.postContainer}>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={onDeletePost}>Delete Post</MenuItem>
                        </Menu>
                        <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
                            <Grid item>
                                <Typography sx={{ fontWeight: "bold" }}>{postowner}</Typography>
                                <Typography >{moment(timestamp.toDate().toISOString()).fromNow()}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton sx={style.iconContainer} onClick={handleClick}>
                                    <MoreHorizIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" sx={{ flexDirection: "column" }}>
                            <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>{posttitle}</Typography>
                            <Typography sx={{ textAlign: "center" }}>{postdesc}</Typography>
                        </Grid>
                        {postimage === "" ? "" :
                            <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
                                <Box
                                    component="img"
                                    src={postimage}
                                    alt="logo"
                                    sx={style.postimageStyle}
                                />
                            </Box>
                        }
                        <Box component={Grid} container justifyContent="center">
                            <Button fullWidth sx={{ borderRadius: 2, border: "0.5px solid black" }} onClick={() => setShowInput(!showInput)}>
                                Add Comment
                            </Button>
                        </Box>
                        {!showInput ? "" :
                            <Box component={Grid} container sx={style.commentStyle}>
                                <BiShare style={style.shareStyle} />
                                <Typography sx={style.textComment}> Add your comment </Typography>
                                <Box component={Grid} container sx={{ marginTop: .5 }} spacing={2}>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-basic"
                                            fullWidth
                                            value={values.comment}
                                            onChange={handleChange('comment')}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Grid container justifyContent="center" sx={{ paddingTop: 1 }}>
                                            <Button variant="contained" disabled={!values.comment} sx={style.submitBtn} onClick={userComment}>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {
                                    commentList.map((comments) => (
                                        <Box component={Grid} container sx={style.commentStyle2}>

                                            <Grid container justifyContent="flex-start" sx={{ flexDirection: "column", marginBottom: 2 }}>
                                                <Typography>  <BiShare style={style.shareStyle} /> {comments.name}</Typography>
                                                <Typography sx={{ paddingLeft: 3 }}>{moment(comments.timestamp.toDate().toISOString()).fromNow()} </Typography>
                                            </Grid>
                                            <Box component={Grid} container justifyContent="flex-start" sx={{ marginTop: 2, paddingLeft: 2.5 }}>
                                                <Typography color='textPrimary' sx={{ marginLeft: 1, fontSize: 18 }}>{comments.text}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
