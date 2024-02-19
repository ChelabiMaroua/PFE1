import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import Controls from './Controls';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

// const useStyles = styled(theme => ({
//     dialogWrapper: {
//         padding: theme.spacing(2),
//         position: 'absolute',
//         top: theme.spacing(5)
//     },
//     dialogTitle: {
//         paddingRight: "0px"
//     }
// }))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props
    // const classes = useStyles()
    const theme = useTheme()
    const dialogWrapperStyle = {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }

    const dialogTitleStyle = {
        paddingRight: "0px"
    }

    return (
        <Dialog open={openPopup} fullWidth maxWidth="xl" style={{ paper: dialogWrapperStyle }}>
            <DialogTitle style={dialogTitleStyle}>
                <div style={{ display: "flex" }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
