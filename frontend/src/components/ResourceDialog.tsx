import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IResourceType} from "../models/IResourceType";
import {FieldType} from "../types/FieldType";
import {ResourceTypeState} from "../store/reducers/ResourceTypeSlice";
import {IResource} from "../models/IResource";
import resourceType from "./ResourceType";
import {IResourceData} from "../models/IResourceData";
import {addResource, updateResource} from "../api/resource";
import {isNumber} from "../utils/TypeUtils";


interface Props {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    resource?: IResource | null;
}

const ResourceDialog = ({open, handleOpen, handleClose, resource = null}: Props) => {


    const [count, setCount] = useState<FieldType<number>>({value: 0, error: false, helperText: ''});
    const [unitPrice, setUnitPrice] = useState<FieldType<string>>({
        value: '0.00',
        error: false,
        helperText: ''});
    const [sum, setSum] = useState<FieldType<string>>({
        value: '0.00',
        error: false,
        helperText: ''});
    const [type, setType] = useState<FieldType<IResourceType | undefined>>({
        value: undefined,
        error: false,
        helperText: ''
    });


    const dispatch = useAppDispatch()
    const {resourceTypePage, isLoading, error}: ResourceTypeState = useAppSelector(state => state.resourceTypeReducer)

    useEffect(() => {
        if (resource) {
            setCount({value: resource.count, error: false, helperText: ''});
            setUnitPrice({value: String(resource.unitPrice), error: false, helperText: ''});
            setType({value: resource.type, error: false, helperText: ''});
        }

    }, [resource])


    const add = () => {
        if (validateField() && type.value) {
            let data: IResourceData = {
                count: count.value,
                unitPrice: parseFloat(unitPrice.value),
                typeId: type.value.id
            };
            console.log(data)
            dispatch(addResource(data))
            close();
        }
    };

    const update = () => {
        console.log("add")
        if (resource != null && validateField() && type.value) {
            let data: IResourceData = {
                count: count.value,
                unitPrice: parseFloat(unitPrice.value),
                typeId: type.value.id
            };
            dispatch(updateResource(resource.id, data));
            close();
        }
    };

    const validateField = (): boolean => {
        if (!type.value) setType({value: undefined, error: true, helperText: 'Выберите тип'});
        if (!count.value) setCount({value: 0, error: true, helperText: 'Поле не должно быть пустым'});
        if (!unitPrice.value) setUnitPrice({value: '', error: true, helperText: 'Поле не должно быть пустым'});
        if (!sum.value) setSum({value: '', error: true, helperText: 'Поле не должно быть пустым'});
        return true;
    }

    const close = () => {
        setCount({value: 0, error: false, helperText: ''});
        setUnitPrice({value: '0', error: false, helperText: ''});
        setSum({value: '0', error: false, helperText: ''});
        setType({value: undefined, error: false, helperText: ''});
        handleClose();
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setCount({value: value, error: false, helperText: ''});
            setUnitPrice({value: String(parseFloat(sum.value) / value), error: false, helperText: ''});
        } else setCount({value: count.value, error: true, helperText: 'Значение должно быть числовым'});
    }

    const handleUnitPriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value;
        if (isNumber(value)) {
            setUnitPrice({value: value, error: false, helperText: ''});
            if (!value.endsWith('.') && value)
                setSum({value: String((count.value * parseFloat(value)).toFixed(2)), error: false, helperText: ''});
        } else setUnitPrice({value: unitPrice.value, error: true, helperText: 'Значение должно быть числовым'});
    }

    const handleSumChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value;
        if (isNumber(value)) {
            setSum({value: value, error: false, helperText: ''});
            if (!value.endsWith('.') && value)
                setUnitPrice({
                    value: String((parseFloat(value) / count.value).toFixed(2)),
                    error: false,
                    helperText: ''
                });
        } else setSum({value: sum.value, error: true, helperText: 'Значение должно быть числовым'});
    }

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        let resourceType = resourceTypePage?.content.find(o => o.id === parseInt(event.target.value));
        setType({value: resourceType, error: false, helperText: ''});
    }

    var resourceTypeSelectItems = resourceTypePage?.content.map((el) => {
        return (
            <MenuItem value={el.id}>{el.name}</MenuItem>
        )
    })

    return (
        <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add resource</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={count.error}
                    helperText={count.helperText}
                    value={count.value}
                    onChange={handleCountChange}
                    margin="dense"
                    id="count"
                    label="Count"
                    type="text"
                    fullWidth
                />
                <FormControl
                    margin="dense"
                    fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={type.value?.name}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        {
                            resourceTypeSelectItems
                        }
                    </Select>
                </FormControl>
                {
                    type.value ?
                        <Box>
                            <TextField
                                value={unitPrice.value}
                                error={unitPrice.error}
                                helperText={unitPrice.helperText}
                                onChange={handleUnitPriceChange}
                                margin="dense"
                                id="unitPrice"
                                label={"Price for " + type.value?.unit}
                                type="text"
                                fullWidth
                            />
                            <TextField
                                value={sum.value}
                                error={sum.error}
                                helperText={sum.helperText}
                                onChange={handleSumChange}
                                margin="dense"
                                id="sum"
                                label={"Sum"}
                                type="text"
                                fullWidth
                            />
                        </Box>
                        : null
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>
                    Cancel
                </Button>
                <Button onClick={resource != null ? update : add}>
                    {resource != null ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResourceDialog;