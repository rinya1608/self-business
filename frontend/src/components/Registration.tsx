import {
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions, DialogContent,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IAuthData} from "../models/IAuthData";
import {auth, reg} from "../api/auth";
import {IRegData} from "../models/IRegData";

function Registration() {

    const [nameError, setNameError] = useState({helperText:'', error:false});
    const [emailError, setEmailError] = useState({helperText:'', error:false});
    const [passwordError, setPasswordError] = useState({helperText:'', error:false});
    const [confirmError, setConfirmError] = useState({helperText:'', error:false});


    const [dialog, setDialog] = useState(false);


    const dispatch = useAppDispatch()
    const {message, isLoading, error} = useAppSelector(state => state.messageReducer)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let email = data.get("email");
        let name = data.get("name");
        let password = data.get("password");
        let confirmPassword = data.get("confirmPassword");
        
        if (email && password && confirmPassword && name
            && password === confirmPassword) {
            const regData : IRegData = {
                email: email.toString(),
                name: name.toString(),
                password: password.toString()
            }
            dispatch(reg(regData))
            if (message)
                console.log(message);
                setDialog(true);
        }
        else {
            if (!email) setEmailError({helperText: 'Поле не должно быть пустым', error: true})
            if (!name) setNameError({helperText: 'Поле не должно быть пустым', error: true})
            if (!password) setPasswordError({helperText: 'Поле не должно быть пустым', error: true})
            if (!confirmPassword) setConfirmError({helperText: 'Поле не должно быть пустым', error: true})
            else if (password != confirmPassword) setConfirmError({helperText: 'Пароли не совпадают', error: true})
        }
    };

    const forward = () => {window.location.href = '/';}

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
                                Sign up
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
                                    onChange={() => setEmailError({helperText:'', error:false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    helperText={nameError.helperText}
                                    error={nameError.error}
                                    onChange={() => setNameError({helperText:'', error:false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                />
                                <TextField
                                    helperText={passwordError.helperText}
                                    error={passwordError.error}
                                    onChange={() => setPasswordError({helperText:'', error:false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    helperText={confirmError.helperText}
                                    error={confirmError.error}
                                    onChange={() => setConfirmError({helperText:'', error:false})}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm password"
                                    type="password"
                                    id="confirmPassword"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign up
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Dialog onClose={() => setDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
                <DialogContent>
                    Аккаунт успешно зарегестрирован!
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