import React, {useEffect, useState} from 'react';
import {Box, Button, Container, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IAuthData} from "../models/IAuthData";
import {auth, getCurrentUser} from "../api/auth";

function Login() {

    const [emailError, setEmailError] = useState({helperText:'', error:false});
    const [passwordError, setPasswordError] = useState({helperText:'', error:false});

    const dispatch = useAppDispatch()
    const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)

    useEffect(() => {
        if (user != null) window.location.href = '/';
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let email = data.get("email");
        let password = data.get("password");
        if (email && password) {
            console.log("email" + email)
            const authData : IAuthData = {
                email: email.toString(),
                password: password.toString()
            }
            dispatch(auth(authData))
            if (user != null)
                window.location.href = '/';
        }
        else {
            console.log("email" + email)
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
                                Sign in
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;