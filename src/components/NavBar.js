import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 2
  },
  
  navItem: {
    marginLeft: theme.spacing(2)
  },
  divItem: {
    marginLeft: theme.spacing(10)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function NavBar({currentUser, logout, searchTerm, handleSearchInput, handleSearchSubmit, history}) {
    const classes = useStyles();
    const showProperButton = () => {
      if (currentUser) {
        return (
          <React.Fragment>
            <Button to='/profile' component={Link} color="inherit">Profile</Button>
            <Button className={classes.navItem} onClick={() => logout()} to='/login' component={Link} color="inherit">Logout</Button>
          </React.Fragment>
        )
      } else {              
            return (
            <React.Fragment>
              <Button className={classes.navItem} to='/login' component={Link} color="inherit">Login</Button>
              <Button className={classes.navItem} to="/signup" component={Link} color="inherit">SignUp</Button>
            </React.Fragment>)
      }
    }


    const createStupidDivs = () => {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(e => <div className={classes.navItem}> </div>)
    }
                                                                                    
    const searchSubmit = (e) => {
      e.preventDefault()
      history.push('/')
      handleSearchSubmit()
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Button to="/" component={Link} color='inherit'> News </Button>
                    {showProperButton()}
                    {createStupidDivs()}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <form onSubmit={(e) => searchSubmit(e)} >
                          <InputBase
                              placeholder="Search Topic..."
                              classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'Search' }}
                              value={searchTerm}
                              onChange={handleSearchInput}
                          />
                        </form>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
