import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 900
  },
  checkbox: {
    // marginRight: theme.spacing(10)
  },
}));

export default function UserPage(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    

  
    const renderLikedArticles = () => {
        return props.currentUser.articles.map((article, value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
                <ListItem key={value} role={undefined} dense button>
                    <ListItemText id={article.id} primary={article.title} onClick={() => window.open(article.url, '_blank')} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            className={classes.checkbox}
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemSecondaryAction>
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