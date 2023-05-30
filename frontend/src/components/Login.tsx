import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid, IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IAuthData} from "../models/IAuthData";
import {auth, getCurrentUser} from "../api/auth";
import {MAIN} from "../constants/Urls";
import {CustomSnackBar, SnackBarParams} from "./CustomSnackBar";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function Login() {

    const [emailError, setEmailError] = useState({helperText: '', error: false});
    const [passwordError, setPasswordError] = useState({helperText: '', error: false});

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const dispatch = useAppDispatch()
    const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)

    const [sbParams, setSbParams] = useState<SnackBarParams>({open: false, severity: 'error', message: 'me'});

    useEffect(() => {
        dispatch(getCurrentUser()).then((r) => {
            if (r && r.body) window.location.href = MAIN;
        })
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let email = data.get("email");
        let password = data.get("password");
        if (email && password) {
            const authData: IAuthData = {
                email: email.toString(),
                password: password.toString()
            }
            dispatch(auth(authData)).then((r) => {
                if (r && r.error)
                    setSbParams({open: true, severity: 'error', message: r.error.message});
                else if (r && r.body) window.location.href = MAIN;
            })
        } else {
            if (!email) setEmailError({helperText: 'Поле не должно быть пустым', error: true})
            if (!password) setPasswordError({helperText: 'Поле не должно быть пустым', error: true})
        }
    };

    return (
        <Container maxWidth="lg">
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
                                Вход
                            </Typography>
                            <Box
                                component="form"
                                method=""
                                noValidate
                                sx={{mt: 1, width: '70%'}}
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Войти
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/registration" variant="body2">
                                            {"Нет аккаунта? Зарегистрироваться"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {
                error ? <CustomSnackBar params={sbParams} handleClose={() => setSbParams({
                    open: false,
                    severity: 'error',
                    message: ''
                })}/> : null
            }
        </Container>
    );
};

export default Login;