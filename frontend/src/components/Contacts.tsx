import React from 'react';
import {Box, Container, Typography,} from "@mui/material";

const Template = () => {

    const tqr: string = require("../img/tqr.svg").default;


    return (
        <Container style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0
        }}>
            <Typography sx={{
                mt: 5
            }} variant="h6">По всем вопросам обращаться в telegram канал</Typography>
            <Box
                component="img"
                sx={{
                    height: 350,
                    width: 350,
                }}
                alt="The house from the offer."
                src={tqr}
            />
        </Container>
    );
};

export default Template;