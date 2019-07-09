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

const useStyles = makeStyles({
    card: {
      maxWidth: 500
    },
});

export default function Article(props) {
    const classes = useStyles();
    const { currentUser, handleLiked, id, source, author, title, description, url, urlImage, publishedAt } = props
    const [liked, setLiked] = useState(() => {
        if (currentUser === null) 
            return false
        if (currentUser.articles.find(article => article.id === id)) 
            return true
        
        return false
    })

    const handleLike = () => {
        if (currentUser) {
            setLiked(true)
            handleLiked(props)
        } else {
            alert('You need to log in first!')
        }
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
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
                <Button size="small" color="primary" >

                    {(liked) ? <ThumbUpAltIcon /> : <ThumbUpIcon onClick={() => handleLike()}/>}
                </Button>
            </CardActions>
        </Card>
    )
}