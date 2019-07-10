import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 700,
    marginLeft: theme.spacing(65),
  },
  button: {
    margin: theme.spacing(1),    // marginRight: theme.spacing(10)
  },
}));

export default function UserPage(props) {
    const classes = useStyles();

    const handleDelete = article => {
        props.handleFavorite(article)
    }

    const renderLikedArticles = () => {
        return props.currentUser.articles.map((article, i) => {
            return (
                <Box bgcolor="grey.A100" color="common.black">
                    <ListItem border={true} key={i} role={undefined} dense button>
                        <ListItemText id={article.id} primary={article.title} onClick={() => window.open(article.url, '_blank')} />
                        <IconButton onClick={() => handleDelete(article)} className={classes.button} aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                </Box>

            )
        })
    }

    return (
        <List className={classes.root}>
            {renderLikedArticles()}
        </List>
    );
}