import React, { useEffect, useState } from 'react';
import { getDocsByCollection } from '../../utils/firebaseUtil'

import {
  Box,
  Button,
  Typography,
  Grid,
  Link
} from '@mui/material';

import NavBar from '../../components/navbar/Navbar'

import logo from '../../assets/img/png/ColabLogo.png'

import { Link as ReactLink } from 'react-router-dom';

const style = {
  //helper
  marginTop3: {
    marginTop: 3
  },
  marginLeft1: {
    marginLeft: {
      xs: 1,
      sm: 5,
    }
  },
  root: {
    backgroundColor: (theme) => theme.palette.background.default,
  },
  menuLink: {
    fontSize: "1.2rem",
    marginLeft: 2,
    "&:hover": {
      color: (theme) => theme.palette.secondary.main,
    }
  },
  headingStyle1: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: {
      xs: "1.0rem",
      sm: "1.2rem",
      md: "2.8rem",
    },
    fontFamily: "ComicSans"
  },
  subtitle1: {
    textAlign: "center",
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      md: "1.5rem",
    },
  },
  userImage: {
    height: {
      xs: 200,
      sm: 250
    },
    width: {
      xs: 200,
      sm: 250
    },
  },
  images: {
    height: 400
  },
  columnContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 5,
    h2: {
      textAlign: "center",
      fontSize: {
        xs: "2rem",
        sm: "2.2rem",
        md: "2.5rem",
      },
      color: (theme) => theme.colors.textColor
    }
  },
  homeContainer: {
    flexDirection: {
      md: 'row',
      sm: 'column',
      xs: 'column'
    },
    display: 'flex'
  },
  //helper
  marginStyle: {
    margin: {
      xs: 3,
      sm: 6,
      md: 10
    },
  },
  textAlignStyle: {
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 500,
    color: (theme) => theme.palette.primary.main
  },
  descriptStyle: {
    fontSize: 18,
    fontWeight: 200
  },

  section1: {
    padding: {
      xs: "100px 0px",
      md: "60px 0px"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  titleContainer: {
    paddingTop: {
      xs: 0,
      sm: 0,
      md: 10
    },
    paddingLeft: {
      xs: 0,
      sm: 0,
      md: 10
    },
    paddingRight: {
      xs: 0,
      sm: 0,
      md: 10
    },
    textAlign: 'center'
  },
  text: {
    marginTop: 0.5,
    fontSize: 20,
    color: 'black'
  },
  textContainer: {
    marginTop: 2,
    flexDirection: 'column',
    textAlign: 'center'
  },
  button: {
    height: 50,
    width: 180,
    borderRadius: 20,
    backgroundColor: '#FFBD1F',
    color: '#000000',
    fontSize: 18,
    fontWeight: 600
  },
  buttonContainer: {
    marginTop: 3,
  },
  aboutContainer: {
    flexDirection: {
      md: 'row',
      sm: 'column',
      xs: 'column'
    },
    display: 'flex',
  },
  imgContainer: {
    padding: {
      xs: 0,
      sm: 5,
      md: 10
    },
  },
  section2container: {
    flexDirection: {
      md: 'row',
      sm: 'column',
      xs: 'column'
    },
    display: 'flex',
    width: {
      md: '1000px'
    }
  },
  section2: {
    padding: {
      xs: "100px 0px",
      md: "150px 0px"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    backgroundColor: '#4BAEA6',
  },
  textsection2: {
    fontSize: 45,
    fontWeight: 500,
    color: '#fff'
  },
  linkStyle: {
    textDecoration: "none",
    marginRight: 2,
    marginTop: 0.5,
  },
  postContainer: {
    display: "flex",
    padding: 2,
    maxWidth: 450,
    cursor: 'pointer',
    boxShadow: '0 3px 5px 2px rgb(126 126 126 / 30%)',
    borderRadius: 4
  },
  postimageStyle: {
    width: 300,
    height: 300,
  }
}

export default function HomeComponent() {

  return (
    <Box id="Home">
      <NavBar />
      <Box sx={style.section1}>
        <Box sx={style.homeContainer}>
          <Box sx={style.marginStyle}>
            <Box component={Grid} container justifyContent="center" sx={style.postContainer}>
              <Grid container justifyContent="flex-start" sx={{ flexDirection: "column", marginBottom: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>Jerick Aguado</Typography>
                <Typography >Feb 11 2022</Typography>
              </Grid>
              <Grid container justifyContent="center" sx={{ flexDirection: "column" }}>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>Aldrin Kulapo</Typography>
                <Typography sx={{ textAlign: "center" }}>Hello wtf hahahah</Typography>
              </Grid>
              <Box component={Grid} container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={style.postimageStyle}
                />
              </Box>
              <Box component={Grid} container justifyContent="center">
                <Button fullWidth sx={{ borderRadius: 2,border:"0.5px solid black" }}>
                  Add Comment
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}