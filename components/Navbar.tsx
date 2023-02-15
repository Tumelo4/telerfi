import { AppBar, Box,Avatar, Button, Fade, Menu, MenuItem, Modal, Drawer } from '@mui/material'
import {StyledToolBar, StyledBadge, Search, Icons, UserBox, StyleInputBase, styleBox } from '@/interface/StyledComponentInterface'
import SearchIcon from '@mui/icons-material/Search'
import MailIcon from '@mui/icons-material/Mail'
import Link from 'next/link'
import React, { useState } from 'react'
import { Notifications } from '@mui/icons-material';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '@/public/logo.png'
import Login from './Login';
import { useShoppingCart } from '@/context/ShoppingCartContext'
import Cart from './Cart'
import Image from 'next/image'


const Navbar = () => {
  const { showCart, setshowCart, totalQuantities, isLogin, setOpenLogin, openLogin, setIsLogin } = useShoppingCart();
  const [openMenu, setOpenMenu ] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setshowCart(open);
  };

  const handleOpen = () => {
    if (!isLogin) {
      setOpenLogin(true);
    }
    else {
      setOpenMenu(true);
    }
  }

  const handleLogout = () => {
    setIsLogin(false)
    setOpenMenu(false)
  }

  return (
    <AppBar style = {{position:'fixed'}}>
      <StyledToolBar>
        <Link href='/'>
          <Image
            src={logo.src}
            alt="Logo"
            style={
              {
                width: "32px",
                height: "32px",
                objectFit: "cover",
                cursor: "pointer"
              }}
          />
        </Link>
        <Search>
          <StyleInputBase placeholder='Search...'/>
          <Button
            style={{
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px',
              paddingLeft: "10px",
              borderRadius: "10px"
            }}>
            <SearchIcon />
          </Button>
        </Search>
        <Icons>
            {/* Shopping cart Icon */}
            
          <StyledBadge
            badgeContent={totalQuantities}
            color="success"
            onClick={() => setshowCart(true)}
          >
            <FaShoppingCart
              style={{
                width: "20px",
                height: "20px"
              }}
              color="rgba(0, 0, 0, 0.54)"
            />
          </StyledBadge>
            {/* Mail Icon */}
          <StyledBadge
            badgeContent={4}
            color="error"
          >
            <MailIcon color="action"/>
          </StyledBadge>
          {/* Notifications icon */}
          <StyledBadge
            badgeContent={2}
            color="error"
          >
            <Notifications color="action"/>
          </StyledBadge>
          <Avatar
            sx={{
              width: 30,
              height: 30
            }}
            style={{ cursor: 'pointer' }}
            onClick = {handleOpen}
          />
        </Icons>

        <UserBox>
          {/* Shopping cart Icon */}
          <StyledBadge
            badgeContent={totalQuantities}
            color="success"
            onClick={() => setshowCart(true)}
          >
            <FaShoppingCart 
              style={{
                width: "20px",
                height: "20px"
              }}
              color="rgba(0, 0, 0, 0.54)"
            />
          </StyledBadge>
          <Avatar
            sx={{
              width: 30,
              height: 30
            }}
            style={{ cursor: 'pointer' }}
            onClick = {handleOpen}
          />
        </UserBox>
      </StyledToolBar>
      <Menu
        open={openMenu}
        onClose = {() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -55,
          horizontal: 'right',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        closeAfterTransition
      >
        <Fade in={openLogin}>
          <Box sx={styleBox}>
            <Login />
          </Box>
        </Fade>
      </Modal>

      {/* Drawer */}

      <Drawer
        anchor='right'
        open={showCart}
        onClose={toggleDrawer(false)}
      >
        <Cart/>
      </Drawer>
      
    </AppBar>
  )
}

export default Navbar