import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Tab, Tabs, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Select, MenuItem, FormControlLabel, Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Search, MoreVert, CalendarToday, ArrowUpward, ArrowBack, ArrowForward, Edit } from '@mui/icons-material';

const PreviewPage = () => {
  const [value, setValue] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const [invoices, setInvoices] = useState([
    { name: 'Amiah Pruitt', invoice: 'INV-19919', createDate: '09 Aug 2024', createTime: '12:27 pm', dueDate: '02 Oct 2024', dueTime: '7:27 am', amount: 2331.63, sent: 9, status: 'Paid', color: '#4caf50' },
    { name: 'Ariana Lang', invoice: 'INV-19918', createDate: '10 Aug 2024', createTime: '12:27 pm', dueDate: '01 Oct 2024', dueTime: '6:27 am', amount: 2372.93, sent: 4, status: 'Overdue', color: '#f44336' },
    { name: 'Lawson Bass', invoice: 'INV-19917', createDate: '11 Aug 2024', createTime: '12:27 pm', dueDate: '30 Sep 2024', dueTime: '5:27 am', amount: 2283.97, sent: 9, status: 'Paid', color: '#03a9f4' },
    { name: 'Selina Boyer', invoice: 'INV-19916', createDate: '12 Aug 2024', createTime: '12:27 pm', dueDate: '29 Sep 2024', dueTime: '4:27 am', amount: 2251.84, sent: 8, status: 'Pending', color: '#ffc107' },
    { name: 'Angelique Morse', invoice: 'INV-19915', createDate: '13 Aug 2024', createTime: '12:27 pm', dueDate: '28 Sep 2024', dueTime: '3:27 am', amount: 2343.51, sent: 11, status: 'Paid', color: '#4caf50' },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditClick = (invoice) => {
    setEditingInvoice({ ...invoice });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingInvoice(null);
  };

  const handleEditDialogSave = () => {
    setInvoices(invoices.map((inv) => (inv.invoice === editingInvoice.invoice ? editingInvoice : inv)));
    setEditDialogOpen(false);
    setEditingInvoice(null);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingInvoice({ ...editingInvoice, [name]: value });
  };

  useEffect(() => {
    const filterInvoices = () => {
      let filtered = [...invoices];
      if (value === 1) {
        filtered = filtered.filter(invoice => invoice.status === 'Paid');
      } else if (value === 2) {
        filtered = filtered.filter(invoice => invoice.status === 'Pending');
      } else if (value === 3) {
        filtered = filtered.filter(invoice => invoice.status === 'Overdue');
      } else if (value === 4) {
        filtered = filtered.filter(invoice => invoice.status === 'Draft');
      }
      setFilteredInvoices(filtered);
    };
    filterInvoices();
  }, [value, invoices]);

  return (
    <Box sx={{ p: 2, backgroundColor: '#fff', height: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="invoice tabs">
        <Tab label="All" icon={<Typography variant="caption" sx={{ ml: 1, bgcolor: '#333', color: '#fff', px: 1, borderRadius: 1 }}>{invoices.length}</Typography>} iconPosition="end" />
        <Tab label="Paid" icon={<Typography variant="caption" sx={{ ml: 1, bgcolor: '#4caf50', color: '#fff', px: 1, borderRadius: 1 }}>{invoices.filter(i => i.status === 'Paid').length}</Typography>} iconPosition="end" />
        <Tab label="Pending" icon={<Typography variant="caption" sx={{ ml: 1, bgcolor: '#ffc107', color: '#fff', px: 1, borderRadius: 1 }}>{invoices.filter(i => i.status === 'Pending').length}</Typography>} iconPosition="end" />
        <Tab label="Overdue" icon={<Typography variant="caption" sx={{ ml: 1, bgcolor: '#f44336', color: '#fff', px: 1, borderRadius: 1 }}>{invoices.filter(i => i.status === 'Overdue').length}</Typography>} iconPosition="end" />
        <Tab label="Draft" icon={<Typography variant="caption" sx={{ ml: 1, bgcolor: '#9e9e9e', color: '#fff', px: 1, borderRadius: 1 }}>{invoices.filter(i => i.status === 'Draft').length}</Typography>} iconPosition="end" />
      </Tabs>

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField select label="Service" sx={{ minWidth: 120 }}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        </TextField>
        <TextField
          label="Start date"
          InputProps={{
            endAdornment: (
              <IconButton>
                <CalendarToday />
              </IconButton>
            ),
          }}
        />
        <TextField
          label="End date"
          InputProps={{
            endAdornment: (
              <IconButton>
                <CalendarToday />
              </IconButton>
            ),
          }}
        />
        <TextField
          fullWidth
          placeholder="Search customer or invoice number..."
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Stack>

      <TableContainer>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>
                Create <ArrowUpward fontSize="small" />
              </TableCell>
              <TableCell>Due</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Sent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.invoice} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ bgcolor: invoice.color }}>{invoice.name[0]}</Avatar>
                    <Stack>
                      <Typography variant="body2">{invoice.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {invoice.invoice}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.createDate}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {invoice.createTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{invoice.dueDate}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {invoice.dueTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">${invoice.amount.toFixed(2)}</Typography>
                </TableCell>
                <TableCell>{invoice.sent}</TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor:
                        invoice.status === 'Paid'
                          ? '#e8f5e9'
                          : invoice.status === 'Overdue'
                          ? '#ffebee'
                          : '#fff8e1',
                      color:
                        invoice.status === 'Paid'
                          ? '#4caf50'
                          : invoice.status === 'Overdue'
                          ? '#f44336'
                          : '#ffc107',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {invoice.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditClick(invoice)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />}
          label="Dense"
        />
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">Rows per page:</Typography>
          <Select value={rowsPerPage} onChange={(event) => setRowsPerPage(event.target.value)} size="small">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
          <Typography variant="body2">1-{Math.min(rowsPerPage, filteredInvoices.length)} of {filteredInvoices.length}</Typography>
          <IconButton size="small">
            <ArrowBack />
          </IconButton>
          <IconButton size="small">
            <ArrowForward />
          </IconButton>
        </Stack>
      </Stack>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Customer Name"
            type="text"
            fullWidth
            variant="standard"
            value={editingInvoice?.name || ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="invoice"
            label="Invoice Number"
            type="text"
            fullWidth
            variant="standard"
            value={editingInvoice?.invoice || ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={editingInvoice?.amount || ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            select
            fullWidth
            variant="standard"
            value={editingInvoice?.status || ''}
            onChange={handleEditInputChange}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PreviewPage;