import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';

const initialValues = {
    id_utilisateur: 0,
    email: '',
    mot_de_passe: '',
    role: '',
}

export default function UtilisateurForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "L'email de l'utilisateur est requis."
        if ('mot_de_passe' in fieldValues)
            temp.mot_de_passe = fieldValues.mot_de_passe ? "" : "Le mot de passe de l'utilisateur est requis."
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "Le rôle de l'utilisateur est requis."
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        file
    } = useForm(initialValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if (true)
            addOrEdit(values, resetForm);
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={4}>
                    <Controls.Input label="Email" name="email" value={values.email}
                        onChange={handleInputChange} error={errors.email}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Mot de passe" name="mot_de_passe" value={values.mot_de_passe}
                        onChange={handleInputChange} error={errors.mot_de_passe}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Rôle" name="role" value={values.role}
                        onChange={handleInputChange} error={errors.role}
                    />
                </Grid>
                <div>
                    <Controls.Button
                        type="submit"
                        text="Valider"
                    />
                    <Controls.Button
                        color="inherit"
                        text="Initialiser"
                        onClick={resetForm}
                    />
                    {/* Box for displaying photo if needed */}
                </div>
            </Grid>
        </Form >
    )
}
