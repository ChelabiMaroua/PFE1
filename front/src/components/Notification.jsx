import React from 'react'
import { styled } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@emotion/react';


// const useStyles = styled(theme => ({
//     root: {
//         top: theme.spacing(9)
//     }
// }))

export default function Notification(props) {

    const { notify, setNotify } = props;
    // const classes = useStyles()
    const theme = useTheme()
    const rootStyle = {
        top: theme.spacing(9)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            style={rootStyle}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
