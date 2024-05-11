import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';

export default function BudgetTable({budgetEntriesList, isPositive}) {
    const rows = budgetEntriesList;
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    return (
        <TableContainer component={Paper}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        >
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
            <TablePagination
                component="div"
                page={page}
                onPageChange={handleChangePage}
            />
        </TableContainer>
    );
}
