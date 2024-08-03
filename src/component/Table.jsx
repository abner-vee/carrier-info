import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    AppBar,
    Toolbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

export const DataGridDemo = () => {
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setFilteredRows(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleViewClick = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleDeleteClick = (id) => {
        console.log(`Delete clicked for row with id: ${id}`);
        // Add your delete logic here
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const handlePageChange = (event) => {
        const pageNumber = parseInt(event.target.value, 10) - 1;
        setPage(pageNumber);
    };

    const columns = [
        { field: 'created_dt', headerName: 'Created_DT', width: 150, sortable: true },
        { field: 'data_source_modified_dt', headerName: 'Modified_DT', width: 150, sortable: true },
        { field: 'entity_type', headerName: 'Entity', width: 150, sortable: true },
        { field: 'operating_status', headerName: 'Operating Status', width: 150, sortable: true },
        { field: 'legal_name', headerName: 'Legal Name', width: 150, sortable: true },
        { field: 'dba_name', headerName: 'DBA Name', width: 150, sortable: true },
        { field: 'physical_address', headerName: 'Physical Address', width: 200, sortable: true },
        { field: 'phone', headerName: 'Phone', width: 150, sortable: true },
        { field: 'usdot_number', headerName: 'DOT', width: 150, sortable: true },
        { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF', width: 150, sortable: true },
        { field: 'power_units', headerName: 'Power Units', width: 150, sortable: true },
        { field: 'out_of_service_date', headerName: 'Out of Service Date', width: 150, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: 16 }}
                        onClick={() => handleViewClick(params.row)}
                    >
                        View
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteClick(params.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Application
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Box sx={{ height: 600, width: '90%' }}>
                    <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
                        <TextField
                            label="Go to page"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={handlePageChange}
                        />
                    </Box>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                            sorting: {
                                sortModel: [
                                    {
                                        field: 'created_dt',
                                        sort: 'asc',
                                    },
                                ],
                            },
                        }}
                        page={page}
                        onPageChange={(newPage) => setPage(newPage)}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sortingOrder={['asc', 'desc']}
                        disableColumnMenu={false}
                    />
                </Box>

                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth
                    maxWidth="lg" // Set maxWidth to lg for a wider modal
                >
                    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1976d2', color: '#fff' }} id="customized-dialog-title">
                        Row Details
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ backgroundColor: '#f0f0f0' }}>
                        <Grid container spacing={2}>
                            {selectedRow && Object.entries(selectedRow).map(([key, value]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <TextField
                                        label={key.replace(/_/g, ' ').toUpperCase()}
                                        value={value}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#e0e0e0' }}>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};
