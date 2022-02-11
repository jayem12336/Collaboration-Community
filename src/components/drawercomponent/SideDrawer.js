import React, { useState } from 'react';

import {
  IconButton,
  List,
  Drawer,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Grid,
  Typography,
  Link,
  Button
} from '@mui/material';

import { Link as ReactLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PostDialog from '../../pages/post/PostDialog'
import Scroll from "react-scroll";
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Logo from '../../assets/img/png/ColabLogo.png';

const ScrollLink = Scroll.Link;

const style = {
  menuIconContainer: {
    flexGrow: 1,
  },
  icons: {
    fontSize: '1.7rem',
    marginTop: "7px",
    marginLeft: "15px",
    marginRight: "20px",
  },
  iconStyle: {
    color: "white",
    fontSize: 35,
    marginTop: 1,

  },
  logoStyle: {
    height: 100,
    width: "100%",

  },
  textStyle: {
    fontSize: 20,
    color: '#000000',
    fontWeight: "bold"
  },
  linkStyle: {
    textDecoration: "none",
    marginRight: 2,
    marginTop: 0.5,
  },
  accountButton: {
    fontSize: '18px',
    width: 120,
    height: 40,
    backgroundColor: '#FFBD1F',
    fontWeight: "bold",
    textTransform: 'none',
    marginLeft: 1,
    color: '#000000',
    // color: (theme) => theme.colors.navButton,
    '&:hover': {
      color: "#fff",
      backgroundColor: '#FFBD1F',
    },
    borderRadius: 10,
  },
  btnLinks: {
    textDecoration: 'none',
    color: 'black'
  },
};

export default function DrawerComponent() {

  const [openDrawer, setOpenDrawer] = useState(false);

  const [postOpen, setPostOpen] = useState(false);

  const handleOpenPost = () => {
    setPostOpen(!postOpen);
  }

  return (
    <Box >
      <Drawer
        anchor='left'
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}

      >
        <Box sx={{ height: "100%" }}>
          <Box component={Grid} sx={{ height: 100, borderBottom: "1.5px solid #4BAEA6", padding: 1 }}>
            <img
              src={Logo}
              alt="Collaboration Logo"
              style={style.logoStyle}
            />
          </Box>
          <List>
            <ScrollLink
              className="navy"
              smooth={true}
              duration={500}
              to="home"
            >
              <ListItem
                button
              >
                <ListItemIcon>
                  <HomeIcon sx={style.icons} color="primary" />
                  <ListItemText>
                    <Typography sx={style.textStyle}>
                      <HashLink style={style.btnLinks} to="/home">Home</HashLink>
                    </Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </ScrollLink>
            <ScrollLink
              className="navy"
              smooth={true}
              duration={500}
              onClick={handleOpenPost}
            >
              <ListItem
                button
              >
                <ListItemIcon>
                  <PostAddIcon sx={style.icons} color="primary" />
                  <ListItemText>
                    <Typography sx={style.textStyle}>
                      <HashLink style={style.btnLinks} >Post</HashLink>
                    </Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </ScrollLink>
            <ScrollLink
              className="navy"
              smooth={true}
              duration={500}
              to="profile"
            >
              <ListItem
                button
              >
                <ListItemIcon>
                  <PersonIcon sx={style.icons} color="primary" />
                  <ListItemText>
                    <Typography sx={style.textStyle}>
                      <HashLink style={style.btnLinks} to="/profile">Profile</HashLink>
                    </Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </ScrollLink>
          </List>
        </Box>
        <PostDialog
          isPostOpen={postOpen}
          toggleClass={handleOpenPost}
        />
      </Drawer>
      <IconButton
        sx={style.menuIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        {!openDrawer ? <MenuIcon sx={style.iconStyle} /> : <MenuOpenIcon sx={style.iconStyle} />}
      </IconButton>
    </Box>
  )
}