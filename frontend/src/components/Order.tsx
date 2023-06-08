import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent, Checkbox,
    Container, FormControlLabel,
    Grid, IconButton,
    Pagination,
    Typography, useMediaQuery
} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {MessageState} from "../store/reducers/MesageSlice";
import {createGlobalStyle} from "styled-components";
import {changeOrderStatus, getPageWithOrders} from "../api/order";
import {orderSlice, OrderSlice} from "../store/reducers/OrderSlice";
import {getStatus} from "../utils/OrderUtils";
import {ADDED, CANCEL_COMMAND, CANCELED, GIVEN, NEXT_COMMAND, OrderStatus, READY} from "../constants/OrderStatus";
import {RUB} from "../constants/CurrencyConstants";
import OrderViewDialog from "./OrderViewDialog";
import {IOrder} from "../models/IOrder";
import {CustomSnackBar, SnackBarParams} from "./CustomSnackBar";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {IOrderFilter} from "../models/IOrderFilter";
import EditNoteIcon from '@mui/icons-material/EditNote';
import TemplateDialog from "./TemplateDialog";
import OrderDialog from "./OrderDialog";

const Order = () => {

    const DatePickerStyle = createGlobalStyle`
      .datepicker input {
        font-size: 14px;
      }
    `

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [orderViewDialog, setOrderViewDialog] = useState(false);
    const [sbParams, setSbParams] = useState<SnackBarParams>({open: false, severity: 'error', message: 'me'});
    const [added, setAdded] = React.useState(true);
    const [ready, setReady] = React.useState(true);
    const [given, setGiven] = React.useState(true);
    const [canceled, setCanceled] = React.useState(true);


    const [order, setOrder] =useState<IOrder | null>();
    const [orderDialog, setOrderDialog] =useState(false);

    const [getPageTrigger, setGetPageTrigger] = React.useState(true);

    const dispatch = useAppDispatch()
    const {orderPage, isLoading, error}: OrderSlice = useAppSelector(state => state.orderReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    const isMobile = useMediaQuery('(max-width:800px)');

    useEffect(() => {
        changePageCount();
    }, [orderPage])

    useEffect(() => {
        let statusList: string[] = []
        if (added) statusList.push(ADDED.name)
        if (given) statusList.push(GIVEN.name)
        if (ready) statusList.push(READY.name)
        if (canceled) statusList.push(CANCELED.name)
        let filter: IOrderFilter = {
            orderStatusList: statusList
        }
        dispatch(getPageWithOrders(filter, page, 10));
        if (page <= 0) dispatch(orderSlice.actions.orderFetchingClear());

    }, [page, message, getPageTrigger])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const changePageCount = () => {
        if (orderPage != null) {
            setPageCount(orderPage.totalPages);
        }
        if (page > pageCount || (pageCount === 1)) setPage(pageCount);
    };

    const changeStatus = (index: number, command: string) => {
        dispatch(changeOrderStatus(index, command)).then((r) => {
            if (r) {
                if (r.body)
                    setSbParams({
                        open: true,
                        severity: 'success',
                        message: r.body.message
                    })
                else if (r.error)
                    setSbParams({
                        open: true,
                        severity: 'error',
                        message: r.error.message
                    })
            }
        });
    };
    const orderViewHandleOpen = (orderParam: IOrder) => {
        setOrder(orderParam)
        setOrderViewDialog(true);
    };

    const orderViewHandleClose = () => {
        setOrderViewDialog(false);
    };

    const orderDialogHandleOpen = () => {
        setOrderDialog(true);
    };

    const orderDialogHandleSetAndOpen = (orderParam: IOrder) => {
        setOrder(orderParam)
        setOrderDialog(true);
    };

    const orderDialogHandleClose = () => {
        setOrderDialog(false);
    };

    const changeAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdded(event.target.checked);
    };

    const changeReady = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReady(event.target.checked);
    };

    const changeGiven = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGiven(event.target.checked);
    };

    const changeCanceled = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCanceled(event.target.checked);
    };

    const changeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeAdded(event);
        changeReady(event);
        changeGiven(event);
        changeCanceled(event);
    };

    const reset = () => {
        setAdded(true);
        setReady(true);
        setGiven(true);
        setCanceled(true);
        setGetPageTrigger(!getPageTrigger);
    };

    const orderItems = orderPage?.content.map((el) => {
        let status: OrderStatus = getStatus(el);
        return (
            <Grid item xs={isMobile ? 12 : 4} sx={{
                p: isMobile ? 0 : 2
            }}>
                <Card sx={{
                    height: "100%"
                }}>
                    <CardActionArea onClick={() => orderViewHandleOpen(el)}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {el.clientInfo.name}
                                <IconButton size="small"
                                            onTouchStart={(event) => event.stopPropagation()}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                orderDialogHandleSetAndOpen(el);
                                            }}
                                            color="primary"
                                >
                                    <EditNoteIcon/>
                                </IconButton>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Дата: {el.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Контакты: {el.clientInfo.contact}
                            </Typography>
                            <Typography sx={{display: 'flex'}} variant="body2" color="text.secondary">
                                Статус: <Typography sx={{ml: 1}} variant="body2"
                                                    color={status.color}>{status.text}</Typography>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{
                                mt: 2,
                            }}>
                                {RUB(el.cost).format()}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {
                            el.status != GIVEN.name && el.status != CANCELED.name
                                ?
                                <Box>
                                    <Button size="small" onClick={() => changeStatus(el.id, NEXT_COMMAND)}>Изменить
                                        статус</Button>
                                    <Button size="small" color="error"
                                            onClick={() => changeStatus(el.id, CANCEL_COMMAND)}>Отменить</Button>
                                </Box>
                                : null
                        }

                    </CardActions>
                </Card>
            </Grid>
        )
    });

    return (
        <Container style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'normal',
            padding: 0
        }}>
            <Box sx={{
                width: isMobile ? '90%' : '30%',
                mt: 2
            }}>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: '100%',
                    pl: isMobile ? 0 : 2
                }}>
                    <Typography variant='h6' sx={{
                        ml: isMobile ? 2 : 0
                    }}>Расходы/Доходы</Typography>
                    <FormControlLabel
                        sx={{
                            ml: isMobile ? 2 : 0
                        }}
                        label="Все"
                        control={
                            <Checkbox
                                checked={added && ready && given && canceled}
                                indeterminate={!(added && ready && given && canceled)}
                                onChange={changeAll}
                            />
                        }
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', ml: isMobile ? 5 : 3}}>
                        <FormControlLabel
                            label={ADDED.text}
                            control={<Checkbox checked={added} onChange={changeAdded}/>}
                        />
                        <FormControlLabel
                            label={READY.text}
                            control={<Checkbox checked={ready} onChange={changeReady}/>}
                        />
                        <FormControlLabel
                            label={GIVEN.text}
                            control={<Checkbox checked={given} onChange={changeGiven}/>}
                        />
                        <FormControlLabel
                            label={CANCELED.text}
                            control={<Checkbox checked={canceled} onChange={changeCanceled}/>}
                        />
                    </Box>

                </Box>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: '100%',
                    pt: 2,
                    pb: 2,
                    pl: isMobile ? 0 : 2,
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button variant="outlined" sx={{
                        width: '80%',
                        m: 'auto'
                    }}

                    >Сбросить</Button>
                    <Button variant="contained"
                            sx={{
                                width: '80%',
                                m: 'auto',
                                mt: 2
                            }}
                            onClick={() => setGetPageTrigger(!getPageTrigger)}
                    >
                        Применить
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                height: "100%",
                width: isMobile ? '90%' : '70%',
                display: 'flex',
                flexDirection: 'column',
                padding: 0
            }}>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: isMobile ? '100%' : '50%',
                    m: isMobile ? 0 : 'auto',
                    mt: 2,
                    pl: isMobile ? 0 : 2
                }}>
                </Box>
                <Box sx={{
                    flexGrow: 3,
                }}>
                    <Grid container spacing={isMobile ? {xs: 2} : 2} sx={{
                        width: '100%',
                        ml: isMobile ? 0 : 5
                    }}>
                        {
                            orderItems
                        }
                    </Grid>
                </Box>
                <Box sx={
                    {
                        mb: "2%",
                        ml: 'auto',
                        mr: 'auto'
                    }
                }>
                    <Pagination color="primary" count={pageCount} page={page} onChange={handleChangePage}/>
                </Box>
            </Box>
            {
                order ? <OrderViewDialog open={orderViewDialog} handleOpen={() => orderViewHandleOpen(order)} handleClose={orderViewHandleClose} order={order}/> : null
            }
            <CustomSnackBar params={sbParams} handleClose={() => setSbParams({
                open: false,
                severity: 'error',
                message: ''
            })}/>
            <OrderDialog open={orderDialog} handleOpen={orderDialogHandleOpen} handleClose={orderDialogHandleClose} order={order}/>
        </Container>
    );
};

export default Order;