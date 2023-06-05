import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Container,
    Grid,
    Pagination,
    Typography
} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {MessageState} from "../store/reducers/MesageSlice";
import {createGlobalStyle} from "styled-components";
import {changeOrderStatus, getPageWithOrders} from "../api/order";
import {orderSlice, OrderSlice} from "../store/reducers/OrderSlice";
import {getStatus} from "../utils/OrderUtils";
import {CANCEL_COMMAND, CANCELED, GIVEN, NEXT_COMMAND, OrderStatus} from "../constants/OrderStatus";
import {RUB} from "../constants/CurrencyConstants";
import OrderViewDialog from "./OrderViewDialog";
import {IOrder} from "../models/IOrder";
import {CustomSnackBar, SnackBarParams} from "./CustomSnackBar";

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


    const [order, setOrder] =useState<IOrder | null>();

    const [getPageTrigger, setGetPageTrigger] = React.useState(true);

    const dispatch = useAppDispatch()
    const {orderPage, isLoading, error}: OrderSlice = useAppSelector(state => state.orderReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    useEffect(() => {
        changePageCount();
    }, [orderPage])

    useEffect(() => {
        /*let filter: TransactionFilterData = {
            getIncome: getIncome,
            getSales: getSales,
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : null,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : null
        }*/
        dispatch(getPageWithOrders(page, 10));
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

    const orderItems = orderPage?.content.map((el) => {
        let status: OrderStatus = getStatus(el);
        return (
            <Grid item xs={3}>
                <Card sx={{
                    height: "100%"
                }}>
                    <CardActionArea onClick={() => orderViewHandleOpen(el)}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {el.clientInfo.name}
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
            padding: 0
        }}>

            <Box sx={{
                height: "100%",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                padding: 0
            }}>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: "50%",
                    m: 'auto',
                    mt: 2,
                    pl: 2
                }}>
                </Box>
                <Box sx={{
                    flexGrow: 3,
                }}>
                    <Grid container spacing={2} sx={{
                        width: '100%',
                        ml: 5
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
        </Container>
    );
};

export default Order;