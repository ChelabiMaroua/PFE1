import React, { useState } from 'react'
import * as banqueApi from "../../api/banqueApi";
import BanqueForm from './BanqueForm'
import PageHeader from '../../components/PageHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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
    { id: "id_banque", label: "ID Banque" },
    { id: "nom", label: "Nom" },
    { id: "adresse", label: "Adresse" },
    { id: "tel", label: "Tél", disableSorting: false },
    { id: "actions", label: "Actions", disableSorting: true }
];

export default function Banques() {
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

    const { data, isError, isLoading, isSuccess } = useQuery(['banques', "id"], () => banqueApi.getAllBanquesFn())
    const addBanque = useMutation(banqueApi.createBanqueFn, {
        onSuccess(banque) {
            queryClient.invalidateQueries(['banques']);
            setNotify({
                isOpen: true,
                message: 'Enregistrement réussi',
                type: 'success'
            });
        }
    })

    const updateBanque = useMutation(banqueApi.updateBanqueFn, {
        onSuccess(banque) {
            queryClient.invalidateQueries(['banques']);
            setNotify({
                isOpen: true,
                message: 'Modification réussie',
                type: 'success'
            });
        }
    })
    const delBanque = useMutation(banqueApi.deleteBanqueFn, {
        onSuccess(banque) {
            queryClient.invalidateQueries(['banques']);
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

    const addOrEdit = (banque, resetForm) => {
        if (banque.id_banque === 0) addBanque.mutate(banque)
        else updateBanque.mutateAsync(banque)
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
        delBanque.mutate(id)
    }

    return (
        <>
            {isError && <p>Error fetching data</p>}
            {isLoading && <p>Fetching data...</p>}
            {isSuccess && (<>
                <PageHeader
                    title="Banques"
                    subtitle='Liste des banques'
                    icon={<AccountBalanceIcon/>}
                />
                <Paper style={pageContentStyle}>
                    <Toolbar>
                        <Controls.Input
                            label="Recherche banques"
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
                                    <TableRow key={item.id_banque}>
                                        <TableCell>{item.id_banque}</TableCell>
                                        <TableCell>{item.nom}</TableCell>
                                        <TableCell>{item.adresse}</TableCell>
                                        <TableCell>{item.tel}</TableCell>
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
                                                        onConfirm: () => { onDelete(item.id_banque) }
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
                    title="Forumaire Banque"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <BanqueForm
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
