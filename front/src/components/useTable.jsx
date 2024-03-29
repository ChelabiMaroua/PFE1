import React, { useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';
import { styled } from '@mui/system';

const StyledTable = styled(Table)(({ theme }) => ({
    marginTop: theme.spacing(1),
    '& thead th': {
        fontWeight: '100',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
        fontWeight: '1',
    },
    '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    },
    '& .MuiTableCell-root': {
        padding: '1px',
    },
}));

export default function useTable(records, headCells, filterFn) {
    const pages = [5, 10, 15];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const TblContainer = props => (
        <StyledTable>
            {props.children}
        </StyledTable>
    );

    const TblHead = props => {
        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(cellId);
        };
        return (
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? "right" : "left"}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                {headCell.disableSorting ? (
                                    headCell.label
                                ) : (
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : "asc"}
                                        onClick={() => { handleSortRequest(headCell.id) }}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
        );
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const TblPagination = () => (
        <TablePagination
            component="div"
            count={records.length}
            rowsPerPageOptions={pages}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    };

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    };
}
