import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserPage(props) {
    const classes = useStyles();
  
    const renderLikedArticles = () => {
        return props.currentUser.articles.map((article, i) => {
            return (
                <ListItem key={i} role={undefined} dense button>
                    <ListItemText id={article.id} primary={article.title} onClick={() => window.open(article.url, '_blank')} />
                </ListItem>
            )
        })
    }

    return (
        <List className={classes.root}>
            {renderLikedArticles()}
        </List>
    );
}