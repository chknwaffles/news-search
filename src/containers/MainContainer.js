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

export default function MainContainer({ searchTerm, currentUser, articles }) {
    const classes = useStyles();
    const handleLiked = (article) => {
        fetch(`http://localhost:3000/like/${currentUser.id}/article/${article.id}`)
        .then(r => r.json())
        .then(data => {
            console.log('working?')
        })
    }

    const renderCards = () => articles.map(article => <Article key={article.id} currentUser={currentUser} handleLiked={handleLiked} {...article} />)

    return (
        <div className={classes.root}>
            {renderCards()}
        </div>
    )
}