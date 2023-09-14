import { useRouter } from 'next/router';
import { useUser } from '@/context/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import AddIcon from '@material-ui/icons/Add'
import { Tooltip } from '@material-ui/core';

interface IHeaderProps {
}

const Header: React.FC<IHeaderProps> = (props) => {
    const router = useRouter()
    const {user} = useUser()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const signOut =async()=>{
        await Auth.signOut()
    }
  return(
    <>
    <AppBar position="static" color='inherit' style={{marginBottom:10}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          size='medium'
          style={{marginRight:2, }}
        >
          <RssFeedIcon/>
        </IconButton>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Reddit Blog
        </Typography>
        {user && (
          <>
            <Tooltip title='Create post'>
                <Button style={{color:'inherit', marginRight:5}} onClick={()=>router.push('/create')}><AddIcon color='inherit' fontSize='medium'/>Create Post</Button>
            </Tooltip>
            <Button onClick={signOut}>Sign Out</Button>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </>
          
        )}
        {!user && (
            <>
            <Button variant='outlined' onClick={()=>router.push(`/login`)} style={{marginRight:5}}>Login</Button>
            <Button variant='contained' color='inherit' onClick={()=>router.push(`/signup`)}>Sign Up</Button>
            </>
        )}
      </Toolbar>
    </AppBar>
    </>

  
  ) ;
};

export default Header;
