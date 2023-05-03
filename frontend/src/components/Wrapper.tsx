import React from 'react';
import {Box} from "@mui/material";
import Header from "./Header";

type Props = {
    children: JSX.Element,
};
const Wrapper = ({ children }: Props) => {
    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',

        }}>
            <Box>
                <Header/>
            </Box>
            <Box sx={{
                flexGrow: 3
            }}>
                {children}
            </Box>
        </Box>
    );
};

export default Wrapper;