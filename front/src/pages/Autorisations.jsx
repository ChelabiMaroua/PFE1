import React, { useState } from 'react'
import * as utilisateursApi from "../api/utilisateursApi";
import AutorisationsForm from './AutorisationsForm'
import PageHeader from '../components/PageHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HowToReg from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add'
import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment, useTheme } from '@mui/material';
import useTable from '../components/useTable';
import Controls from '../components/controls/Controls'
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../components/controls/Popup'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";

const headCells = [
  { id: "id", label: "ID Utilisateur" },
  { id: "email", label: "Email" },
  { id: "mot_de_passe", label: "Mot de passe" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions", disableSorting: true }
];

export default function Utilisateur() {
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
  const { data, isError, isLoading, isSuccess } = useQuery(['utilisateurs', "id"], () => utilisateursApi.getAllUtilisateursFn())
  const addUtilisateur = useMutation(utilisateursApi.createUtilisateurFn, {
    onSuccess(utilisateur) {
      queryClient.invalidateQueries(['utilisateurs']);
      setNotify({
        isOpen: true,
        message: 'Enregistrement réussi',
        type: 'success'
      });
    }
  })

  const updateUtilisateur = useMutation(utilisateursApi.updateUtilisateurFn, {
    onSuccess(utilisateur) {
      queryClient.invalidateQueries(['utilisateurs']);
      setNotify({
        isOpen: true,
        message: 'Modification réussie',
        type: 'success'
      });
    }
  })
  const delUtilisateur = useMutation(utilisateursApi.deleteUtilisateurFn, {
    onSuccess(utilisateur) {
      queryClient.invalidateQueries(['utilisateurs']);
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
    recordsAfterPagingAndSortings
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

  const addOrEdit = (utilisateur, resetForm) => {
    if (utilisateur.id === 0) addUtilisateur.mutate(utilisateur)
    else updateUtilisateur.mutateAsync(utilisateur)
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
    delUtilisateur.mutate(id)
  }

  return (
    <>
      {isError && <p>Error fetching data</p>}
      {isLoading && <p>Fetching data...</p>}
      {isSuccess && (
        <>
          <PageHeader
            title="Utilisateurs"
            subtitle='Liste des utilisateurs'
            icon={<HowToReg />}
          />
          <Paper style={pageContentStyle}>
            <Toolbar>
              <Controls.Input
                label="Recherche utilisateurs par leurs noms"
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
                  recordsAfterPagingAndSortings().map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mot_de_passe}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => { openInPopup(item) }}
                      >
                        <ModeEditOutlineIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
                            subTitle: "Attention, opération irréversible",
                            onConfirm: () => { onDelete(item.id) }
                          })
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
          <Popup
            title="Formulaire Utilisateur"
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
        </>
      )}
    </>
  )

}
