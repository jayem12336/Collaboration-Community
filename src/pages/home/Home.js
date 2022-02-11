import React, { useEffect, useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { onSnapshot, collection, orderBy, query } from '@firebase/firestore';

import {
  Box,
} from '@mui/material';

import NavBar from '../../components/navbar/Navbar';
import PostMap from './PostMap';

import { Helmet } from 'react-helmet';
import logohelmet from '../../assets/img/png/logoHelmet.png';

const style = {
  section1: {
    padding: {
      xs: "100px 0px",
      md: "60px 0px"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}

export default function HomeComponent() {

  const [userAuth, setUserAuth] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUserAuth(authUser)
    })
  }, [])

  const colRef = collection(db, "post");

  const queryTimeStamp = query(colRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    onSnapshot(queryTimeStamp, (snapshot) => {
      setPost(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    )
  }, [])

  return (
    <Box id="Home">
      <Helmet>
        <title>Home</title>
        <link rel="Collaboration Icon" href={logohelmet} />
      </Helmet>
      <NavBar />
      <Box sx={style.section1}>
        <Box sx={{ marginTop: 7 }}>
          {
            post.map((postdata) => (
              <PostMap
                key={postdata.id}
                postid={postdata.id}
                postowner={postdata.user}
                timestamp={postdata.timestamp}
                posttitle={postdata.title}
                postdesc={postdata.desc}
                postimage={postdata.image}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}