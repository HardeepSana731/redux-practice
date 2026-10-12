import React from 'react';
import {

Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
Button,
Autocomplete,
TextField,
} from '@mui/material';

const GridTable = () => {
const rows = [
    {label:'John', id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    {label:'jane', id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    {label:'Bob', id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

return (
    <>
    <TableContainer component={Paper} >
        <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    <Button variant='contained' style={{float:"right"}}> Submit </Button>
    <Autocomplete 
    options={rows}
    sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie"></TextField>} 
    ></Autocomplete>
    </>
);
};

export default GridTable;