import { styled } from '@mui/system'
import React from 'react'
import { Button } from '@mui/material'
import { useTheme } from '@emotion/react'

// const useStyles = styled(theme => ({
//     root: {
//         minWidth: 0,
//         margin: theme.spacing(0.5)
//     },
//     secondary: {
//         backgroudColor: theme.palette.secondary.light,
//         '& MuiButton-label': {
//             color: theme.palette.secondary.main,
//         }
//     },
//     primary: {
//         backgroudColor: theme.palette.primary.light,
//         '& MuiButton-label': {
//             color: theme.palette.primary.main,
//         }
//     }
// }))

export default function ActionButton(props) {
    const { color, children, onClick } = props
    // const classes = useStyles()
    const theme = useTheme()
    const rootStyle = {
        minWidth: 0,
        margin: theme.spacing(0.5)
    }
    const primaryStyle = {
        backgroundColor: theme.palette.primary.light,
        '& MuiButton-label': {
            color: theme.palette.primary.main,
        }
    }
    const secondaryStyle = {
        backgroundColor: theme.palette.secondary.light,
        '& MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    }

    return (
        <Button
            // style={`${rootStyle} ${[color]}`}
            style={{ ...rootStyle, ...primaryStyle }}
            onClick={onClick}>
            {children}
        </Button>
    )
}
