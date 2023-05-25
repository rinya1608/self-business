import {Alert, AlertColor, Snackbar} from "@mui/material";


export interface SnackBarParams {
    open: boolean,
    severity: AlertColor,
    message: string
}
interface Props {
    params: SnackBarParams,
    handleClose: () => void
}

export const CustomSnackBar = ({params, handleClose}: Props) => {
    return (
        <Snackbar open={params.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={params.severity} sx={{width: '100%'}}>
                {params.message}
            </Alert>
        </Snackbar>
    );
};