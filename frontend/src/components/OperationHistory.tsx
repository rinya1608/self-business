import React, {useEffect, useState} from 'react';
import {Avatar, Box, Container, List, ListItem, ListItemAvatar, ListItemText, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {TransactionSlice} from "../store/reducers/TransactionSlice";
import CategoryIcon from '@mui/icons-material/Category';
import {MessageState} from "../store/reducers/MesageSlice";
import {IResourceType} from "../models/IResourceType";
import {getPageWithTransaction} from "../api/transaction";

const OperationHistory = () => {

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);

    const dispatch = useAppDispatch()
    const {transactionPage, isLoading, error}: TransactionSlice = useAppSelector(state => state.transactionReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    useEffect(() => {
        changePageCount();
    }, [transactionPage])

    useEffect(() => {
        dispatch(getPageWithTransaction(page, 10));
    }, [page, message])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const changePageCount = () => {
        if (transactionPage != null) {
            setPageCount(transactionPage.totalPages);
        }
        if (page > pageCount || (pageCount === 1)) setPage(pageCount);
    };

    const transactionItems = transactionPage?.content.map((el) => {
        return (
            <ListItem
                key={el.id}
                disablePadding
            >
                <ListItemAvatar>
                    <Avatar>
                        <CategoryIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={el.resource.type.name}/>
                <ListItemText
                    primary={el.sum}/>
            </ListItem>
        )
    });

    return (
        <Container style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0
        }}>
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
        </Container>
    );
};

export default OperationHistory;