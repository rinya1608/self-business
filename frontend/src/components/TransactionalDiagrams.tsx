import React, {useEffect} from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {MessageState} from "../store/reducers/MesageSlice";
import {getTransactionalStatistic} from "../api/transaction";
import {TransactionFilterData} from "../models/TransactionFilterData";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {Dayjs} from "dayjs";
import {createGlobalStyle} from "styled-components";
import {TransactionStatisticSlice} from "../store/reducers/TransactionStatisticSlice";
import {RUB} from "../constants/CurrencyConstants";

// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TransactionalDiagrams = () => {

    const DatePickerStyle = createGlobalStyle`
      .datepicker input {
        font-size: 14px;
      }
    `

    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);

    const [getPageTrigger, setGetPageTrigger] = React.useState(true);

    const dispatch = useAppDispatch()
    const {
        transactionStatistic,
        isLoading,
        error
    }: TransactionStatisticSlice = useAppSelector(state => state.transactionStatisticReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)


    useEffect(() => {
        let filter: TransactionFilterData = {
            getIncome: true,
            getSales: true,
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : null,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : null
        }
        console.log(transactionStatistic)
        dispatch(getTransactionalStatistic(filter));
    }, [message, getPageTrigger])

    const reset = () => {
        setDateTo(null);
        setDateFrom(null);
        setGetPageTrigger(!getPageTrigger);
    };

    let currencyIncome = transactionStatistic ? RUB(transactionStatistic.income) : RUB('0');
    let currencyExpenses = transactionStatistic ? RUB(transactionStatistic.expenses) : RUB('0');
    let currencyIncomePercent = currencyIncome.divide(currencyIncome.add(currencyExpenses).value).multiply(100);
    let currencyExpensesPercent = currencyExpenses.divide(currencyIncome.add(currencyExpenses).value).multiply(100);
    let currencySum = currencyIncome.subtract(currencyExpenses)

    const IncomeExpensesDiagramOptions = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Расходы/Доходы"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                {y: currencyIncomePercent.value, label: "Доходы"},
                {y: currencyExpensesPercent.value, label: "Расходы"}
            ]
        }]
    }

    const templateBarDiagramOptions = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Наиболее популярные продукты/услуги"
        },
        axisX: {
            title: "Шаблон",
            reversed: true,
        },
        axisY: {
            title: "Количество",
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: transactionStatistic?.templateInfo
                .map((t) => {
                    return { y:  t.count, label: t.templateName }
                })
        }]
    }

    const typeBarDiagramOptions = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Количество затрачиваемых расходных материалов"
        },
        axisX: {
            title: "Расходный материал",
            reversed: true,
        },
        axisY: {
            title: "Количество",
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: transactionStatistic?.typeInfo
                .map((t) => {
                    return { y:  t.count, label: t.typeName }
                })
        }]
    }


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
                    pl: 2,
                    height: '158px'
                }}>
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
            {
                transactionStatistic ?
                    <Box sx={{
                        height: "100%",
                        width: "70%",
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                        ml: 3,
                        mt: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            height: '158px'
                        }}>
                            <Box sx={{
                                boxShadow: 2,
                                borderRadius: 2,
                                width: "30%",
                                height: '100%',
                                pl: 2
                            }}>
                                <Typography variant='h6'>Итог</Typography>
                                <Box sx={{
                                    mt: '10%'
                                }}>
                                    <Typography variant='h6' sx={{
                                        fontSize: '30px',
                                        color: currencySum.value < 0 ? 'red' : 'green'
                                    }}>
                                        {currencySum.format()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                boxShadow: 2,
                                borderRadius: 2,
                                width: "30%",
                                height: '100%',
                                pl: 2,
                                ml: 3
                            }}>
                                <Typography variant='h6'>Доход</Typography>
                                <Box sx={{
                                    mt: '10%'
                                }}>
                                    <Typography variant='h6' sx={{
                                        fontSize: '30px',
                                        color: 'green'
                                    }}>
                                        {currencyIncome.format()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                boxShadow: 2,
                                borderRadius: 2,
                                width: "30%",
                                height: '100%',
                                pl: 2,
                                ml: 3
                            }}>
                                <Typography variant='h6'>Расход</Typography>
                                <Box sx={{
                                    mt: '10%'
                                }}>
                                    <Typography variant='h6' sx={{
                                        fontSize: '30px',
                                        color: 'red'
                                    }}>
                                        {'-' + currencyExpenses.format()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            mt: 2
                        }}>
                            <CanvasJSChart options = {IncomeExpensesDiagramOptions}/>
                        </Box>
                        <Box sx={{
                            mt: 5
                        }}>
                            <CanvasJSChart options = {templateBarDiagramOptions}/>
                        </Box>
                        <Box sx={{
                            mt: 5
                        }}>
                            <CanvasJSChart options = {typeBarDiagramOptions}/>
                        </Box>
                        <Box sx={{
                            flexGrow: 3,
                        }}>

                        </Box>
                    </Box>
                    : null
            }
        </Container>
    );
};

export default TransactionalDiagrams;