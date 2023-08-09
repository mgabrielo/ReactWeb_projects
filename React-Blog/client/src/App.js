import React, { useEffect, useState } from "react";
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import memories from './images/memories.png'
import Box from "@material-ui/core/Box";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from './styles'
import { getPosts } from './actions/posts'
import { useDispatch } from "react-redux";
const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
    return (
        <Container maxwidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <Box sx={{ objectFit: 'cover', width: 'fit-content' }}>
                    <img className={classes.image} src={memories} alt='memories' height='60' />
                </Box>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}


export default App;