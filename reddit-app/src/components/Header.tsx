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
import MenuItem from '@material-ui/core/MenuItem';
import { Auth } from 'aws-amplify';


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
    <Box style={{ flexGrow: 1, marginBottom:10 }}>

    <AppBar position="static" color='inherit'>
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
          <div>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
                <Button onClick={signOut}>Sign Out</Button>
          </div>
        )}
        {!user && (
            <>
            <Button variant='outlined' onClick={()=>router.push(`/login`)} style={{marginRight:5}}>Login</Button>
            <Button variant='contained' color='inherit' onClick={()=>router.push(`/signup`)}>Sign Up</Button>
            </>
        )}
      </Toolbar>
    </AppBar>
  </Box>
  ) ;
};

export default Header;
