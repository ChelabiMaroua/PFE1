import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, useTheme } from '@mui/material'
import Controls from "./controls/Controls";
import { styled } from '@mui/system';


// const useStyles = styled(theme => ({
//     dialog: {
//         padding: theme.spacing(2),
//         position: 'absolute',
//         top: theme.spacing(5)
//     },
//     dialogTitle: {
//         textAlign: 'center'
//     },
//     dialogContent: {
//         textAlign: 'center'
//     },
//     dialogAction: {
//         justifyContent: 'center'
//     },
//     titleIcon: {
//         backgroundColor: theme.palette.secondary.light,
//         color: theme.palette.secondary.main,
//         '&:hover': {
//             backgroundColor: theme.palette.secondary.light,
//             cursor: 'default'
//         },
//         '& .MuiSvgIcon-root': {
//             fontSize: '8rem',
//         }
//     }
// }))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    // const classes = useStyles()
    const theme = useTheme()
    const dialogStyle = {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }

    const dialogTitleStyle = {
        textAlign: 'center'
    }

    const dialogContentStyle = {
        textAlign: 'center'
    }

    const dialogActionStyle = {
        justifyContent: 'center'
    }

    const titleIconStyle = {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }

    return (
        <Dialog open={confirmDialog.isOpen} style={{ paper: dialogStyle }}>
            <DialogTitle style={dialogTitleStyle}>
            </DialogTitle>
            <DialogContent style={dialogContentStyle}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions style={dialogActionStyle}>
                <Controls.Button
                    text="No"
                    color="primary"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
