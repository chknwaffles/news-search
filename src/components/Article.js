import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton'
import ArrowUp from '@material-ui/icons/KeyboardArrowUp'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));

export default function Article(props) {
    const classes = useStyles();
    const { currentUser, handleFavorite, id, source, author, title, description, url, urlImage, publishedAt, likes, dislikes} = props
    const [votes, setVotes] = useState({ likes: likes, dislikes: dislikes })

    const [liked, setLiked] = useState(() => {
        if (currentUser === null) 
            return false
        if (currentUser.articles.find(article => article.id === id)) 
            return true
        
        return false
    })

    const handleLike = () => {
        if (currentUser) {
            setLiked(!liked)
            console.log(liked)
            handleFavorite(props)
        } else {
            alert('You need to log in first!')
        }
    }

    const handleVote = (type) => {
        let voteType = (type === 'like') ? votes.likes : votes.dislikes
        fetch(`http://localhost:3000/article/${id}/${type}`)
        .then(r => r.json())
        .then(data => {
            let theType = type + 's'
            setVotes({...votes, [theType]: voteType + 1})
        })
    }

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => window.open(url)}>
                <CardMedia
                component="img"
                alt={source}
                height="140"
                image={urlImage}
                title={title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description} by {author}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => handleLike()} >

                    {(liked) ? <ThumbUpAltIcon /> : <ThumbUpIcon />}
                </Button>
                <IconButton size="small" color="primary" onClick={() => handleVote('like')} >
                    <ArrowUp />
                    {votes.likes}
                </IconButton>
                <IconButton size="small" color="primary" onClick={() => handleVote('dislike')} >
                    <ArrowDown />
                    {votes.dislikes}
                </IconButton>
            </CardActions>
        </Card>
    )
}