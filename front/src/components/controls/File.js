import React from "react";
import { useRef, useEffect } from 'react';
import { TextField } from '@mui/material'

export default function File(props) {

    const { name, label, value, onChange } = props
    const converToDefEvenPara = (name, value) => ({
        target: {
            name, value
        }
    })
    const inputRef = useRef();

    useEffect(() => {
        if (value !== "") {
            inputRef.current.value = null;
        }
    }, [value]);

    return (
        <TextField
            ref={inputRef}
            type="file"
            variant="standard"
            label={label}
            name={name}
            //value="null"
            onChange={e => {
                const file = e.target.files[0];
                if (file) {
                    onChange(converToDefEvenPara(name, file));
                }
            }}
        />
    )
}