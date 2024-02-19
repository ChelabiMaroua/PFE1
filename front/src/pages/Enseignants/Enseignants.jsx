import React, { useState } from 'react'
import * as enseignantApi from "../../api/enseignantApi";
import EnseignantForm from './EnseignantFormOld'
import PageHeader from '../../components/PageHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HowToReg from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add'
import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment, useTheme } from '@mui/material';
import useTable from '../../components/useTable';
import Controls from '../../components/controls/Controls'
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../../components/controls/Popup'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";

const headCells = [
    { id: "id_enseignant", label: "ID Enseignant" },
    { id: "nom", label: "Nom" },
    { id: "prenom", label: "Prénom" },
    { id: "mob1", label: "Mobile 1" },
    { id: "type_form_consult", label: "Type Form/Consult" },
    { id: "type_perm_vacat", label: "Type Perm/Vacat" },
    { id: "diplome", label: "Diplôme" },
    { id: "actions", label: "Actions", disableSorting: true }
];

export default function Enseignants() {
    const theme = useTheme()
    const pageContentStyle = {
        margin: theme.spacing(0),
        padding: theme.spacing(3)
    }
    const searchInputStyle = {
        width: '85%',
    }
    const newButtonStyle = {
        position: "absolute",
        right: '0px',
    }

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const { data, isError, isLoading, isSuccess } = useQuery(['enseignants', "id"], () => enseignantApi.getAllEnseignantsFn())
    const addEnseignant = useMutation(enseignantApi.createEnseignantFn, {
        onSuccess(enseignant) {
            queryClient.invalidateQueries(['enseignants']);
            setNotify({
                isOpen: true,
                message: 'Enregistrement réussi',
                type: 'success'
            });
        }
    })

    const updateEnseignant = useMutation(enseignantApi.updateEnseignantFn, {
        onSuccess(enseignant) {
            queryClient.invalidateQueries(['enseignants']);
            setNotify({
                isOpen: true,
                message: 'Modification réussie',
                type: 'success'
            });
        }
    })
    const delEnseignant = useMutation(enseignantApi.deleteEnseignantFn, {
        onSuccess(enseignant) {
            queryClient.invalidateQueries(['enseignants']);
            setNotify({
                isOpen: true,
                message: 'Suppression réussie',
                type: 'error'
            });
        }
    })
    const queryClient = useQueryClient();
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(data, headCells, filterFn)

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items
                else
                    return items.filter(x => x.nom.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (enseignant, resetForm) => {
        if (enseignant.id_enseignant === 0) addEnseignant.mutate(enseignant)
        else updateEnseignant.mutateAsync(enseignant)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        delEnseignant.mutate(id)
    }

    return (
        <>
            {isError && <p>Error fetching data</p>}
            {isLoading && <p>Fetching data...</p>}
            {isSuccess && (<>
                <PageHeader
                    title="Enseignants"
                    subtitle='Liste des enseignants'
                    icon={<HowToReg />}
                />
                <Paper style={pageContentStyle}>
                    <Toolbar>
                        <Controls.Input
                            label="Recherche enseignants par leurs noms"
                            style={searchInputStyle}
                            InputProps={{
                                startAdornment: (<InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                        <Controls.Button
                            text="Ajouter"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            style={newButtonStyle}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id_enseignant}>
                                        <TableCell>{item.id_enseignant}</TableCell>
                                        <TableCell>{item.nom}</TableCell>
                                        <TableCell>{item.prenom}</TableCell>
                                        <TableCell>{item.mob1}</TableCell>
                                        <TableCell>{item.type_form_consult}</TableCell>
                                        <TableCell>{item.type_perm_vacat}</TableCell>
                                        <TableCell>{item.diplome}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}>
                                                <ModeEditOutlineIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
                                                        subTitle: "Attention, opération irréversible",
                                                        onConfirm: () => { onDelete(item.id_enseignant) }
                                                    })
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>
                <Popup
                    title="Forumaire Enseignant"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <EnseignantForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </>)}
        </>
    )
}
