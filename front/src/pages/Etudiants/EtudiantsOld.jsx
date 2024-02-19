import React, { useState } from 'react'
import * as etudiantApi from "../../api/etudiantApi";
import EtudiantForm from './EtudiantForm'
import PageHeader from '../../components/PageHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddIcon from '@mui/icons-material/Add'
import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment, useTheme, Checkbox } from '@mui/material';
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
    { id: "id_etudiant", label: "ID Etudiant" },
    { id: "matricule", label: "Matricule" },
    { id: "nom", label: "Nom" },
    { id: "prenom", label: "Prénom" },
    { id: "adresse", label: "Adresse" },
    { id: "mob1", label: "Mobile Etudiant" },
    { id: "date_naissance", label: "Mobile Parents" },
    { id: "presume", label: "Présumé" },
    { id: "actions", label: "Actions", disableSorting: true }
];

export default function Etudiants() {
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: (items) => items });
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

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

    const { data, isError, isLoading, isSuccess } = useQuery(['etudiants', "id"], () => etudiantApi.getAllEtudiantsFn())
    const addEtudiant = useMutation(etudiantApi.createEtudiantFn, {
        onSuccess(etudiant) {
            queryClient.invalidateQueries(['etudiants']);
            setNotify({
                isOpen: true,
                message: 'Enregistrement réussi',
                type: 'success'
            });
        }
    })

    const updateEtudiant = useMutation(etudiantApi.updateEtudiantFn, {
        onSuccess(etudiant) {
            queryClient.invalidateQueries(['etudiants']);
            setNotify({
                isOpen: true,
                message: 'Modification réussie',
                type: 'success'
            });
        }
    })
    const delEtudiant = useMutation(etudiantApi.deleteEtudiantFn, {
        onSuccess(etudiant) {
            queryClient.invalidateQueries(['etudiants']);
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

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setFilterFn({
            fn: (items) => {
                if (value === '') return items;
                return items.filter((x) => x.nom.toLowerCase().includes(value));
            },
        });
    };

    const addOrEdit = (etudiant, resetForm) => {
        if (etudiant.id_etudiant === 0) addEtudiant.mutate(etudiant)
        else updateEtudiant.mutateAsync(etudiant)
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
        delEtudiant.mutate(id)
    }

    return (
        <>
            {isError && <p>Error fetching data</p>}
            {isLoading && <p>Fetching data...</p>}
            {isSuccess && (<>
                <PageHeader
                    title="Etudiants"
                    subtitle='Liste des étudiants'
                    icon={<AccountBalanceIcon />}
                />
                <Paper style={pageContentStyle}>
                    <Toolbar>
                        <Controls.Input
                            label="Recherche étudiants"
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
                                    <TableRow key={item.id_etudiant}>
                                        <TableCell>{item.id_etudiant}</TableCell>
                                        <TableCell>{item.matricule}</TableCell>
                                        <TableCell>{item.nom}</TableCell>
                                        <TableCell>{item.prenom}</TableCell>
                                        <TableCell>{item.adresse}</TableCell>
                                        <TableCell>{item.mob1}</TableCell>
                                        <TableCell>{new Date(item.date_naissance).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Checkbox checked={item.presume === 1} />
                                        </TableCell>
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
                                                        onConfirm: () => { onDelete(item.id_etudiant) }
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
                    title="Forumaire Etudiant"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <EtudiantForm
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
