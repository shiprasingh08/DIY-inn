"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ManageKits = () => {
  const [kits, setKits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentKit, setCurrentKit] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchKits();
  }, []);

  const fetchKits = async () => {
    try {
      const response = await fetch("/api/kits");
      const data = await response.json();
      setKits(data);
    } catch (error) {
      console.error("Error fetching kits:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = isEditing ? `/api/kits/${currentKit._id}` : "/api/kits";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentKit),
      });

      if (response.ok) {
        fetchKits();
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error saving kit:", error);
    }
  };

  const handleDelete = async (kitId) => {
    if (window.confirm("Are you sure you want to delete this kit?")) {
      try {
        const response = await fetch(`/api/kits/${kitId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchKits();
        }
      } catch (error) {
        console.error("Error deleting kit:", error);
      }
    }
  };

  const handleEdit = (kit) => {
    setCurrentKit(kit);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleOpenDialog = () => {
    setCurrentKit({
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentKit({
      name: "",
      description: "",
      price: "",
      category: "",
      Quantity: "",
    });
    setIsEditing(false);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Manage DIY Kits</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add New Kit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {kits.map((kit) => (
          <Grid item xs={12} sm={6} md={4} key={kit._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{kit.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {kit.description}
              </Typography>
              <Typography>Price: ${kit.price}</Typography>
              <Typography>Category: {kit.category}</Typography>
              <Typography>Stock: {kit.stockQuantity}</Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => handleEdit(kit)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(kit._id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Kit" : "Add New Kit"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Name"
              name="name"
              value={currentKit.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={currentKit.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={currentKit.price}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              value={currentKit.category}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Stock Quantity"
              name="stockQuantity"
              type="number"
              value={currentKit.stockQuantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageKits;