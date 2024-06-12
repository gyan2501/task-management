import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paginationcontrols from "../components/Paginationcontrol";
import Tasktable from "../components/Tasktable";
import Modals from "../components/Modals";
import Searchfilter from "../components/Searchfilter";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);

  // states search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 5;

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("createdBy"));
    if (user) {
      setUserName(user);
    }
    fetchTasks();
  }, [searchTerm, filterStatus, currentPage]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://taskmanagement-backend-q6uw.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchTerm || "",
            status: filterStatus || "",
            page: currentPage,
            limit: tasksPerPage,
          },
        }
      );
      setTasks(res.data);
      setTotalTasks(res.data.totalTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("createdBy");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async () => {
    debugger;
    try {
      const res = await axios.post(
        "https://taskmanagement-backend-q6uw.onrender.com/api/tasks",
        {
          title: taskTitle,
          description: taskDescription,
          priority: taskPriority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        fetchTasks();
        setOpenModal(false);
        setTaskTitle("");
        setTaskDescription("");
        setTaskPriority("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `https://taskmanagement-backend-q6uw.onrender.com/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.msg);
      fetchTasks(); // Refresh tasks after deleting task
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  // handleEditTask function
  const handleEditTask = async () => {
    try {
      const res = await axios.put(
        `https://taskmanagement-backend-q6uw.onrender.com/api/tasks/${selectedTask._id}`,
        {
          title: taskTitle,
          description: taskDescription,
          priority: taskPriority,
          status: taskStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchTasks(); // Refresh tasks after editing task
      setEditModalOpen(false); // Close edit modal after editing task
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to edit task");
    }
  };

  // Edit Modal Opening
  const handleEditModalOpen = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);
    setEditModalOpen(true);
  };

  // Edit Modal Closing
  const handleEditModalClose = () => {
    setSelectedTask(null);
    setEditModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("");
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const res = await axios.put(
        `https://taskmanagement-backend-q6uw.onrender.com/api/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchTasks(); // Refresh tasks after marking task as complete
    } catch (error) {
      console.error("Error marking task as complete:", error);
      toast.error("Failed to mark task as complete");
    }
  };

  // search & filter funtion
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchTasks();
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
    fetchTasks();
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userName}!
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={() => setOpenModal(true)}
          >
            Add Task
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </Button>
        </Box>

        <Searchfilter
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          handleSearchChange={handleSearchChange}
          handleStatusFilterChange={handleStatusFilterChange}
        />
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Your Tasks
          </Typography>

          <Tasktable
            tasks={tasks}
            handleEditModalOpen={handleEditModalOpen}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
          />

          <Paginationcontrols
            totalTasks={totalTasks}
            tasksPerPage={tasksPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
      <Modals
        open={openModal || editModalOpen}
        onClose={openModal ? () => setOpenModal(false) : handleEditModalClose}
        title={taskTitle}
        description={taskDescription}
        priority={taskPriority}
        status={taskStatus}
        handleTitleChange={(e) => setTaskTitle(e.target.value)}
        handleDescriptionChange={(e) => setTaskDescription(e.target.value)}
        handlePriorityChange={(e) => setTaskPriority(e.target.value)}
        handleStatusChange={(e) => setTaskStatus(e.target.value)}
        handleSubmit={openModal ? handleAddTask : handleEditTask}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default Dashboard;
