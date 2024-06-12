import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Tasktable = ({ tasks, handleEditModalOpen, handleCompleteTask, handleDeleteTask }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status ? "Completed" : "Pending"}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditModalOpen(task)}
                  style={{ marginRight: "10px" }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<TaskAltIcon />}
                  onClick={() => handleCompleteTask(task._id)}
                  style={{ marginRight: "10px" }}
                  disabled={task.status}
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteTask(task._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tasktable;
