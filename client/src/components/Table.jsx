import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Fab } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import DeleteDialog from './DeleteDialog';

export function BudgetTable({budgetEntriesList, isPositive}) {
    const rows = budgetEntriesList;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelected([...selected, id]);
        } else {
            setSelected(selected.filter((selectedId) => selectedId !== id));
        }
    };

    const handleDeleteSelected = () => {
        // Filter out the selected entries from the list
        const updatedList = budgetEntriesList.filter((entry) => !selected.includes(entry.id));
        // Update the state with the filtered list
        // Qui la logica del delete
    };
    
    return (
        <>
        <DeleteDialog isOpen={open} setOpen={setOpen} isPositive={true} selected={selected} />
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell>Descrizione</TableCell>
                        <TableCell align="right">Euro</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {border: 0},
                                'td': {color: (isPositive) ? 'green' : 'red'},
                            }}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(row.id)}
                                    onChange={(event) => handleCheckboxChange(event, row.id)}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: `${(isPositive)? 'green' : 'red' }`
                                          }
                                    }}
                                    icon={<CheckBoxOutlineBlankRoundedIcon />}
                                    checkedIcon={<DisabledByDefaultRoundedIcon />}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.label}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[6, 15, 25, {value: -1, label: 'All'}]}
                count={rows.length}
                component="div"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Righe per pagina:"
                rowsPerPage={rowsPerPage}
                labelDisplayedRows={({from, to, count}) => `${from}-${to} di ${count}`}
            />
        </TableContainer>
        <Fab size='small' sx={{mt: 2, ml: 0.8}} disabled={!selected.length} onClick={handleOpen}>
            <DeleteForeverRoundedIcon />
        </Fab>
        </>
    );
}

export function HomeTable({budgetEntriesList, isPositive}) {
    const rows = budgetEntriesList;

    return (
        <>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Descrizione</TableCell>
                        <TableCell align="right">Euro</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {border: 0},
                                'td': {color: (isPositive) ? 'green' : 'red'},
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.label}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
