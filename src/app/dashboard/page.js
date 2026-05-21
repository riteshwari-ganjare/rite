"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const todayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

function normalizeItems(items) {
  const set = new Set();
  (items || []).forEach((item) => {
    const id = String(item._id ?? item);
    set.add(id);
  });
  return set;
}

const DashboardPage = () => {
  const [tab, setTab] = useState('food');
  const [date, setDate] = useState(todayISO());
  const [startTime, setStartTime] = useState('09:00'); // Default start time
  const [userEmail, setUserEmail] = useState('');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedIds, setSelectedIds] = useState(new Set());

  const [addOpen, setAddOpen] = useState(false);
  const [newType, setNewType] = useState('food');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    // Retrieve the actual User ID/Email stored during login
    const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    setUserEmail(email || '');
  }, []);

  const selectedItemsArray = useMemo(() => {
    return Array.from(selectedIds);
  }, [selectedIds]);

  async function loadData() {
    setLoading(true);
    try {
      const [itemsRes, menuRes] = await Promise.all([
        fetch(`/api/items?type=${tab}`).then((r) => r.json()),
        userEmail
          ? fetch(`/api/daily-menu?date=${encodeURIComponent(date)}&userEmail=${encodeURIComponent(userEmail)}`).then((r) => r.json())
          : Promise.resolve({ menu: { items: [] } }),
      ]);

      setItems(itemsRes.items || []);

      const menuItems = menuRes?.menu?.items || [];
      setStartTime(menuRes?.menu?.startTime || '09:00'); // Set startTime from fetched menu
      const idSet = normalizeItems(menuItems);
      setSelectedIds(idSet);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load when tab/date/user changes
    if (!userEmail) {
      // still allow viewing items, but selection can't persist
      setLoading(false);
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, date, userEmail]); // Removed timeSlot from dependencies

  const toggleSelect = (item) => {
    const id = String(item._id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const saveMenu = async () => {
    if (!userEmail) return;
    setSaving(true);
    try {
      const res = await fetch('/api/daily-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          date,
          startTime, // Send startTime
          items: selectedItemsArray,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to save');
      }

      await loadData();
      setDialogTitle('Success');
      setDialogMessage('Daily menu updated successfully!');
      setDialogOpen(true);
    } catch (e) {
      console.error(e);
      setDialogTitle('Error');
      setDialogMessage('Failed to save menu: ' + e.message);
      setDialogOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const openAdd = () => {
    setNewType(tab);
    setNewName('');
    setNewDescription('');
    setNewImage('');
    setNewPrice('');
    setAddOpen(true);

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createItem = async () => {
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: newType,
        name: newName,
        description: newDescription,
        image: newImage,
        price: Number(newPrice || 0),
        createdBy: userEmail || '',
      }),

    });
    setAddOpen(false);
    await loadData();
    setDialogTitle('Success');
    setDialogMessage('New item created successfully!');
    setDialogOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0B1220',
        color: '#EAF0FF',
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          background: 'linear-gradient(145deg, #12192b 0%, #080d1a 100%)',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', background: 'rgba(255,255,255,0.02)' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #FF7E5F, #FEB47B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Canteen Console
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(234,240,255,0.5)', fontWeight: 500, mt: 0.5 }}>
              Manage daily availability for Central Facility Building
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <TextField
              variant="filled"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, input: { color: '#EAF0FF', py: 1.5 } }}
            />
            <TextField
              variant="filled"
              type="time"
              label="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2,
                input: { color: '#EAF0FF', py: 1.5 },
                '.MuiInputLabel-root': { color: 'rgba(234,240,255,0.5)', fontWeight: 700 }
              }}
            />
            <Button
              variant="contained" size="large"
              onClick={saveMenu}
              disabled={!userEmail || saving}
              sx={{ borderRadius: 3, px: 4, bgcolor: '#FF7E5F', fontWeight: 800, '&:hover': { bgcolor: '#FF4A35' } }}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 1 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="inherit" indicatorColor="secondary" sx={{ '& .MuiTabs-indicator': { backgroundColor: '#FF7E5F' } }}>
              <Tab value="food" label="Food" />
              <Tab value="drink" label="Drink" />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {!userEmail && (
                <Chip size="small" label="Login to save" sx={{ bgcolor: 'rgba(255,126,95,0.18)', color: '#FFCEBC' }} />
              )}
              <Button variant="outlined" onClick={openAdd} sx={{ borderColor: 'rgba(255,126,95,0.7)', color: '#FFCEBC' }} startIcon={<AddIcon />}>
                Add Item
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.08)' }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: '#FF7E5F' }} />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {items.map((item) => {
                const selected = selectedIds.has(String(item._id));
                return (
                  <Grid item xs={12} sm={6} md={4} key={String(item._id)}>
                    <Card
                      onClick={() => toggleSelect(item)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: selected ? 'rgba(255,126,95,0.12)' : 'rgba(255,255,255,0.04)',
                        border: selected ? '1px solid rgba(255,126,95,0.75)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 3,
                        transition: 'transform .15s ease, border-color .15s ease',
                        '&:hover': { transform: 'translateY(-2px)' },
                      }}
                    >
                      <CardMedia component="img" height="120" image={item.image || '/download.png'} alt={item.name} />
                      <CardContent sx={{ p: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                          <Typography sx={{ fontWeight: 800, fontSize: 14 }} noWrap>
                            {item.name}
                          </Typography>
                          <Chip size="small" label={selected ? 'Selected' : 'Select'} sx={{ bgcolor: selected ? 'rgba(255,126,95,0.22)' : 'rgba(255,255,255,0.08)', color: '#EAF0FF' }} />
                        </Box>

                        <Typography variant="body2" sx={{ color: 'rgba(234,240,255,0.7)', mt: 0.5, minHeight: 20 }} noWrap>
                          {item.description || ''}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFCEBC' }}>
                            Rs. {item.price}
                          </Typography>
                          <Button
                            size="small"
                            variant={selected ? 'contained' : 'outlined'}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelect(item);
                            }}
                            sx={{
                              bgcolor: selected ? '#FF7E5F' : 'transparent',
                              borderColor: selected ? '#FF7E5F' : 'rgba(255,126,95,0.6)',
                              color: selected ? '#0B1220' : '#FFCEBC',
                            }}
                          >
                            {selected ? 'Added' : 'Add'}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              {items.length === 0 && (
                <Grid item xs={12}>
                  <Typography sx={{ color: 'rgba(234,240,255,0.7)' }}>No items found. Click “Add Item”.</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>Add new Food/Drink item</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 0.5 }}>
            <ToggleButtonGroup value={newType} exclusive onChange={(_, v) => v && setNewType(v)} size="small" sx={{ alignSelf: 'flex-start' }}>
              <ToggleButton value="food">Food</ToggleButton>
              <ToggleButton value="drink">Drink</ToggleButton>
            </ToggleButtonGroup>

            <TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} size="small" />
            <TextField label="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} size="small" />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ borderColor: 'rgba(255,126,95,0.7)', color: '#FFCEBC' }}
              >
                Upload Image
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
              </Button>
              {newImage && (
                <Box 
                  component="img" 
                  src={newImage} 
                  sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
                />
              )}
            </Box>

            <TextField
              label="Or Image URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              size="small"
              placeholder="e.g. /a1.jpg"
            />

            <TextField
              label="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              size="small"
              placeholder="e.g. 50"
            />

            <Typography variant="caption" sx={{ color: 'rgba(234,240,255,0.7)' }}>
              Image upload can be added later; currently we store image as a URL/string.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)} variant="outlined">Cancel</Button>
          <Button
            onClick={createItem}
            disabled={!newName}
            variant="contained"
            sx={{ bgcolor: '#FF7E5F', '&:hover': { bgcolor: '#FF4A35' } }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
