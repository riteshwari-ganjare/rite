"use client";
import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Container, FormControl, InputLabel, Select, MenuItem, Divider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Save, Delete } from '@mui/icons-material';

// Initial data structure for a single entry
const initialData = {
    title: "",
    alt: "",
    day: "Monday",
    time: "",
    location: "Near Ram Mandir", // Default location option
    num: "",
    image: "",
    items: [
        {
            src: "",
            alt: "",
            title: "",
            address: "",
            rating: "",
            off: "",
            price: ""
        },
    ]
};

const AddEntryForm = () => {
    const [formData, setFormData] = useState(initialData);
    const [entries, setEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [imageDevices, setImageDevices] = useState({
        'Device 1': 'https://example.com/device1.jpg',
        'Device 2': 'https://example.com/device2.jpg',
        'Device 3': 'https://example.com/device3.jpg',
        'Device 4': 'https://example.com/device4.jpg'
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;
        setFormData((prevData) => ({ ...prevData, items: updatedItems }));
    };

    const handleAddEntry = () => {
        setEntries([...entries, formData]);
        setFormData(initialData); // Reset form after adding entry
    };

    const handleEditEntry = (index) => {
        setFormData(entries[index]);
        setEditingIndex(index);
    };

    const handleSaveEdit = () => {
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = formData;
        setEntries(updatedEntries);
        setEditingIndex(null); // Exit editing mode
        setFormData(initialData); // Reset form
    };

    const handleDeleteEntry = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="xs" sx={{ mt: 2 }}>
                    <Divider>
                        <Typography variant="h5" sx={{ fontWeight: 600, margin: "10px 0px", textAlign: "center", color: "#000" }}>
                            Add Details
                        </Typography>
                    </Divider>

                    {/* Form Fields */}
                    <Grid container spacing={1}>
                        {/* Title Dropdown */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard" sx={{ height: '30px' }}>
                                <InputLabel>Title</InputLabel>
                                <Select
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    sx={{
                                        height: '30px',
                                        padding: '6px 0',
                                        input: { padding: '6px 0' },
                                        fontSize: '14px'
                                    }}
                                >
                                    {['Device 1', 'Device 2', 'Device 3', 'Device 4'].map((device) => (
                                        <MenuItem key={device} value={device}>{device}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Alt Text */}
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Alt Text"
                                name="alt"
                                value={formData.alt}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                sx={{
                                    height: '30px',
                                    padding: '6px 0',
                                    input: { padding: '6px 0' },
                                    fontSize: '14px'
                                }}
                            />
                        </Grid>

                        {/* Day Dropdown */}
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="standard" sx={{ height: '30px' }}>
                                <InputLabel>Day</InputLabel>
                                <Select
                                    label="Day"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    sx={{
                                        height: '30px',
                                        padding: '6px 0',
                                        input: { padding: '6px 0' },
                                        fontSize: '14px'
                                    }}
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Time Field */}
                        <Grid item xs={6}>
                            <TextField
                                placeholder="Time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                sx={{
                                    height: '30px',
                                    padding: '6px 0',
                                    input: { padding: '6px 0' },
                                    fontSize: '14px'
                                }}
                            />
                        </Grid>

                        {/* Contact Number Field */}
                        <Grid item xs={12}>
                            <TextField
                                placeholder="Contact Number"
                                name="num"
                                value={formData.num}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                sx={{
                                    height: '30px',
                                    padding: '6px 0',
                                    input: { padding: '6px 0' },
                                    fontSize: '14px'
                                }}
                            />
                        </Grid>

                        {/* Image URL Field (Based on selected device) */}
                        {formData.title && (
                            <Grid item xs={12}>
                                <TextField
                                    placeholder="Image URL"
                                    name="image"
                                    value={formData.image || imageDevices[formData.title]}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="standard"
                                    sx={{
                                        height: '30px',
                                        padding: '6px 0',
                                        input: { padding: '6px 0' },
                                        fontSize: '14px'
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>

                    {/* Add Item Section */}
                    {formData.items.map((item, index) => (
                        <Box key={index} sx={{ mt: 2 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Item Title"
                                        name="title"
                                        value={item.title}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            height: '30px',
                                            padding: '6px 0',
                                            input: { padding: '6px 0' },
                                            fontSize: '14px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        placeholder="Price"
                                        name="price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            height: '30px',
                                            padding: '6px 0',
                                            input: { padding: '6px 0' },
                                            fontSize: '14px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        placeholder="Offer"
                                        name="off"
                                        value={item.off}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            height: '30px',
                                            padding: '6px 0',
                                            input: { padding: '6px 0' },
                                            fontSize: '14px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Image URL"
                                        name="src"
                                        value={item.src}
                                        onChange={(e) => handleItemChange(index, e)}
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            height: '30px',
                                            padding: '6px 0',
                                            input: { padding: '6px 0' },
                                            fontSize: '14px'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}

                    {/* Add Item Button */}
                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            backgroundColor: '#FF7E5F',
                            '&:hover': { backgroundColor: '#f00' },
                            minHeight: '35px',
                        }}
                        startIcon={<Add />}
                        onClick={() => setFormData(prevData => ({
                            ...prevData,
                            items: [...prevData.items, {
                                src: "", alt: "", title: "", address: "", rating: "", off: "", price: ""
                            }]
                        }))}
                        fullWidth
                    >
                        Add Item
                    </Button>

                    {/* Add Entry Button */}
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#4CAF50',
                            '&:hover': { backgroundColor: '#45a049' },
                            minHeight: '35px',
                        }}
                        onClick={handleAddEntry}
                        fullWidth
                    >
                        Add Entry
                    </Button>

                    {/* Table to display entries */}
                    {entries.length > 0 && (
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="center">Day</TableCell>
                                        <TableCell align="center">Time</TableCell>
                                        <TableCell align="center">Contact Number</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {entries.map((entry, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField
                                                    value={entry.title}
                                                    onChange={(e) => handleEditEntry(index)}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    value={entry.day}
                                                    onChange={(e) => handleEditEntry(index)}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    value={entry.time}
                                                    onChange={(e) => handleEditEntry(index)}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    value={entry.num}
                                                    onChange={(e) => handleEditEntry(index)}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {editingIndex === index ? (
                                                    <IconButton onClick={handleSaveEdit}>
                                                        <Save />
                                                    </IconButton>
                                                ) : (
                                                    <>
                                                        <IconButton onClick={() => handleEditEntry(index)}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDeleteEntry(index)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default AddEntryForm;
