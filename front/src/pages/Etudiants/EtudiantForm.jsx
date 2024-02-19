import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import dayjs from 'dayjs';

const initialValues = {
    id_etudiant: 0,
    matricule: '',
    nom: '',
    prenom: '',
    date_naissance: dayjs(),
    lieu_naissance: '',
    presume: false,
    wilaya_naissance: '',
    adresse: '',
    email: '',
    mob1: '',
    mob2: '',
    sexe: '',
    type: '',
    nom_ar: '',
    prenom_ar: '',
    nationalite: '',
    niveau_acces: '',
    groupe_sanguin: '',
    prenom_pere: '',
    prenom_pere_ar: '',
    nom_mere: '',
    nom_mere_ar: '',
    prenom_mere: '',
    prenom_mere_ar: '',
    profession_pere: '',
    profession_mere: '',
    photo: '',
}

export default function EtudiantForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "Le nom de l'étudiant est requit."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "Le prénom de l'étudiant est requit."
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
                    <Controls.Input label="Nom Ar" name="nom_ar" value={values.nom_ar}
                        onChange={handleInputChange} error={errors.nom_ar}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom" name="prenom" value={values.prenom}
                        onChange={handleInputChange} error={errors.prenom}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom Ar" name="prenom_ar" value={values.prenom_ar}
                        onChange={handleInputChange} error={errors.prenom_ar}
                    /></Grid>
                <Grid item xs={2}>
                    <Controls.Input label="Matricule" name="matricule" value={values.matricule}
                        onChange={handleInputChange} error={errors.matricule}
                    /></Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox label="Présumé" name="presume" value={values.presume}
                        onChange={handleInputChange} error={errors.presume}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.DatePicker label="Date de naissance" name="date_naissance" value={dayjs(values.date_naissance)}
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
                <Grid item xs={3}>
                    <Controls.Input label="Sexe" name="sexe" value={values.sexe}
                        onChange={handleInputChange} error={errors.sexe}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Type" name="type" value={values.type}
                        onChange={handleInputChange} error={errors.type}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Nationalité" name="nationalite" value={values.nationalite}
                        onChange={handleInputChange} error={errors.nationalite}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Niveau d'accès" name="niveau_acces" value={values.niveau_acces}
                        onChange={handleInputChange} error={errors.niveau_acces}
                    /></Grid>
                <Grid item xs={4}>
                    <Controls.Input label="Groupe sanguin" name="groupe_sanguin" value={values.groupe_sanguin}
                        onChange={handleInputChange} error={errors.groupe_sanguin}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom du père" name="prenom_pere" value={values.prenom_pere}
                        onChange={handleInputChange} error={errors.prenom_pere}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Nom de la mère" name="nom_mere" value={values.nom_mere}
                        onChange={handleInputChange} error={errors.nom_mere}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom de la mère" name="prenom_mere" value={values.prenom_mere}
                        onChange={handleInputChange} error={errors.prenom_mere}
                    /></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom du père Ar" name="prenom_pere_ar" value={values.prenom_pere_ar}
                        onChange={handleInputChange} error={errors.prenom_pere_ar}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Nom de la mère Ar" name="nom_mere_ar" value={values.nom_mere_ar}
                        onChange={handleInputChange} error={errors.nom_mere_ar}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Prénom de la mère Ar" name="prenom_mere_ar" value={values.prenom_mere_ar}
                        onChange={handleInputChange} error={errors.prenom_mere_ar}
                    /></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Profession du père" name="profession_pere" value={values.profession_pere}
                        onChange={handleInputChange} error={errors.profession_pere}
                    /></Grid>
                <Grid item xs={3}>
                    <Controls.Input label="Profession de la mère" name="profession_mere" value={values.profession_mere}
                        onChange={handleInputChange} error={errors.profession_mere}
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
