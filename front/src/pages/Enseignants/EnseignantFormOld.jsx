import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import dayjs from 'dayjs';

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
    //date_recrutement: null,
    //date_cession: null,
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
            temp.prenom = fieldValues.prenom ? "" : "Le prénom est requit."
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
        if (recordForEdit != null){
            const { date_naissance, ...otherData } = recordForEdit;
      // Vérifier que date_naissance est une chaîne (string) non vide
      const isValidDate = typeof date_naissance === 'string' && date_naissance.trim() !== '';
      // Convertir la chaîne de date en objet Date si c'est une date valide
      const date_naissanceAsDate = isValidDate ? new Date(date_naissance) : null;
      // Vérifier que la conversion en objet Date est réussie avant de stocker la valeur
      const finalDate = isValidDate && !isNaN(date_naissanceAsDate) ? date_naissanceAsDate.toISOString().split('T')[0] : null; // Format "yyyy-MM-dd"
      setValues({
        ...otherData,
        date_naissance: finalDate,
      });
        }
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
                        label="Prénom"
                        name="prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                        error={errors.prenom}
                    />
                    <Controls.DateField
                        label="Date de naissance"
                        name="date_naissance"
                        value={values.date_naissance}
                        onChange={handleInputChange}
                        error={errors.date_naissance}
                    />
                    <Controls.Input
                        label="Lieu de naissance"
                        name="lieu_naissance"
                        value={values.lieu_naissance}
                        onChange={handleInputChange}
                        error={errors.lieu_naissance}
                    />
                    <Controls.Input
                        label="Wilaya de naissance"
                        name="wilaya_naissance"
                        value={values.wilaya_naissance}
                        onChange={handleInputChange}
                        error={errors.wilaya_naissance}
                    />
                    <Controls.Input
                        label="Adresse"
                        name="adresse"
                        value={values.adresse}
                        onChange={handleInputChange}
                        error={errors.adresse}
                    />
                    <Controls.Input
                        label="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile 1"
                        name="mob1"
                        value={values.mob1}
                        onChange={handleInputChange}
                        error={errors.mob1}
                    />
                    <Controls.Input
                        label="Mobile 2"
                        name="mob2"
                        value={values.mob2}
                        onChange={handleInputChange}
                        error={errors.mob2}
                    />
                    <Controls.Input
                        label="Nationalité"
                        name="nationalite"
                        value={values.nationalite}
                        onChange={handleInputChange}
                        error={errors.nationalite}
                    />
                    <Controls.Input
                        label="Civilité"
                        name="civilite"
                        value={values.civilite}
                        onChange={handleInputChange}
                        error={errors.civilite}
                    />
                    <Controls.Input
                        label="Groupe sanguin"
                        name="groupe_sanguin"
                        value={values.groupe_sanguin}
                        onChange={handleInputChange}
                        error={errors.groupe_sanguin}
                    />
                    {/* <Controls.Input
                        label="Date de recrutement"
                        name="date_recrutement"
                        value={values.date_recrutement}
                        onChange={handleInputChange}
                        error={errors.date_recrutement}
                    />
                    <Controls.Input
                        label="Date de cession"
                        name="date_cession"
                        value={values.date_cession}
                        onChange={handleInputChange}
                        error={errors.date_cession}
                    /> */}
                    <Controls.Input
                        label="Type Formateur/Consultant"
                        name="type_form_consult"
                        value={values.type_form_consult}
                        onChange={handleInputChange}
                        error={errors.type_form_consult}
                    />
                    <Controls.Input
                        label="Type Permanent/Vacataire"
                        name="type_perm_vacat"
                        value={values.type_perm_vacat}
                        onChange={handleInputChange}
                        error={errors.type_perm_vacat}
                    />
                    <Controls.Input
                        label="Diplôme"
                        name="diplome"
                        value={values.diplome}
                        onChange={handleInputChange}
                        error={errors.diplome}
                    />
                    <Controls.Input
                        label="Spécialité"
                        name="specialite"
                        value={values.specialite}
                        onChange={handleInputChange}
                        error={errors.specialite}
                    />
                    <Controls.Input
                        label="Observations"
                        name="observations"
                        value={values.observations}
                        onChange={handleInputChange}
                        error={errors.observations}
                    />
                    <Controls.Input
                        label="Photo"
                        name="photo"
                        value={values.photo}
                        onChange={handleInputChange}
                        error={errors.photo}
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
