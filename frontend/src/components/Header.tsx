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
    Typography, useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCurrentUser, logout} from "../api/auth";
import {LOGIN, MAIN, ORDER} from "../constants/Urls";
import ResourceTypeDialog from "./ResourceTypeDialog";
import TemplateDialog from "./TemplateDialog";
import {CurrentUserState} from "../store/reducers/CurrentUserSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import OrderDialog from './OrderDialog';
import AddBoxIcon from '@mui/icons-material/AddBox';


interface DrawerListEl {
    text: string,
    href: string
}

const Header = () => {
    const isMobile = useMediaQuery('(max-width:800px)');

    const [menu, setMenu] = useState(false);
    const [resourceTypeDialog, setResourceTypeDialog] = useState(false);
    const [templateDialog, setTemplateDialog] = useState(false);
    const [orderDialog, setOrderDialog] = useState(false);
    const [createMenu, setCreateMenu] = React.useState<null | HTMLElement>(null);


    const dispatch = useAppDispatch()
    const {user, isLoading, error}: CurrentUserState = useAppSelector(state => state.currentUserReducer)

    useEffect(() => {
        dispatch(getCurrentUser()).then((r) => {
            if (!r || !r.body) window.location.href = LOGIN;
        })
        console.log(isMobile)
    }, [])

    const logoutEvent = () => {
        dispatch(logout())
        window.location.href = LOGIN;
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

    const templateHandleOpen = () => {
        setTemplateDialog(true);
    };

    const templateHandleClose = () => {
        setTemplateDialog(false);
        setCreateMenu(null);
    };

    const orderHandleOpen = () => {
        setOrderDialog(true);
    };

    const orderHandleClose = () => {
        setOrderDialog(false);
        setCreateMenu(null);
    };

    console.log(isMobile)

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
                            {isMobile ? "SB" : "Self Business"}
                        </Typography>
                        {
                            isMobile ?
                                <IconButton color="inherit" size="medium" onClick={createMenuHandleClick} sx={{
                                    ml: 2,
                                }}>
                                    <AddBoxIcon/>
                                </IconButton>
                                :
                                <Button size="medium" variant="contained" onClick={createMenuHandleClick} sx={{
                                    ml: 5,
                                }}>
                                    Добавить
                                </Button>
                        }
                        <Menu
                            id="simple-menu"
                            anchorEl={createMenu}
                            keepMounted
                            open={Boolean(createMenu)}
                            onClose={() => setCreateMenu(null)}
                        >
                            <MenuItem onClick={resourceTypeHandleOpen}>Расходный материал</MenuItem>
                            <MenuItem onClick={templateHandleOpen}>Продукт/Услуга</MenuItem>
                            <MenuItem onClick={orderHandleOpen}>Заказ</MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        {
                            user ?
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Typography>{user.user.name}</Typography>
                                    <IconButton color="inherit" onClick={logoutEvent}><LogoutIcon/></IconButton>
                                </Box>
                                : <Button color="inherit" href={"/login"}>Войти</Button>
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
                            {[{text: "Склад", href: "/resource-types"},
                                {text: "Продукция/Услуги", href: "/template"},
                                {text: "Заказы", href: ORDER},
                                {text: "История операций", href: "/history"},
                                {text: "Статистика", href: "/statistic"},
                                {text: "Контакты", href: "/contact"}].map((el: DrawerListEl, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton type="link" href={el.href}>
                                        <ListItemText primary={el.text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
            <ResourceTypeDialog open={resourceTypeDialog} handleOpen={resourceTypeHandleOpen}
                                handleClose={resourceTypeHandleClose}/>
            <TemplateDialog open={templateDialog} handleOpen={templateHandleOpen} handleClose={templateHandleClose}/>
            <OrderDialog open={orderDialog} handleOpen={orderHandleOpen} handleClose={orderHandleClose}/>
        </Box>
    );
};

export default Header;