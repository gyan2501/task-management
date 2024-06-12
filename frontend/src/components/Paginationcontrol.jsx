import React from "react";
import { Box, Pagination } from "@mui/material";

const Paginationcontrols = ({
  totalTasks,
  tasksPerPage,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Box mt={3} display="flex" justifyContent="center">
      <Pagination
        count={Math.ceil(totalTasks / tasksPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
};

export default Paginationcontrols;
