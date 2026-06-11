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
  LinearProgress,
  Grid,
  Paper,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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
    const id = item?._id ?? item;
    if (id && typeof id === 'string' && id.length === 24) {
      set.add(id);
    }
  });
  return set;
}

const DashboardPage = () => {
  const [tab, setTab] = useState('food');
  const [date, setDate] = useState(todayISO());
  const [location, setLocation] = useState('Central Facility Building');

  const [branches, setBranches] = useState([
    { name: 'Central Facility Building', address: 'MIHAN SEZ, Nagpur, Maharashtra 441108' },
    { name: 'Mihan Branch', address: 'Sector 20, Mihan, Nagpur, Maharashtra 441108' },
    { name: 'Tech Park Canteen', address: 'IT Park, Parsodi, Nagpur, Maharashtra 440022' },
    { name: 'Remote Site A', address: 'Wardha Road, Outer Ring Road, Nagpur 441108' }
  ]);
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');

  const [startTime, setStartTime] = useState('09:00');
  const [userEmail, setUserEmail] = useState('');

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectionKey, setSelectionKey] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [newType, setNewType] = useState('food');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); // 'success' | 'error'

  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    setUserEmail(email || '');
  }, []);

  const selectedItemsArray = useMemo(() => {
    return Array.from(selectedIds);
  }, [selectedIds]);

  async function loadData(resetSelection = false) {
    setLoading(true);
    try {
      const [itemsRes, menuRes] = await Promise.all([
        fetch(`/api/items?type=${tab}`).then((r) => r.json()),
        userEmail
          ? fetch(`/api/daily-menu?date=${encodeURIComponent(date)}&userEmail=${encodeURIComponent(userEmail)}&location=${encodeURIComponent(location)}`).then((r) => r.json())
          : Promise.resolve({ menu: { items: [] } }),
      ]);

      setItems(itemsRes.items || []);

      if (resetSelection) {
        const menuItems = menuRes?.menu?.items || [];
        setStartTime(menuRes?.menu?.startTime || '09:00');
        setSelectedIds(normalizeItems(menuItems));
        setSelectionKey(`${date}__${location}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('canteen_branches');
    if (saved) {
      try {
        setBranches(JSON.parse(saved));
      } catch (e) { console.error("Failed to parse branches", e); }
    }
  }, []);

  const handleAddBranch = () => {
    if (newBranchName.trim() && !branches.some(b => b.name === newBranchName.trim())) {
      const updated = [...branches, { name: newBranchName.trim(), address: newBranchAddress.trim() }];
      setBranches(updated);
      localStorage.setItem('canteen_branches', JSON.stringify(updated));
      setLocation(newBranchName.trim());
      setNewBranchName('');
      setNewBranchAddress('');
      setBranchDialogOpen(false);
    }
  };

  useEffect(() => {
    if (!userEmail) { setLoading(false); return; }
    const key = `${date}__${location}`;
    const isNewContext = key !== selectionKey;
    loadData(isNewContext);
    setSearchTerm('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, date, location, userEmail]);

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
          location,
          startTime,
          items: selectedItemsArray,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to save');
      }

      await loadData(false);
      setDialogType('success');
      setDialogTitle('Success');
      setDialogMessage(`Daily menu for ${location} updated successfully!`);
      setDialogOpen(true);
    } catch (e) {
      console.error(e);
      setDialogTitle('Save Failed');
      setDialogType('error');
      setDialogMessage(e.message);
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
    try {
      const res = await fetch('/api/items', {
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create item');
      }

      setAddOpen(false);
      await loadData(false);
      setDialogType('success');
      setDialogTitle('Success');
      setDialogMessage('New item created successfully!');
      setDialogOpen(true);
    } catch (e) {
      console.error(e);
      setDialogType('error');
      setDialogTitle('Error');
      setDialogMessage('Failed to create item: ' + e.message);
      setDialogOpen(true);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(it => 
      it.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (it.description && it.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [items, searchTerm]);

  const handleSelectAll = () => {
    const next = new Set(selectedIds);
    filteredItems.forEach(it => next.add(String(it._id)));
    setSelectedIds(next);
  };

  const handleClearAll = () => {
    setSelectedIds(new Set());
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8F9FB',
        color: '#1A1A1A',
        p: { xs: 1, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
          background: '#FFFFFF',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.05)', bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #FF7E5F, #FEB47B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Canteen Console
            </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                Manage Daily Availability & Specials
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
               <Typography variant="caption" sx={{ fontWeight: 800, color: '#FF7E5F', mb: 0.5, display: 'block' }}>
                MENU CAPACITY: {selectedIds.size} / 12
               </Typography>
               <LinearProgress 
                 variant="determinate" 
                 value={Math.min((selectedIds.size / 12) * 100, 100)} 
                 sx={{ width: 140, height: 6, borderRadius: 3, bgcolor: 'rgba(255,126,95,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#FF7E5F' } }} 
               />
            </Box>
          </Box>

          {/* Unified Configuration Form */}
          <Paper 
            elevation={0}
            component="form" 
            onSubmit={(e) => { e.preventDefault(); saveMenu(); }}
            sx={{ 
              p: 1.5, 
              borderRadius: '12px', 
              bgcolor: '#F9FAFB', 
              border: '1px solid #EDEDED',
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              flexWrap: 'wrap' 
            }}
          >
            <Box sx={{ flex: 1, minWidth: '200px' }}>
              <Typography variant="caption" sx={{ color: '#FF7E5F', fontWeight: 700, ml: 1, mb: 0.5, display: 'block' }}>DATE</Typography>
              <TextField
                fullWidth
                variant="standard"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ px: 1, borderRadius: '8px', bgcolor: 'transparent', input: { color: '#1A1A1A', py: 1, fontWeight: 600 } }}
                InputProps={{ disableUnderline: true }}
              />
            </Box>

            <Box sx={{ flex: 1.5, minWidth: '240px' }}>
              <Typography variant="caption" sx={{ color: '#FF7E5F', fontWeight: 700, ml: 1, mb: 0.2, display: 'block' }}>BRANCH LOCATION</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, borderRadius: '8px', bgcolor: 'transparent' }}>
                <Select
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="standard"
                  sx={{ color: '#1A1A1A', py: 0.2, fontWeight: 600 }}
                  disableUnderline
                >
                  {branches.map((b) => (
                    <MenuItem key={b.name} value={b.name}>{b.name}</MenuItem>
                  ))}
                </Select>
                <IconButton 
                  size="small"
                  onClick={() => setBranchDialogOpen(true)}
                  sx={{ color: '#FF7E5F', bgcolor: 'rgba(255,126,95,0.1)' }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: '150px' }}>
              <Typography variant="caption" sx={{ color: '#FF7E5F', fontWeight: 700, ml: 1, mb: 0.5, display: 'block' }}>START TIME</Typography>
              <TextField
                fullWidth
                variant="standard"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                sx={{ px: 1, borderRadius: '8px', bgcolor: 'transparent', input: { color: '#1A1A1A', py: 1, fontWeight: 600 } }}
                InputProps={{ disableUnderline: true }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={!userEmail || saving}
              sx={{ 
                  borderRadius: '10px', 
                px: 4, 
                  height: '48px',
                alignSelf: 'flex-end',
                bgcolor: '#FF7E5F', 
                fontWeight: 800, 
                  boxShadow: '0 4px 15px rgba(255,126,95,0.2)',
                '&:hover': { bgcolor: '#FF4A35' } 
              }}
            >
              {saving ? 'Saving...' : 'Sync Menu'}
            </Button>
          </Paper>
        </Box>

        <Box sx={{ p: 3, pt: 2 }}>
          <Box sx={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 2, 
            position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 10, py: 1
          }}>
            <TextField 
              placeholder="Filter items..." 
              size="small" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: { xs: '100%', sm: 250 },
                bgcolor: '#F5F5F5', borderRadius: '12px', input: { color: '#333' } 
              }} 
            />
            <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary" sx={{ '& .MuiTabs-indicator': { backgroundColor: '#FF7E5F', height: 3, borderRadius: '3px' }, '& .MuiTab-root': { fontWeight: 700, color: '#666' }, '& .Mui-selected': { color: '#FF7E5F !important' } }}>
              <Tab value="food" label="Food" />
              <Tab value="drink" label="Drink" />
              <Tab value="cake" label="Cakes" />
              <Tab value="icecream" label="Ice Creams" />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {!userEmail && (
                <Chip size="small" label="Login to save" sx={{ bgcolor: 'rgba(255,126,95,0.1)', color: '#FF7E5F' }} />
              )}
              <Button variant="outlined" onClick={openAdd} sx={{ borderRadius: '10px', borderColor: 'rgba(255,126,95,0.7)', color: '#FFCEBC', '&:hover': { borderColor: '#FF7E5F' } }} startIcon={<AddIcon />}>
                Add Item
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button size="small" onClick={handleSelectAll} sx={{ color: '#666', fontWeight: 700 }}>
              Select All
            </Button>
            <Button size="small" onClick={handleClearAll} sx={{ color: '#666', fontWeight: 700 }}>
              Clear Selection
            </Button>
          </Box>

          <Divider sx={{ mb: 3, borderColor: 'rgba(0,0,0,0.06)' }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: '#FF7E5F' }} />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredItems.map((item) => {
                const selected = selectedIds.has(String(item._id));
                return (
                  <Grid item xs={12} sm={6} md={4} key={String(item._id)}>
                    <Card
                      onClick={() => toggleSelect(item)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: selected ? 'rgba(255,126,95,0.04)' : '#FFFFFF',
                        border: selected ? '1px solid #FF7E5F' : '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '16px',
                        transition: 'all .2s ease',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
                      }}
                    >
                      <CardMedia component="img" height="90" image={item.image || '/download.png'} alt={item.name} sx={{ objectFit: 'cover' }} />
                      <CardContent sx={{ p: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                          <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#1A1A1A' }} noWrap>
                            {item.name}
                          </Typography>
                          <Chip size="small" label={selected ? '✓' : '+'} sx={{ minWidth: 24, height: 24, borderRadius: '6px', bgcolor: selected ? '#FF7E5F' : '#F5F5F5', color: selected ? '#FFF' : '#666', fontWeight: 900 }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#FF7E5F', fontSize: 13 }}>
                            Rs. {item.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              {items.length === 0 && (
                <Grid item xs={12}>
                  <Typography sx={{ color: '#999' }}>No items found. Click &quot;Add Item&quot;.</Typography>
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
              <ToggleButton value="cake">Cake</ToggleButton>
              <ToggleButton value="icecream">Ice Cream</ToggleButton>
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

      {/* Add Branch Dialog */}
      <Dialog open={branchDialogOpen} onClose={() => setBranchDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 900 }}>Add New Branch/Location</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              fullWidth 
              label="Branch Name" 
              value={newBranchName} 
              onChange={(e) => setNewBranchName(e.target.value)} 
              placeholder="e.g. South Campus Canteen"
              autoFocus 
            />
            <TextField 
              fullWidth 
              label="Branch Address" 
              value={newBranchAddress} 
              onChange={(e) => setNewBranchAddress(e.target.value)} 
              placeholder="Enter full address"
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setBranchDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddBranch} 
            variant="contained" 
            disabled={!newBranchName.trim()}
            sx={{ bgcolor: '#FF7E5F', '&:hover': { bgcolor: '#FF4A35' } }}
          >
            Add Branch
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '20px', p: 1, maxWidth: '400px' } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 900, pb: 1 }}>
          {dialogType === 'success' ? (
            <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 28 }} />
          ) : (
            <ErrorIcon sx={{ color: '#f44336', fontSize: 28 }} />
          )}
          {dialogTitle}
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Typography variant="body1" sx={{ color: '#555', fontWeight: 500 }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDialogOpen(false)} 
            variant="contained" 
            sx={{ borderRadius: '10px', bgcolor: dialogType === 'success' ? '#4caf50' : '#f44336', '&:hover': { bgcolor: dialogType === 'success' ? '#388e3c' : '#d32f2f' } }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;