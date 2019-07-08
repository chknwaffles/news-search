import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';


class NavBar extends React.Component {
    render(){
        return (
            <div>
                <AppBar position='sticky'>
                    {
                    this.props.currentUser

                    ?
                    
                    <Toolbar>
                        <Button className='more-options'> <MoreVertIcon /> </Button>
                        <Typography variant="h6">News</Typography>
                        <Button onClick={this.props.logout} color="inherit">Logout</Button>
                    </Toolbar>

                    :

                    <Toolbar>
                        <Button className='more-options'> <MoreVertIcon /> </Button>
                        <Typography variant="h6">News</Typography>
                        <Button to="/login" color="inherit">Login</Button>
                        <Button to="/signup" color="inherit">SignUp</Button>
                    </Toolbar>
                    }
                </AppBar>
                
            </div>
        )
    }

}

export default NavBar