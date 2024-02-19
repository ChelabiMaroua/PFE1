import { Card, Typography, useTheme } from '@mui/material'
import React from 'react'
// import { styled } from '@mui/system';
import { Paper } from '@mui/material'


export default function PageHeader(props) {
    const theme = useTheme()
    const root = {
        backgroundColor: '#fdfdff'
    }
    const PageHeader_ = {
        padding: theme.spacing(0),
        display: 'flex',
        marginBottom: theme.spacing(1)
    }
    const pageIcon = {
        display: 'inline-block',
        padding: theme.spacing(1),
        color: '#3c44b1'
    }
    const pageTitle = {
        paddingLeft: theme.spacing(2)
    }

    const { title, subtitle, icon } = props
    // const classes = useStyles();
    return (
        <Paper elevation={0} square style={root}>
            <div style={PageHeader_}>
                <Card style={pageIcon}>
                    {icon}
                </Card>
                <div style={pageTitle}>
                    <Typography variant='h7' component="div">{title}</Typography>
                    <Typography variant='subtitle2' component="div">{subtitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
