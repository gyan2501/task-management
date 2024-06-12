import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";

const Searchfilter = ({ searchTerm, filterStatus, handleSearchChange, handleStatusFilterChange }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} mt={2}>
      <Box mt={2} width="48%">
        <TextField label="Search Tasks" variant="outlined" fullWidth value={searchTerm} onChange={handleSearchChange} />
      </Box>
      <Box mt={2} width="48%">
        <FormControl fullWidth>
          <InputLabel id="filter-status-label">Filter by Status</InputLabel>
          <Select labelId="filter-status-label" value={filterStatus} onChange={handleStatusFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default Searchfilter;
