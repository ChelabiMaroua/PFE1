import React, { useState } from 'react'
import { useTheme } from '@emotion/react';

export function useForm(initialValues, validateOnChange = false, validate) {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState("")

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(e.target);
        if (e && e.target) {
            const { name, value } = e.target;
    
            if (name === "photo") {
                setFile(value);
            } else if (name === "date_naissance") {
                const dateValue = isNaN(new Date(value)) ? value : new Date(value);
                setValues(prevValues => ({
                    ...prevValues,
                    [name]: dateValue
                }));
            } else {
                setValues(prevValues => ({
                    ...prevValues,
                    [name]: value
                }));
            }
    
            if (validateOnChange) {
                validate({ [name]: value });
            }
        }


    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        file
    }
}

export function Form(props) {
    const theme = useTheme()
    const rootStyle = {
        '& .MuiFormControl-root': {
            width: '97%',
            margin: theme.spacing(1)
        }
    }
    const { children, ...other } = props
    return (
        <form style={rootStyle} {...other}>
            {props.children}
        </form>
    )
}
