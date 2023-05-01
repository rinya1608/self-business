import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {current} from "@reduxjs/toolkit";
import {getCurrentUser, logout} from "../api/auth";
import {MAIN} from "../constants/Urls";

const Header = () => {

    const [menu, setMenu] = useState(false);

    const dispatch = useAppDispatch()
    const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    const logoutEvent = () => {
        dispatch(logout())
        window.location.href = MAIN;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setMenu(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {
                        user ? <Button color="inherit" onClick={logoutEvent}>Logout</Button>
                            : <Button color="inherit" href={"/login"}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <React.Fragment key="left">
                <Drawer
                    anchor="left"
                    open={menu}
                    onClose={() => setMenu(false)}
                >
                    <Box
                        sx={{ width: 250}}
                        role="presentation"
                        onClick={() => setMenu(true)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

export default Header;