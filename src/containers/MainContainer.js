import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Article from '../components/Article';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    }
}));

export default function MainContainer({ articles }) {
    const classes = useStyles();
    const renderCards = () => articles.map(article => <Article key={article.id} {...article} />)

    return (
        <div className={classes.root}>
            {renderCards()}
        </div>
    )
}