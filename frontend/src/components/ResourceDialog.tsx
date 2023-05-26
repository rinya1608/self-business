import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IResourceType} from "../models/IResourceType";
import {FieldType} from "../types/FieldType";
import {ResourceTypeState} from "../store/reducers/ResourceTypeSlice";
import {IResource} from "../models/IResource";
import {isNumber} from "../utils/TypeUtils";
import {addPurchase} from "../api/purchase";
import {IPurchaseData} from "../models/IPurchaseData";


interface Props {
    open: boolean,
    handleOpen: (el: IResourceType) => void,
    handleClose: () => void,
    resourceType?: IResourceType | null;
}

const ResourceDialog = ({open, handleOpen, handleClose, resourceType}: Props) => {


    const [count, setCount] = useState<FieldType<number>>({value: 0, error: false, helperText: ''});
    const [unitPrice, setUnitPrice] = useState<FieldType<string>>({
        value: '0.00',
        error: false,
        helperText: ''
    });
    const [sum, setSum] = useState<FieldType<string>>({
        value: '0.00',
        error: false,
        helperText: ''
    });

    const dispatch = useAppDispatch()

    const add = () => {
        if (validateField() && resourceType) {
            let data: IPurchaseData = {
                resource: {
                    count: count.value,
                    unitPrice: unitPrice.value,
                    typeId: resourceType.id
                }
            };
            dispatch(addPurchase(data))
            close();
        }
    };

    const validateField = (): boolean => {
        if (!count.value) setCount({value: 0, error: true, helperText: 'Поле не должно быть пустым'});
        if (!unitPrice.value) setUnitPrice({value: '', error: true, helperText: 'Поле не должно быть пустым'});
        if (!sum.value) setSum({value: '', error: true, helperText: 'Поле не должно быть пустым'});
        return true;
    }

    const close = () => {
        setCount({value: 0, error: false, helperText: ''});
        setUnitPrice({value: '0', error: false, helperText: ''});
        setSum({value: '0', error: false, helperText: ''});
        handleClose();
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value;
        let num = parseFloat(value);
        if (!isNaN(num) || !value) {
            setCount({value: num, error: false, helperText: ''});
            if (!value) {
                setSum({value: "0", error: false, helperText: ''});
                setUnitPrice({value: "0", error: false, helperText: ''});
            }
            else {
                if (unitPrice.value && parseFloat(unitPrice.value) != 0)
                    setSum({value: String(parseFloat(unitPrice.value) * num), error: false, helperText: ''});
                else setUnitPrice({value: String(parseFloat(sum.value) / num), error: false, helperText: ''});
            }
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

    return (
        <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить {resourceType?.name}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={count.error}
                    helperText={count.helperText}
                    value={count.value}
                    onChange={handleCountChange}
                    margin="dense"
                    id="count"
                    label="Количество"
                    type="text"
                    fullWidth
                />
                <Box>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₽
                                </InputAdornment>
                            ),
                        }}
                        value={unitPrice.value}
                        error={unitPrice.error}
                        helperText={unitPrice.helperText}
                        onChange={handleUnitPriceChange}
                        margin="dense"
                        id="unitPrice"
                        label={"Цена за " + resourceType?.unit}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₽
                                </InputAdornment>
                            ),
                        }}
                        value={sum.value}
                        error={sum.error}
                        helperText={sum.helperText}
                        onChange={handleSumChange}
                        margin="dense"
                        id="sum"
                        label={"Цена"}
                        type="text"
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>
                    Отменить
                </Button>
                <Button onClick={add}>
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResourceDialog;