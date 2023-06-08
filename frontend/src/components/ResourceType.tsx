import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Pagination, Typography, useMediaQuery
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ResourceTypeState} from "../store/reducers/ResourceTypeSlice";
import {deleteResourceType, getPageWithResourceTypes} from "../api/resourceType";
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import {MessageState} from "../store/reducers/MesageSlice";
import {IResourceType} from "../models/IResourceType";
import ResourceTypeDialog from "./ResourceTypeDialog";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ResourceDialog from "./ResourceDialog";

const ResourceType = () => {

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [resourceTypeDialog, setResourceTypeDialog] = useState(false);
    const [resourceDialog, setResourceDialog] = useState(false);
    const [resourceType, setResourceType] = useState<IResourceType | null>(null);

    const isMobile = useMediaQuery('(max-width:800px)');

    const dispatch = useAppDispatch()
    const {resourceTypePage, isLoading, error}: ResourceTypeState = useAppSelector(state => state.resourceTypeReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    useEffect(() => {
        changePageCount();
    }, [resourceTypePage])

    useEffect(() => {
        if (page > 0) dispatch(getPageWithResourceTypes(page, 10));
    }, [page, message])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const changePageCount = () => {
        if (resourceTypePage != null) {
            setPageCount(resourceTypePage.totalPages);
        }
        if (page > pageCount || (pageCount === 1)) setPage(pageCount);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteResourceType(id))
    }

    const resourceTypeHandleOpen = () => {
        setResourceTypeDialog(true);
    };

    const resourceTypeHandleSetAndOpen = (el: IResourceType) => {
        setResourceType(el);
        setResourceTypeDialog(true);
    };

    const resourceTypeHandleClose = () => {
        setResourceTypeDialog(false);
    };

    const resourceHandleOpen = (el: IResourceType) => {
        setResourceType(el);
        setResourceDialog(true);
    };

    const resourceHandleClose = () => {
        setResourceDialog(false);
    };

    var resourceTypeItems = resourceTypePage?.content.map((el) => {
        return (
            <ListItem
                key={el.id}
                secondaryAction={
                    <Box>
                        <IconButton edge="end" aria-label="add" color="primary" onClick={() => resourceHandleOpen(el)}>
                            <AddBoxIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(el.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>

                }
                disablePadding
            >
                <ListItemButton
                    onClick={() => resourceTypeHandleSetAndOpen(el)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <CategoryIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={el.name}
                        secondary={el.count + ' ' + el.unit}
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
                    width: isMobile ? '100%' : "50%",
                    m: 'auto'
                }}>
                    {
                        resourceTypeItems
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
            <ResourceTypeDialog open={resourceTypeDialog} handleOpen={resourceTypeHandleOpen}
                                handleClose={resourceTypeHandleClose} resourceType={resourceType}/>
            <ResourceDialog open={resourceDialog} handleOpen={resourceHandleOpen} handleClose={resourceHandleClose} resourceType={resourceType}/>
        </Container>
    );
};

export default ResourceType;