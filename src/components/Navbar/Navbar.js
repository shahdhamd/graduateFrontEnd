import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import './Navbar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import Navbar from './../ResponsiveAppBar/Navbar';

function Navbar({ logout, loginData }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='navbarrr'>
      <AppBar position="static" className='appbar'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
          <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu className='menu'
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {loginData ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link textAlign="center" to='/AllContributions' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>المساهمات<PeopleAltIcon className='icon' /></Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link textAlign="center" to='/home' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>الصفحة الرئيسية<HomeIcon className='icon' /></Link>
                    </MenuItem>

                    <MenuItem onClick={() => {
                      handleCloseNavMenu();
                      logout();
                    }}>
                      <Link textAlign="center" to='/home' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>تسجيل الخروج<LogoutIcon className='icon' /></Link>

                    </MenuItem>
                     {
                        (loginData && loginData.role === 'admin') ? (<>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link textAlign="center" to='/dashboard' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>الداش بورد<DashboardIcon className='icon' /></Link>
                          </MenuItem>
                        </>) : (<>
                          
                        </>)
                      }
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link textAlign="center" to='/login' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>تسجيل الدخول<LoginIcon className='icon' /></Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} >
                      <Link textAlign="center" to='/signup' style={{ 'color': 'rgb(82, 142, 37) ', 'textDecoration': 'none' }}>انشاء حساب<PersonAddAlt1Icon className='icon' /></Link>
                    </MenuItem>

                  </>
                )}
              </Menu>
            </Box>


            <Box sx={{ flexGrow:1 , display: { xs: 'none', md: 'flex' } }} className='items'>
              {loginData ? (
                <>
                  <Link textAlign="end" to='/AllContributions'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  ><PeopleAltIcon className='icon' />
                    المساهمات
                  </Link>

                  <Link textAlign="end" to='/home'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  ><HomeIcon className='icon' />
                    الصفحة الرئيسية
                  </Link>
                  {
                        (loginData && loginData.role === 'admin') ? (<>
                  <Link textAlign="end" to='/dashboard'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  ><DashboardIcon className='icon' />
                    الداش بورد
                  </Link>
                  </>) : (<>
                          
                        </>) }
                  <Link textAlign="end" to='/login' onClick={() => {
                    handleCloseNavMenu();
                    logout();
                  }}
                    sx={{ my: 2, display: 'block' }}
                  ><LogoutIcon className='icon' />
                    تسجيل الخروج
                  </Link>


                </>
              ) : (
                <>
                  <Link textAlign="end" to='/login'
                    onClick={handleCloseNavMenu}
                    sx={{ mx: 2, display: 'block' }}
                  ><LoginIcon className='icon' />
                    تسجيل الدخول
                  </Link>

                  <Link textAlign="end" to='/signup'
                    onClick={handleCloseNavMenu}
                    sx={{ mx: 2, display: 'block' }}
                  ><PersonAddAlt1Icon className='icon' />
                    انشاء حساب
                  </Link>
                </>
              )}
            </Box>
           {loginData ? (
              <>
                <Box sx={{flexGrow:0 , 'marginRight': '10px' }}>
                  <Tooltip >

                    <IconButton onClick={handleNavigate} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="images/leafLogo.jpg" className='image' />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography sx={{  }} className='userNamee'>
                  {loginData && (<Link to='/profile' style={{ color: 'inherit', textDecoration: 'none' }}>
                    {loginData.userName}</Link>)}
                </Typography>


              </>
            ) : (
              <>
                <Box sx={{ }}> </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar></div>

  );
}
export default Navbar;