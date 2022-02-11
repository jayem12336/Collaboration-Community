import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Grid,
    useMediaQuery,
    Link
} from '@mui/material';

import { HashLink } from 'react-router-hash-link';

import Scroll from "react-scroll";

import { useTheme } from '@mui/material/styles';
import SideDrawer from '../drawercomponent/SideDrawer';
import Logo from '../../assets/img/png/Logohomepage.png';
import HomeIcon from '../../assets/img/jpg/IconHomeNew.png';
import UserIcon from '../../assets/img/jpg/IconProfileNew.png';
import FileIcon from '../../assets/img/jpg/IconFileNew.png';
import PostDialog from '../../pages/post/PostDialog'

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';


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
        fontSize: '22px',
        width: 'auto',
        textDecoration: 'none',
        color: "#fff",
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 8px',
        lineHeight: '1.75',
        cursor: 'pointer'
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
        color: 'white',
        cursor:"pointer"
    },
    logoIconFile: {
        height: 50,
        width: 50,
        color: 'white',
        cursor:"pointer"
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

    const history = useHistory();

    const matchMD = useMediaQuery(theme.breakpoints.up('md'));

    const navRef = React.useRef();
    navRef.current = navBackground

    const [postOpen, setPostOpen] = useState(false);

    const handleOpenPost = () => {
        setPostOpen(!postOpen);
    }


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
                        <Box component={Grid} container justifyContent="flex-start" sx={{ width: '100%' }}>
                            <Link to="/home">
                                <img
                                    src={Logo}
                                    alt="Collab Logo"
                                    style={style.logoStyle}
                                />
                            </Link>
                        </Box>
                        {!matchMD ? <SideDrawer /> :
                            <>
                                <Box component={Grid} container justifyContent="flex-end">
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
                                    <Box sx={style.btnLinks}>
                                        <ScrollLink
                                            className="navy"
                                            smooth={true}
                                            duration={500}
                                            to="Home"
                                            style={{ paddingTop: 10 }}
                                        >
                                            <img src={HomeIcon} alt="home" style={style.logoIconStyle} onClick={() => history.push("/home")}/>
                                        </ScrollLink>
                                    </Box>
                                    <Box onClick={handleOpenPost} sx={style.btnLinks}>
                                        <img src={FileIcon} alt="addPost" style={style.logoIconFile} />
                                    </Box>
                                    <Box sx={style.btnLinks}>
                                        <img src={UserIcon} alt="profile" style={style.logoIconStyle} onClick={() => history.push("/profile")} />
                                    </Box>
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
