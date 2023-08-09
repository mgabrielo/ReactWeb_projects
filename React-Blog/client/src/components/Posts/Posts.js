import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)

    return (
        !posts.length ? <CircularProgress />
            :
            (
                <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                    {
                        posts.map((post, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))
                    }
                </Grid>
            )
    )
}

export default Posts