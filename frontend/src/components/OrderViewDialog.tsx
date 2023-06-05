import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {FieldType} from "../types/FieldType";
import {ITemplate} from "../models/ITemplate";
import {IOrder} from "../models/IOrder";
import {
    ADDED,
    CANCEL_COMMAND,
    CANCELED,
    GIVEN,
    NEXT_COMMAND,
    ORDER_STATUS_BY_NAME,
    OrderStatus,
    READY
} from "../constants/OrderStatus";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {changeOrderStatus} from "../api/order";
import {OrderSlice} from "../store/reducers/OrderSlice";
import {MessageState} from "../store/reducers/MesageSlice";
import {CustomSnackBar, SnackBarParams} from "./CustomSnackBar";


interface Props {
    open: boolean,
    handleOpen: (order: IOrder) => void,
    handleClose: () => void,
    order: IOrder
}

interface TableElement {
    count: FieldType<number>,
    template: FieldType<ITemplate | undefined>
}

const OrderViewDialog = ({open, handleOpen, handleClose, order}: Props) => {

    const dispatch = useAppDispatch()
    const {orderPage, isLoading, error}: OrderSlice = useAppSelector(state => state.orderReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)


    const [tableOpen, setTableOpen] = React.useState<boolean[]>(new Array(order.templates.length).fill(false));
    const [orderState, setOrderState] = useState(order)
    const [sbParams, setSbParams] = useState<SnackBarParams>({open: false, severity: 'error', message: 'me'});


    useEffect(() => {
        orderPage?.content.forEach((o) => {
            if (o.id === order.id) {
                setOrderState(o)
            }
        })
    }, [orderPage])

    const handleTableOpen = (index: number) => {
        let tmpArray = Array.from(tableOpen);
        tmpArray[index] = !tableOpen[index]
        setTableOpen(tmpArray)
    }

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

    const templateFields = order.templates?.map((el, index) => {
        let messageByName = new Map(Object.entries(el.errorIngredient.messageByName));
        return (
            <React.Fragment>
                <TableRow
                    key={index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleTableOpen(index)}
                        >
                            {tableOpen[index] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {el.template.name}
                    </TableCell>
                    <TableCell align="right">{el.count}</TableCell>
                    <TableCell align="right">

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={tableOpen[index]} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Ингредиенты
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Название</TableCell>
                                            <TableCell>Кол-во для 1 шт</TableCell>
                                            <TableCell align="right">Статус</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            el.template.ingredients.map((i, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row">
                                                            {i.resourceType.name}
                                                        </TableCell>
                                                        <TableCell>{i.count} {i.resourceType.unit}</TableCell>
                                                        <TableCell align="right">
                                                            {
                                                                messageByName.has(i.resourceType.name) ?
                                                                    <Typography sx={{
                                                                        color: "red"
                                                                    }}>{messageByName.get(i.resourceType.name)}</Typography>
                                                                    : <Typography>Хватает</Typography>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>

        )
    });

    const steps: OrderStatus[] = [ADDED, READY, GIVEN];

    let currentStatus = ORDER_STATUS_BY_NAME.get(orderState.status);

    return (
        <Dialog maxWidth="xl" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Информация о заказе</DialogTitle>
            <DialogContent>
                {
                    currentStatus ? <Stepper activeStep={steps.indexOf(currentStatus)} alternativeLabel>
                            {
                                ORDER_STATUS_BY_NAME.get(orderState.status) === CANCELED ?
                                    <Step key={CANCELED.text}>
                                        <StepLabel error={true}>{CANCELED.text}</StepLabel>
                                    </Step>
                                    :
                                    steps.map((status) => (
                                        <Step key={status.text}>
                                            <StepLabel>{status.text}</StepLabel>
                                        </Step>
                                    ))
                            }
                        </Stepper>
                        : null
                }

                {
                    orderState.status != GIVEN.name && orderState.status != CANCELED.name
                        ?
                        <Box>
                            <Button onClick={() => changeStatus(orderState.id, NEXT_COMMAND)} sx={{mr: 1}}>
                                Изменить статус
                            </Button>
                            <Button onClick={() => changeStatus(orderState.id, CANCEL_COMMAND)} sx={{mr: 1}}>
                                Отменить заказ
                            </Button>
                        </Box>
                        : null
                }
                <Typography sx={{display: 'flex'}} color="text.secondary">
                    Имя клиента: <Typography sx={{ml: 1}}>{order.clientInfo.name}</Typography>
                </Typography>
                <Typography sx={{display: 'flex'}} color="text.secondary">
                    Контакт клиента: <Typography sx={{ml: 1}}>{order.clientInfo.contact}</Typography>
                </Typography>
                <Typography></Typography>
                <Typography></Typography>
                <DialogTitle id="-title">Продукты/Услуги</DialogTitle>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Продукт/услуга</TableCell>
                                <TableCell align="right">Кол-во</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                templateFields
                            }
                        </TableBody>
                    </Table>

                </TableContainer>

            </DialogContent>
            <CustomSnackBar params={sbParams} handleClose={() => setSbParams({
                open: false,
                severity: 'error',
                message: ''
            })}/>
        </Dialog>
    );
};

export default OrderViewDialog;