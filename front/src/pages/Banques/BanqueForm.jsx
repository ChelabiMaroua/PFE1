import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

const initialValues = {
    id_banque: 0,
    nom: '',
    adresse: '',
    tel: '',
}

export default function BanqueForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "Le nom de la banque est requit."
        if ('adresse' in fieldValues)
            temp.adresse = fieldValues.adresse ? "" : "L'adresse est requise."
        if ('tel' in fieldValues)
            temp.tel = fieldValues.tel ? "" : "Le numéro de tél est requit ."
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
        resetForm
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
                <Grid item xs={12}>
                    <Controls.Input
                        label="Nom"
                        name="nom"
                        value={values.nom}
                        onChange={handleInputChange}
                        error={errors.nom}
                    />
                    <Controls.Input
                        label="Adresse"
                        name="adresse"
                        value={values.adresse}
                        onChange={handleInputChange}
                        error={errors.adresse}
                    />
                    <Controls.Input
                        label="Tél"
                        name="tel"
                        value={values.tel}
                        onChange={handleInputChange}
                        error={errors.tel}
                    />
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
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
