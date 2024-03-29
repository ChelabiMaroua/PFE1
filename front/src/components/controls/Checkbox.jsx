import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import React from 'react'

export default function Checkbox(props) {
    
    const { name, label, value, onChange } = props
    const converToDefEvenPara = (name, value) => ({
        target:{
            name, value
        }
    })
    
    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(converToDefEvenPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
