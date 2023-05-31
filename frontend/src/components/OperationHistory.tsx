import React, {useEffect} from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Typography
} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {transactionSlice, TransactionSlice} from "../store/reducers/TransactionSlice";
import {MessageState} from "../store/reducers/MesageSlice";
import {getPageWithTransaction} from "../api/transaction";
import {TransactionFilterData} from "../models/TransactionFilterData";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {Dayjs} from "dayjs";
import {createGlobalStyle} from "styled-components";
import {RUB} from "../constants/CurrencyConstants";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';

const OperationHistory = () => {

    const DatePickerStyle = createGlobalStyle`
      .datepicker input {
        font-size: 14px;
      }
    `

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [getIncome, setGetIncome] = React.useState(true);
    const [getSales, setGetSales] = React.useState(true);
    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);

    const [getPageTrigger, setGetPageTrigger] = React.useState(true);

    const dispatch = useAppDispatch()
    const {transactionPage, isLoading, error}: TransactionSlice = useAppSelector(state => state.transactionReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    useEffect(() => {
        changePageCount();
    }, [transactionPage])

    useEffect(() => {
        let filter: TransactionFilterData = {
            getIncome: getIncome,
            getSales: getSales,
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : null,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : null
        }
        dispatch(getPageWithTransaction(page > 0 ? page : 1, 10, filter));
        if (page <= 0) dispatch(transactionSlice.actions.transactionFetchingClear());

    }, [page, message, getPageTrigger])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const changePageCount = () => {
        if (transactionPage != null) {
            setPageCount(transactionPage.totalPages);
        }
        if (page > pageCount || (pageCount === 1)) setPage(pageCount);
    };

    const changeGetIncome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetIncome(event.target.checked);
    };

    const changeGetSales = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGetSales(event.target.checked);
    };

    const changeGetAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeGetIncome(event);
        changeGetSales(event);
    };

    const reset = () => {
        setGetSales(true);
        setGetIncome(true);
        setDateTo(null);
        setDateFrom(null);
        setGetPageTrigger(!getPageTrigger);
    };

    const transactionItems = transactionPage?.content.map((el) => {
        return (
            el.resource ?
                <ListItem
                    key={el.id}
                    disablePadding
                    sx={{
                        mt: 2
                    }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddShoppingCartIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={el.resource.typeName}
                        secondary={new Date(el.date).toLocaleString()}
                    />
                    <ListItemText sx={{
                        textAlign: 'right',
                        color: 'red'
                    }}
                                  primary={'-' + RUB(el.sum).format()}/>
                </ListItem>
                :
                <ListItem
                    key={el.id}
                    disablePadding
                    sx={{
                        mt: 2
                    }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <CheckIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={el.template?.name}
                        secondary={new Date(el.date).toLocaleString()}
                    />
                    <ListItemText sx={{
                        textAlign: 'right',
                        color: 'green'
                    }}
                                  primary={RUB(el.sum).format()}/>
                </ListItem>
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
                width: '30%',
                mt: 2
            }}>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: '100%',
                    pl: 2
                }}>
                    <Typography variant='h6'>Расходы/Доходы</Typography>
                    <FormControlLabel
                        label="Все"
                        control={
                            <Checkbox
                                checked={getIncome && getSales}
                                indeterminate={getIncome !== getSales}
                                onChange={changeGetAll}
                            />
                        }
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                        <FormControlLabel
                            label="Расходы"
                            control={<Checkbox checked={getIncome} onChange={changeGetIncome}/>}
                        />
                        <FormControlLabel
                            label="Доходы"
                            control={<Checkbox checked={getSales} onChange={changeGetSales}/>}
                        />
                    </Box>

                </Box>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: '100%',
                    pl: 2,
                    pb: 2,
                    mt: 2,
                }}>
                    <Typography variant='h6'>Дата</Typography>
                    <Box sx={{
                        display: 'flex',
                        mt: 2,
                        alignItems: 'center'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dateFrom}
                                        className={"datepicker"}
                                        label='С'
                                        format="DD-MM-YYYY"
                                        views={["day", "month", "year"]}
                                        onChange={date => setDateFrom(date)}
                                        slotProps={{textField: {size: 'small', sx: {width: '43%'}}}}
                            />
                        </LocalizationProvider>
                        <Typography sx={{ml: 2}}> - </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dateTo}
                                        className={"datepicker"}
                                        label='По'
                                        format="DD-MM-YYYY"
                                        views={["day", "month", "year"]}
                                        onChange={date => setDateTo(date)}
                                        slotProps={{textField: {size: 'small', sx: {width: '43%', ml: 2}}}}
                            />
                            <DatePickerStyle/>
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    width: '100%',
                    pt: 2,
                    pb: 2,
                    pl: 2,
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button variant="outlined" sx={{
                        width: '80%',
                        m: 'auto'
                    }}
                            onClick={() => reset()}
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
                width: "70%",
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
                    <Typography variant='h6'>Операции</Typography>
                </Box>
                <Box sx={{
                    flexGrow: 3,
                }}>
                    <List sx={{
                        width: '50%',
                        m: 'auto'
                    }}>
                        {
                            transactionItems
                        }
                    </List>
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
        </Container>
    );
};

export default OperationHistory;