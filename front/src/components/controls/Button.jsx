import React from 'react'
import { Button as MuiButton } from '@mui/material'
import { styled } from '@mui/system';
import { useTheme } from '@emotion/react';

// const useStyles = styled(theme => ({
//     root: {
//         margin: theme.spacing(0.5)
//     },
//     label: {
//         textTransform: 'none'
//     }
// }))

export default function Button(props) {
    const theme = useTheme()
    const rootStyle = {
        margin: theme.spacing(0.5)
    }
    const labelStyle = {
        textTransform: 'none'
    }
    const { text, size, color, variant, onClick, ...other } = props
    // const classes = useStyles()
    return (
        <MuiButton
            sx={{ m: 1 }}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            style={{ root: rootStyle, label: labelStyle }}
        >
            {text}
        </MuiButton>
    )
}
