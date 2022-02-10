import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Grid,
    useMediaQuery,
    Link
} from '@mui/material';

import { Link as ReactLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import Scroll from "react-scroll";

import { useTheme } from '@mui/material/styles';
import SideDrawer from '../drawercomponent/SideDrawer';
import Logo from '../../assets/img/png/Logohomepage.png';
import HomeIcon from '../../assets/img/png/home.svg';
import UserIcon from '../../assets/img/png/portrait.svg';
import FileIcon from '../../assets/img/png/file-add.svg';
import PostDialog from '../../pages/post/PostDialog'





import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


const ScrollLink = Scroll.Link;

const style = {
    accountButton: {
        fontSize: '18px',
        width: 120,
        height: 40,
        backgroundColor: '#FFBD1F',
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
    logoStyle: {
        height: 80,
        width: 80,
    },
    title: {
        fontSize: '25px',
        marginLeft: 1,
        color: (theme) => theme.colors.navButton
    },
    menuLinks: {
        marginLeft: 8,
        '&:hover': {
            background: '#4877c2',
            color: (theme) => theme.colors.navButton,
        }
    },
    linkStyle: {
        textDecoration: "none",
        marginRight: 2,
        marginTop: 0.5,
    },
    btnLinks: {
        marginLeft: 15,
        fontSize: '22px',
        width: 'auto',
        textDecoration: 'none',
        color: "#fff",
        fontWeight: 500,
        '&:hover': {
            background: '#4877c2',
            color: (theme) => theme.colors.navButton,
        },
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 8px',
        lineHeight: '1.75'
    },
    linkContainer: {
        justifyContent: 'end',
        flexGrow: {
            xs: '1',
            sm: '1',
            md: '0'
        },
    },
    toolbarStyle: {
        padding: {
            xs: 1,
            sm: 1,
            md: 2
        },

        height: 35,
        width: 1300,
        justifyContent: {
            xs: 'space-between',
            sm: 'space-between'
        }
    },
    appBarTransparent: {
        height: 90,
        paddingTop: 15,
    },
    appBarSolid: {
        backgroundColor: 'rgba(67, 129, 168)',
    },
    logoIconStyle: {
        height: 50,
        width: 50,
        color: 'white'
    }
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: 45,
    marginTop: 8,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

export default function Navbar() {

    const [navBackground, setNavBackground] = useState('appBarTransparent');

    const theme = useTheme();

    const matchMD = useMediaQuery(theme.breakpoints.up('md'));

    const navRef = React.useRef();
    navRef.current = navBackground

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [postOpen, setPostOpen] = useState(false);

    const handleOpenPost = () => {
        setPostOpen(!postOpen);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 310
            if (show) {
                setNavBackground('appBarSolid');
            } else {
                setNavBackground('appBarTransparent');
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Box component={Grid} container justifyContent="center">
            <AppBar position="fixed" elevation={0} style={style.appBarTransparent}>
                <Grid container justifyContent="center">
                    <Toolbar sx={style.toolbarStyle}>
                        <Link href="#">
                            <img
                                src={Logo}
                                alt="Collab Logo"
                                style={style.logoStyle}
                            />
                        </Link>

                        {!matchMD ? <SideDrawer /> :
                            <>
                                <Box component={Grid} container justifyContent="center" sx={{ paddingLeft: 20 }}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                </Box>
                                <Grid container justifyContent="center" style={style.linkContainer}>
                                    <ScrollLink
                                        className="navy"
                                        smooth={true}
                                        duration={500}
                                        to="Home"
                                    >
                                        {/* <Button sx={style.btnLinks} >
                                                Home
                                            </Button> */}
                                        <HashLink style={style.btnLinks} to="/">
                                            <img src={HomeIcon} alt="home" style={style.logoIconStyle} />
                                        </HashLink>
                                    </ScrollLink>
                                    <ScrollLink
                                        className="navy"
                                        smooth={true}
                                        duration={500}
                                        onClick={handleOpenPost}
                                    >
                                        {/* <Button sx={style.btnLinks} > */}
                                        <HashLink style={style.btnLinks} >
                                            <img src={FileIcon} alt="home" style={style.logoIconStyle} />
                                        </HashLink>

                                        {/* </Button> */}
                                    </ScrollLink>
                                    <ScrollLink
                                        className="navy"
                                        smooth={true}
                                        duration={500}
                                        to="About"
                                    >
                                        {/* <Button sx={style.btnLinks} >
                                                About
                                            </Button> */}
                                        <HashLink style={style.btnLinks} to="/">
                                            <img src={UserIcon} alt="home" style={style.logoIconStyle} />
                                        </HashLink>

                                    </ScrollLink>
                                </Grid>
                            </>
                        }
                    </Toolbar>

                </Grid>
            </AppBar>
            <PostDialog
                isPostOpen={postOpen}
                toggleClass={handleOpenPost}
            />
        </Box>

    )
}
