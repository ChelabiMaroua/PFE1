import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

const initialValues = {
    id_enseignant: 0,
    nom: '',
    prenom: '',
    date_naissance: dayjs(),
    lieu_naissance: '',
    wilaya_naissance: '',
    adresse: '',
    email: '',
    mob1: '',
    mob2: '',
    nationalite: '',
    civilite: '',
    groupe_sanguin: '',
    date_recrutement: null,
    date_cession: null,
    type_form_consult: '',
    type_perm_vacat: '',
    diplome: '',
    specialite: '',
    observations: '',
    photo: '',
}

export default function EnseignantForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "Le nom de l'enseignant est requit."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "Le prénom de l'enseignant est requit."
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

    // const Photo = ({ photo }) => {
    //     console.log(file)
    //     return <img style={{ maxWidth: "100%", maxHeight: "100%" }}
    //         src={URL.createObjectURL(photo)}
    //         alt={photo.name} />;
    // };

    // console.log(values.photo)
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={3}>
                    <Controls.Input label="Nom" name="nom" value={values.nom}
                        onChange={handleInputChange} error={errors.nom}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom" name="prenom" value={values.prenom}
                        onChange={handleInputChange} error={errors.prenom}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.DatePicker label="Date de naissance" name="date_naissance" value={values.date_naissance}
                        onChange={handleInputChange} error={errors.date_naissance}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Lieu de naissance" name="lieu_naissance" value={values.lieu_naissance}
                        onChange={handleInputChange} error={errors.lieu_naissance}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Wilaya de naissance" name="wilaya_naissance" value={values.wilaya_naissance}
                        onChange={handleInputChange} error={errors.wilaya_naissance}
                    /></Grid>
                <Grid item xs={8}>
                    <Controls.Input label="Adresse" name="adresse" value={values.adresse}
                        onChange={handleInputChange} error={errors.adresse}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Email" name="email" value={values.email}
                        onChange={handleInputChange} error={errors.email}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Mobile 1" name="mob1" value={values.mob1}
                        onChange={handleInputChange} error={errors.mob1}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Mobile 2" name="mob2" value={values.mob2}
                        onChange={handleInputChange} error={errors.mob2}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Nationalité" name="nationalite" value={values.nationalite}
                        onChange={handleInputChange} error={errors.nationalite}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Civilité" name="civilite" value={values.civilite}
                        onChange={handleInputChange} error={errors.civilite}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Groupe sanguin" name="groupe_sanguin" value={values.groupe_sanguin}
                        onChange={handleInputChange} error={errors.groupe_sanguin}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.DatePicker label="Date de recrutement" name="date_recrutement" value={values.date_recrutement}
                        onChange={handleInputChange} error={errors.date_recrutement}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.DatePicker label="Date de cession" name="date_cession" value={values.date_cession}
                        onChange={handleInputChange} error={errors.date_cession}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Type Formateur/Consultant" name="type_form_consult" value={values.type_form_consult}
                        onChange={handleInputChange} error={errors.type_form_consult}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Type Permanent/Vacataire" name="type_perm_vacat" value={values.type_perm_vacat}
                        onChange={handleInputChange} error={errors.type_perm_vacat}
                    /></Grid>

                <Grid item xs={3}>
                    <Controls.Input label="Diplôme" name="diplome" value={values.diplome}
                        onChange={handleInputChange} error={errors.diplome}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Spécialité" name="specialite" value={values.specialite}
                        onChange={handleInputChange} error={errors.specialite}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Observations" name="observations" value={values.observations}
                        onChange={handleInputChange} error={errors.observations}
                    /></Grid>
                {/* <Grid item xs={3}>
                    <Controls.File label="  " name="photo" value={values.photo}
                        onChange={handleInputChange}
                    /></Grid>
                <Grid item xs={3}></Grid> */}
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
                    <Box
                        component="span"
                        width="150px"
                        height="180px"
                        sx={{ border: '1px dashed grey', position: "absolute", right: 50, top: 425 }}>
                        {file && <Photo photo={file} />}
                    </Box>
                </div>
            </Grid>
        </Form >
    )
}
