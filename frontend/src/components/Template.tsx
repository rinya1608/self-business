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
    Pagination,
} from "@mui/material";
import CakeIcon from '@mui/icons-material/Cake';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {TemplateSlice} from "../store/reducers/TemplateSlice";
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import {MessageState} from "../store/reducers/MesageSlice";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {deleteTemplate, getPageWithTemplates} from "../api/template";
import {ITemplate} from "../models/ITemplate";
import {addSale} from "../api/sale";
import {ITemplateData} from "../models/ITemplateData";
import {ISaleData} from "../models/ISaleData";

const Template = () => {

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [templateDialog, setTemplateDialog] = useState(false);
    const [resourceDialog, setResourceDialog] = useState(false);
    const [template, setTemplate] = useState<ITemplate | null>(null);

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
        dispatch(addSale(data))
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
                        <Button onClick={() => sale(el)}>sell</Button>
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
                        primary={el.name}/>
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
                    width: '50%',
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
        </Container>
    );
};

export default Template;