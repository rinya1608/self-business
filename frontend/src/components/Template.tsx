import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Pagination, useMediaQuery,
} from "@mui/material";
import CakeIcon from '@mui/icons-material/Cake';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {TemplateSlice} from "../store/reducers/TemplateSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {MessageState} from "../store/reducers/MesageSlice";
import {deleteTemplate, getPageWithTemplates} from "../api/template";
import {ITemplate} from "../models/ITemplate";
import {addSale} from "../api/sale";
import {ISaleData} from "../models/ISaleData";
import {RUB} from "../constants/CurrencyConstants";
import {CustomSnackBar, SnackBarParams} from "./CustomSnackBar";
import TemplateDialog from "./TemplateDialog";

const Template = () => {

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [templateDialog, setTemplateDialog] = useState(false);
    const [resourceDialog, setResourceDialog] = useState(false);
    const [template, setTemplate] = useState<ITemplate | null>(null);
    const [sbParams, setSbParams] = useState<SnackBarParams>({open: false, severity: 'error', message: 'me'});

    const isMobile = useMediaQuery('(max-width:800px)');


    const dispatch = useAppDispatch()
    const {templatePage, isLoading, error}: TemplateSlice = useAppSelector(state => state.templateReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    useEffect(() => {
        changePageCount();
    }, [templatePage])

    useEffect(() => {
        if (page != 0) dispatch(getPageWithTemplates(page, 10));
    }, [page, message])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const changePageCount = () => {
        if (templatePage != null) {
            setPageCount(templatePage.totalPages);
        }
        if (page > pageCount || (pageCount === 1)) setPage(pageCount);
    };

    const sale = (template: ITemplate) => {
        var data: ISaleData = {
            templateId: template.id
        }
        dispatch(addSale(data)).then((r) => {
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
        })
    }

    const handleDelete = (id: number) => {
        dispatch(deleteTemplate(id))
    }

    const templateHandleOpen = () => {
        setTemplateDialog(true);
    };

    const templateHandleSetAndOpen = (el: ITemplate) => {
        setTemplate(el);
        setTemplateDialog(true);
    };

    const templateHandleClose = () => {
        setTemplateDialog(false);
    };


    var templateItems = templatePage?.content.map((el) => {
        return (
            <ListItem
                key={el.id}
                secondaryAction={
                    <Box>
                        <Button onClick={() => sale(el)}>продать</Button>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(el.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>

                }
                disablePadding
            >
                <ListItemButton
                    onClick={() => templateHandleSetAndOpen(el)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <CakeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={el.name}
                        secondary={RUB(el.cost).format()}
                    />
                </ListItemButton>
            </ListItem>
        )
    })

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
                    width: isMobile ? '100%' : '50%',
                    m: 'auto'
                }}>
                    {
                        templateItems
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
            <TemplateDialog open={templateDialog} handleOpen={templateHandleOpen} handleClose={templateHandleClose} template={template}/>
            <CustomSnackBar params={sbParams} handleClose={() => setSbParams({
                open: false,
                severity: 'error',
                message: ''
            })}/>
        </Container>
    );
};

export default Template;