import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {addResourceType, updateResourceType} from "../api/resourceType";
import {IResourceTypeData} from "../models/IResourceTypeData";
import {IResourceType} from "../models/IResourceType";
import {FieldType} from "../types/FieldType";
import {MAIN, TYPE} from "../constants/Urls";


interface Props {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    resourceType?: IResourceType | null
}

const ResourceTypeDialog = ({open, handleOpen, handleClose, resourceType = null}: Props) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState<FieldType<string>>({value: '', error: false, helperText: ''});
    const [unit, setUnit] = useState<FieldType<string>>({value: '', error: false, helperText: ''});

    useEffect(() => {
        if (resourceType != null) {
            setName({value: resourceType.name, error: false, helperText: ''});
            setUnit({value: resourceType.unit, error: false, helperText: ''});
        }
    }, [resourceType])


    const add = () => {
        if (validateField()) {
            const data: IResourceTypeData = {
                name: name.value,
                unit: unit.value
            };
            dispatch(addResourceType(data));
            close();
            window.location.href = TYPE
        }
    };

    const update = () => {
        if (resourceType != null && validateField()) {
            const data: IResourceTypeData = {
                name: name.value,
                unit: unit.value
            };
            dispatch(updateResourceType(resourceType.id, data));
            close();
            window.location.href = TYPE
        }
    };

    const close = () => {
        if (resourceType != null) {
            setName({value: resourceType.name, error: false, helperText: ''});
            setUnit({value: resourceType.unit, error: false, helperText: ''});
        }
        else {
            setName({value: '', error: false, helperText: ''});
            setUnit({value: '', error: false, helperText: ''});
        }
        handleClose();
    }

    const validateField = (): boolean => {
        if (!name.value) setName({value: name.value, error: true, helperText: 'Поле не должно быть пустым'});
        if (!unit.value) setUnit({value: unit.value, error: true, helperText: 'Поле не должно быть пустым'});
        return !!(name.value && unit.value);
    }

    return (
        <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{resourceType != null ? 'Изменить' : 'Добавить'} расходный материал</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={name.error}
                    helperText={name.helperText}
                    value={name.value}
                    onChange={(e) => setName({value: e.target.value, error: false, helperText: ''})}
                    margin="dense"
                    id="name"
                    label="Название"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={unit.value}
                    error={unit.error}
                    helperText={unit.helperText}
                    onChange={(e) => setUnit({value: e.target.value, error: false, helperText: ''})}
                    margin="dense"
                    id="unit"
                    label="Ед. измерения"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>
                    Отменить
                </Button>
                <Button onClick={resourceType != null ? update : add}>
                    {resourceType != null ? 'Сохранить' : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResourceTypeDialog;