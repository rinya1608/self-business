import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {FieldType} from "../types/FieldType";
import {ITemplate} from "../models/ITemplate";
import {getPageWithTemplates} from "../api/template";
import {MessageState} from "../store/reducers/MesageSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {ORDER} from "../constants/Urls";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {IOrder} from "../models/IOrder";
import {IOrderData} from "../models/IOrderData";
import {IOrderTemplateData} from "../models/IOrderTemplateData";
import {TemplateSlice} from "../store/reducers/TemplateSlice";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {addOrder, updateOrder} from "../api/order";


interface Props {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    order?: IOrder | null
}

interface OrderTemplateField {
    count: FieldType<number>,
    template: FieldType<ITemplate | undefined>
}

const OrderDialog = ({open, handleOpen, handleClose, order = null}: Props) => {
    const getDefaultDate = (): Date => {
        let nowDate = new Date();
        nowDate.setMinutes(nowDate.getMinutes() + 1)
        return nowDate
    }


    const dispatch = useAppDispatch()
    const {templatePage, isLoading, error}: TemplateSlice = useAppSelector(state => state.templateReducer)
    const {message}: MessageState = useAppSelector(state => state.messageReducer)

    const [date, setDate] = React.useState<Dayjs | null>(dayjs(getDefaultDate()));
    const [name, setName] = useState<FieldType<string>>({value: '', error: false, helperText: ''});
    const [contact, setContact] = useState<FieldType<string>>({value: '', error: false, helperText: ''});
    const [templates, setTemplates] = useState<OrderTemplateField[] | null>(null);


    useEffect(() => {
        if (order != null) {
            setName({value: order.clientInfo.name, error: false, helperText: ''})
            setContact({value: order.clientInfo.contact, error: false, helperText: ''})
            setDate(dayjs(new Date(order.date)))
            let tempTemplates: OrderTemplateField[] = []
            order.templates.forEach(t => {
                tempTemplates = [
                    ...tempTemplates,
                    {
                        count: {value: t.count, error: false, helperText: ''},
                        template: {value: t.template, error: false, helperText: ''}
                    }
                ]
            })
            setTemplates(tempTemplates)
        } else setTemplates([])
    }, [order, open])

    useEffect(() => {
        dispatch(getPageWithTemplates(1, 99999999));
    }, [message])


    const add = () => {
        if (validateField() && templates && date) {
            try {

                const data: IOrderData = {
                    date: date.toISOString().substring(0, date.toISOString().length - 1),
                    clientInfo: {
                        name: name.value,
                        contact: contact.value
                    },
                    templates: templates.map(el => {
                        if (el.template.value) {
                            let ingredient: IOrderTemplateData = {
                                count: el.count.value,
                                templateId: el.template.value.id
                            }
                            return ingredient;
                        }
                        throw new Error("null");
                    })
                };
                if (order) {
                    dispatch(updateOrder(order.id, data));
                } else dispatch(addOrder(data));
                close();
                window.location.href = ORDER;
            } catch (e) {
                console.log(e)
            }
        }
    };

    const close = () => {
        setDate(null);
        setName({value: '', error: false, helperText: ''});
        setContact({value: '', error: false, helperText: ''});
        handleClose();
    }

    const addTemplateField = () => {
        if (templates) {
            setTemplates([
                ...templates,
                {
                    count: {value: 0, error: false, helperText: ''},
                    template: {value: undefined, error: false, helperText: ''}
                }
            ])
        }
    }

    const deleteTemplateField = (template: OrderTemplateField) => {
        if (templates) setTemplates(templates.filter(el => el != template))
    }

    const validateField = (): boolean => {
        if (!name.value) setName({value: name.value, error: true, helperText: 'Поле не должно быть пустым'});
        return true;
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        if (templates) {
            let value = parseFloat(event.target.value);
            let templateField = templates.at(index);
            if (templateField) {
                if (!isNaN(value)) {
                    templateField.count = {value: value, error: false, helperText: ''};
                } else templateField.count = {
                    value: templateField.count.value,
                    error: true,
                    helperText: 'Значение должно быть числовым'
                }
            }
            setTemplates([...templates])
        }
    }

    const handleTemplateChange = (event: SelectChangeEvent<string>, index: number) => {
        if (templates) {
            let template = templatePage?.content.find(o => o.id === parseInt(event.target.value));
            let orderTemplateField = templates.at(index);
            if (orderTemplateField) {
                orderTemplateField.template = {value: template, error: false, helperText: ''}
            }
            setTemplates([...templates])
        }
    }

    const getTemplateSelectItems = (template: OrderTemplateField): (JSX.Element | undefined)[] | undefined => {
        return templatePage?.content.map((el) => {
            if (templates && !templates.filter(el => el != template).map(field => field.template.value).includes(el)) {
                return (
                    <MenuItem value={el.id}>{el.name}</MenuItem>
                )
            }
        });
    }



    const templateFields = templates?.map((el, index) => {
        return (
            <Box sx={{
                display: 'flex'
            }}>
                <FormControl
                    fullWidth
                    margin="dense">
                    <InputLabel id="demo-simple-select-helper-label">Продукт/услуга</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={el.template.value ? String(el.template.value.id) : ''}
                        label="Тип"
                        onChange={event => handleTemplateChange(event, index)}
                    >
                        {
                            getTemplateSelectItems(el)
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
                    label={"Кол-во"}
                    type="text"
                    fullWidth
                    sx={{ml: 2}}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTemplateField(el)} sx={{m: 1}}>
                    <DeleteIcon sx={{m: 1}}/>
                </IconButton>
            </Box>
        )
    });

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить заказ</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={name.error}
                    helperText={name.helperText}
                    value={name.value}
                    onChange={(e) => setName({value: e.target.value, error: false, helperText: ''})}
                    margin="dense"
                    id="name"
                    label="Имя заказчика"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    error={contact.error}
                    helperText={contact.helperText}
                    value={contact.value}
                    onChange={(e) => setContact({value: e.target.value, error: false, helperText: ''})}
                    margin="dense"
                    id="contact"
                    label="Контактные данные"
                    type="text"
                    fullWidth
                />
                <Box sx={{
                    width: '100%',
                    mt: 2
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={date}
                                        minDateTime={dayjs(new Date())}
                                        defaultValue={dayjs(getDefaultDate())}
                                        className={"datetimepicker"}
                                        ampm={false}
                                        label='Дата'
                                        onChange={date => setDate(date)}
                        />
                    </LocalizationProvider>
                </Box>
                <DialogTitle id="-title">Продукты/Услуги</DialogTitle>
                {
                    templateFields
                }
                {
                    templates && templates.length != templatePage?.totalElements ?
                        <Button onClick={addTemplateField}>
                            Добавить продукт/услугу
                        </Button>
                        : null
                }
            </DialogContent>
            <DialogActions>

                <Button onClick={close}>
                    Отменить
                </Button>
                <Button onClick={add}>
                    {order ? "Сохранить" : "Создать"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDialog;