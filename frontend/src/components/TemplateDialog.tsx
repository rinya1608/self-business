import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getPageWithResourceTypes} from "../api/resourceType";
import {IResourceType} from "../models/IResourceType";
import {FieldType} from "../types/FieldType";
import resourceType from "./ResourceType";
import {ITemplate} from "../models/ITemplate";
import {ITemplateData} from "../models/ITemplateData";
import {IIngredientData} from "../models/IIngredientData";
import {addTemplate, updateTemplate} from "../api/template";
import {ResourceTypeState} from "../store/reducers/ResourceTypeSlice";
import {MessageState} from "../store/reducers/MesageSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {isNumber} from "../utils/TypeUtils";
import {TEMPLATE} from "../constants/Urls";


interface Props {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    template?: ITemplate | null
}

interface IngredientField {
    count: FieldType<number>,
    resourceType: FieldType<IResourceType | undefined>
}

const TemplateDialog = ({open, handleOpen, handleClose, template = null}: Props) => {

    const dispatch = useAppDispatch()
    const {resourceTypePage, isLoading, error}: ResourceTypeState = useAppSelector(state => state.resourceTypeReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)


    const [name, setName] = useState<FieldType<string>>({value: '', error: false, helperText: ''});
    const [cost, setCost] = useState<FieldType<string>>({value: '0', error: false, helperText: ''});
    const [ingredients, setIngredients] = useState<IngredientField[] | null>(null);

    useEffect(() => {
        if (template != null) {
            setName({value: template.name, error: false, helperText: ''})
            setCost({value: template.cost, error: false, helperText: ''})
            let tempIngredients: IngredientField[] = []
            template.ingredients.forEach(i => {
                tempIngredients = [
                    ...tempIngredients,
                    {
                        count: {value: i.count, error: false, helperText: ''},
                        resourceType: {value: i.resourceType, error: false, helperText: ''}
                    }
                ]
            })
            setIngredients(tempIngredients)
        }
        else setIngredients([])
    }, [template])

    useEffect(() => {
        dispatch(getPageWithResourceTypes(1, 99999999));
    }, [message])


    const add = () => {
        if (validateField() && ingredients) {
            try {
                const data: ITemplateData = {
                    name: name.value,
                    cost: cost.value,
                    ingredients: ingredients.map(el => {
                        if (el.resourceType.value) {
                            let ingredient: IIngredientData = {
                                count: el.count.value,
                                resourceTypeId: el.resourceType.value.id
                            }
                            return ingredient;
                        }
                        throw new Error("null");
                    })
                };
                if (template) {
                    dispatch(updateTemplate(template.id, data));
                }
                else dispatch(addTemplate(data));
                close();
                window.location.href = TEMPLATE
            } catch (e) {
                console.log(e)
            }
        }
    };

    const update = () => {
    };

    const close = () => {
        setName({value: '', error: false, helperText: ''});
        setCost({value: '', error: false, helperText: ''});
        handleClose();
    }

    const addIngredientField = () => {
        if (ingredients) {
            setIngredients([
                ...ingredients,
                {
                    count: {value: 0, error: false, helperText: ''},
                    resourceType: {value: undefined, error: false, helperText: ''}
                }
            ])
        }
    }

    const deleteIngredientField = (ingredient: IngredientField) => {
        if (ingredients) setIngredients(ingredients.filter(el => el != ingredient))
    }

    const validateField = (): boolean => {
        if (!name.value) setName({value: name.value, error: true, helperText: 'Поле не должно быть пустым'});
        return true;
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        if (ingredients) {
            let value = parseFloat(event.target.value);
            let ingredientField = ingredients.at(index);
            if (ingredientField) {
                if (!isNaN(value)) {
                    ingredientField.count = {value: value, error: false, helperText: ''};
                } else ingredientField.count = {
                    value: ingredientField.count.value,
                    error: true,
                    helperText: 'Значение должно быть числовым'
                }
            }
            setIngredients([...ingredients])
        }
    }

    const handleCostChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value;
        if (isNumber(value)) {
            setCost({value: value, error: false, helperText: ''});
        } else setCost({value: cost.value, error: true, helperText: 'Значение должно быть числовым'});
    }

    const handleTypeChange = (event: SelectChangeEvent<string>, index: number) => {
        if (ingredients) {
            let resourceType = resourceTypePage?.content.find(o => o.id === parseInt(event.target.value));
            let ingredientField = ingredients.at(index);
            if (ingredientField) {
                ingredientField.resourceType = {value: resourceType, error: false, helperText: ''}
            }
            setIngredients([...ingredients])
        }
    }

    const getResourceTypeSelectItems = (ingredient: IngredientField): (JSX.Element | undefined)[] | undefined => {
        return resourceTypePage?.content.map((el) => {
            if (ingredients && !ingredients.filter(el => el != ingredient).map(field => field.resourceType.value).includes(el)) {
                return (
                    <MenuItem value={el.id}>{el.name}</MenuItem>
                )
            }
        });
    }

    const ingredientsFields = ingredients?.map((el, index) => {
        return (
            <Box sx={{
                display: 'flex'
            }}>
                <FormControl
                    fullWidth
                    margin="dense">
                    <InputLabel id="demo-simple-select-helper-label">Тип</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={el.resourceType.value ? String(el.resourceType.value.id) : ''}
                        label="Тип"
                        onChange={event => handleTypeChange(event, index)}
                    >
                        {
                            getResourceTypeSelectItems(el)
                        }
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    error={el.count.error}
                    helperText={el.count.helperText}
                    value={el.count.value}
                    onChange={event => handleCountChange(event, index)}
                    margin="dense"
                    id="count"
                    label={el.resourceType.value ? el.resourceType.value.unit : "Кол-во"}
                    type="text"
                    fullWidth
                    sx={{ml: 2}}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => deleteIngredientField(el)} sx={{m: 1}}>
                    <DeleteIcon sx={{m: 1}}/>
                </IconButton>
            </Box>
        )
    });

    return (
        <Dialog open={open} onClose={handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить продукт/услугу</DialogTitle>
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                ₽
                            </InputAdornment>
                        ),
                    }}
                    autoFocus
                    error={cost.error}
                    helperText={cost.helperText}
                    value={cost.value}
                    onChange={handleCostChange}
                    margin="dense"
                    id="cost"
                    label="Цена"
                    type="text"
                    fullWidth
                />
                <DialogTitle id="-title">Ингредиенты</DialogTitle>
                {
                    ingredientsFields
                }
                {
                    ingredients && ingredients.length != resourceTypePage?.totalElements ?
                        <Button onClick={addIngredientField}>
                            Добавить ингредиент
                        </Button>
                        : null
                }
            </DialogContent>
            <DialogActions>

                <Button onClick={close}>
                    Отменить
                </Button>
                <Button onClick={add}>
                    {template ? "Сохранить" : "Создать"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateDialog;