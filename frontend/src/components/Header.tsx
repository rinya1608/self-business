import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCurrentUser, logout} from "../api/auth";
import {MAIN} from "../constants/Urls";
import ResourceTypeDialog from "./ResourceTypeDialog";
import ResourceDialog from "./ResourceDialog";

const Header = () => {

    const [menu, setMenu] = useState(false);
    const [resourceTypeDialog, setResourceTypeDialog] = useState(false);
    const [resourceDialog, setResourceDialog] = useState(false);
    const [createMenu, setCreateMenu] = React.useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch()
    const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    const logoutEvent = () => {
        dispatch(logout())
        window.location.href = MAIN;
    }

    const createMenuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCreateMenu(event.currentTarget);
    };

    const resourceTypeHandleOpen = () => {
        setResourceTypeDialog(true);
    };

    const resourceTypeHandleClose = () => {
        setResourceTypeDialog(false);
        setCreateMenu(null);
    };

    const resourceHandleOpen = () => {
        setResourceDialog(true);
    };

    const resourceHandleClose = () => {
        setResourceDialog(false);
        setCreateMenu(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => setMenu(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Self Business
                        </Typography>
                        <Button size="medium" variant="contained" onClick={createMenuHandleClick} sx={{
                            ml: 5,
                        }}>
                            Create
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={createMenu}
                            keepMounted
                            open={Boolean(createMenu)}
                            onClose={() => setCreateMenu(null)}
                        >
                            <MenuItem onClick={resourceTypeHandleOpen}>Resource Type</MenuItem>
                            <MenuItem onClick={resourceHandleOpen}>Resource</MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        {
                            user ? <Button color="inherit" onClick={logoutEvent}>Logout</Button>
                                : <Button color="inherit" href={"/login"}>Login</Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <React.Fragment key="left">
                <Drawer
                    anchor="left"
                    open={menu}
                    onClose={() => setMenu(false)}
                >
                    <Box
                        sx={{width: 250}}
                        role="presentation"
                        onClick={() => setMenu(true)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
            <ResourceTypeDialog open={resourceTypeDialog} handleOpen={resourceTypeHandleOpen} handleClose={resourceTypeHandleClose}/>
            <ResourceDialog open={resourceDialog} handleOpen={resourceHandleOpen} handleClose={resourceHandleClose}/>
        </Box>
    );
};

export default Header;