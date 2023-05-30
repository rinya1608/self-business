import {
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    Grid, IconButton, InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {reg} from "../api/auth";
import {IRegData} from "../models/IRegData";
import {LOGIN, MAIN} from "../constants/Urls";
import {MessageState} from "../store/reducers/MesageSlice";
import {IError} from "../models/IError";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function Registration() {

    const [nameError, setNameError] = useState({helperText: '', error: false});
    const [emailError, setEmailError] = useState({helperText: '', error: false});
    const [passwordError, setPasswordError] = useState({helperText: '', error: false});
    const [confirmError, setConfirmError] = useState({helperText: '', error: false});


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const [dialog, setDialog] = useState(false);


    const dispatch = useAppDispatch()
    const {message, isLoading, error}: MessageState = useAppSelector(state => state.messageReducer)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let email = data.get("email");
        let name = data.get("name");
        let password = data.get("password");
        let confirmPassword = data.get("confirmPassword");

        if (email && password && confirmPassword && name
            && password === confirmPassword) {
            const regData: IRegData = {
                email: email.toString(),
                name: name.toString(),
                password: password.toString()
            }
            dispatch(reg(regData)).then((r) => {
                if (r) {
                    if (r.body)
                        setDialog(true);
                    else if (r.error) {
                        apiValidation(r.error);
                    }
                }
            })

        } else {
            if (!email) setEmailError({helperText: 'Поле не должно быть пустым', error: true})
            if (!name) setNameError({helperText: 'Поле не должно быть пустым', error: true})
            if (!password) setPasswordError({helperText: 'Поле не должно быть пустым', error: true})
            if (!confirmPassword) setConfirmError({helperText: 'Поле не должно быть пустым', error: true})
            else if (password != confirmPassword) setConfirmError({helperText: 'Пароли не совпадают', error: true})
        }
    };

    const apiValidation = (error: IError) => {
        let validErrors = error.validErrors;
        if (validErrors) validErrors.forEach((e) => {
            let eName = e.name.toLowerCase();
            let eMessage = e.message;
            if ('name' === eName) setNameError({helperText: eMessage, error: true});
            if ('email' === eName) setEmailError({helperText: eMessage, error: true})
            if ('password' === eName) setPasswordError({helperText: eMessage, error: true})
        })
    }

    const forward = () => {
        window.location.href = LOGIN;
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8
                }}
            >
                <Grid container
                      direction="column"
                      alignItems="center"
                      justifyContent="center">
                    <CssBaseline/>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Регистрация
                            </Typography>
                            <Box
                                component="form"
                                method=""
                                noValidate
                                sx={{mt: 1}}
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    helperText={emailError.helperText}
                                    error={emailError.error}
                                    onChange={() => setEmailError({helperText: '', error: false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    helperText={nameError.helperText}
                                    error={nameError.error}
                                    onChange={() => setNameError({helperText: '', error: false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Имя"
                                    name="name"
                                    autoComplete="name"
                                />
                                <TextField
                                    helperText={passwordError.helperText}
                                    error={passwordError.error}
                                    onChange={() => setPasswordError({helperText: '', error: false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    color={showPassword ? "primary" : "default"}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    helperText={confirmError.helperText}
                                    error={confirmError.error}
                                    onChange={() => setConfirmError({helperText: '', error: false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Пароль еще раз"
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    color={showConfirmPassword ? "primary" : "default"}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Зарегистрироваться
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Dialog onClose={() => setDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
                <DialogContent>
                    Аккаунт успешно зарегистрирован!
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={forward} color="primary">
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Registration;