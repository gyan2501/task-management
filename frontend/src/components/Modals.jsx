import React from 'react';
import { Box, Typography, TextField, Button, Modal, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Modals = ({ open, onClose, title, description, priority, status, handleTitleChange, handleDescriptionChange, handlePriorityChange, handleStatusChange, handleSubmit }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {title ? "Edit Task" : "Add Task"}
        </Typography>
        <TextField fullWidth label="Title" margin="normal" value={title} onChange={handleTitleChange} />
        <TextField fullWidth label="Description" margin="normal" value={description} onChange={handleDescriptionChange} />
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select labelId="priority-label" value={priority} onChange={handlePriorityChange}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select labelId="status-label" value={status} onChange={handleStatusChange}>
            <MenuItem value="true">Completed</MenuItem>
            <MenuItem value="false">Pending</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: "10px" }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Modals;
