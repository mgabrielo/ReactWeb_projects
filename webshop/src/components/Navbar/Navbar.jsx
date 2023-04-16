import React from 'react'
import { AppBar,Toolbar,IconButton,Badge,MenuItem,Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/webcommerce.png'
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({totalItems}) => {
    const location = useLocation()
    const classes= useStyles();
    
    return (
    <>
    <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
            <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                <img src={logo} alt='Commerce.js' height="25px" className={classes.image}/>
                Web Shop Commerce
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.button}/>
            { location.pathname == '/' ? (<IconButton component={Link} to='/cart' aria-label='Show Cart Items' color='inherit'>
                <Badge badgeContent={totalItems} color='secondary'>
                    <ShoppingCart/>
                </Badge>
            </IconButton>) : (<></>)}
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar