import React from 'react';
import {Box, Container, Typography, useMediaQuery,} from "@mui/material";

const Template = () => {

    const tqr: string = require("../img/tqr.svg").default;

    const isMobile = useMediaQuery('(max-width:800px)');


    return (
        <Container style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'normal',
            padding: 0
        }}>
            <Typography sx={{
                mt: 5
            }} variant="h6">По всем вопросам обращаться в telegram канал <a href={"https://t.me/renselfbusiness"}>ссылка</a></Typography>
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