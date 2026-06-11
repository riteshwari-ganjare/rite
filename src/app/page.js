"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Box, Container, Typography, Grid, Divider, Card, CircularProgress, Chip } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { images, data, items } from "./data";
import * as page1 from "./page1";
import Front from "@/components/Front";

/**
 * World-class optimization: 
 * Added a small helper to handle price formatting consistently 
 * and made the item filtering dynamic based on the selected category.
 */

const todayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const Available = dynamic(() => import("@/components/Available"), { suspense: true });
const Bottom = dynamic(() => import("@/components/Bottom"), { suspense: true });

const OfferImage1 = React.memo(({ src, alt }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <Image
      src={src}
      alt={alt}
      width={500}
      height={140}
      style={{
        objectFit: "cover",
        display: "block",
        margin: "auto",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
        borderRadius: "16px 16px 0 0",
        borderBottom: "none",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      loading="lazy"
    />
  </div>
));

OfferImage1.displayName = "OfferImage1";

const Page = () => {
  const [showAll, setShowAll] = useState(false);
  const [location, setLocation] = useState('Central Facility Building');
  const [allItems, setAllItems] = useState([]);
  const [dynamicItems, setDynamicItems] = useState(items);
  const [dynamicImages, setDynamicImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [allBranches, setAllBranches] = useState([
    { name: 'Central Facility Building', address: 'MIHAN SEZ, Nagpur, Maharashtra 441108' },
    { name: 'Mihan Branch', address: 'Sector 20, Mihan, Nagpur, Maharashtra 441108' },
    { name: 'Tech Park Canteen', address: 'IT Park, Parsodi, Nagpur, Maharashtra 440022' },
    { name: 'Remote Site A', address: 'Wardha Road, Outer Ring Road, Nagpur 441108' }
  ]);

  const FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Food', value: 'food' },
    { label: 'Drink', value: 'drink' },
    { label: 'Cake', value: 'cake' },
    { label: 'Ice Cream', value: 'icecream' },
  ];

  useEffect(() => {
    async function fetchLatestMenu(loc) {
      try {
        const res = await fetch(`/api/daily-menu?date=${todayISO()}&userEmail=riteshwari&location=${encodeURIComponent(loc)}`);
        if (!res.ok) throw new Error();
        const result = await res.json();
        if (result?.menu?.items?.length > 0) {
          const mapped = result.menu.items.map(item => ({
            id: item._id,
            title: item.name,
            price: `Rs. ${item.price || 0}`,
            src: item.image || '/download.png',
            rating: '5.0',
            alt: item.name,
            type: item.type || 'food',
          }));
          setAllItems(mapped);
          setDynamicItems(result.menu.items.map(item => ({ title: item.name, description: item.description || 'Freshly prepared for you.' })));
          setDynamicImages([{ title: "Today's Specials", location: loc, time: result.menu.startTime, day: 'Today', items: mapped.map(i => ({ title: i.title, price: i.price })) }]);
          setActiveFilter('all');
        } else {
          setAllItems([]);
          setDynamicItems([]);
          setDynamicImages([]);
        }
      } catch (error) {
        console.error("Failed to fetch daily menu:", error);
        setAllItems([]); setDynamicItems([]); setDynamicImages([]);
      }
    }
    fetchLatestMenu(location);
  }, [location, allBranches]); // Added allBranches to dependencies to re-fetch if branches change and location needs adjustment

  useEffect(() => {
    // Load custom branches from local storage on mount
    const saved = localStorage.getItem('canteen_branches');
    if (saved) {
      try {
        const parsedBranches = JSON.parse(saved);
        if (Array.isArray(parsedBranches) && parsedBranches.length > 0) {
          setAllBranches(parsedBranches);
          // If the current location is not in the loaded branches, default to the first one
          if (!parsedBranches.some(b => b.name === location)) {
            setLocation(parsedBranches[0].name);
          }
        }
      } catch (e) { console.error("Failed to parse branches from localStorage", e); }
    }
  }, []); // Run once on mount

  const filteredItems = activeFilter === 'all' ? allItems : allItems.filter(i => i.type === activeFilter);
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 4);

  return (
    <>
      <Front
        items={dynamicItems}
        images={dynamicImages} // This still passes the daily menu details for the current location
        branchOptions={allBranches.map(branch => ({ title: branch.name, name: branch.name, address: branch.address }))} // Pass all branches for Autocomplete
        data={data}
        onBranchSelect={(branchName) => {
          setLocation(branchName);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Removed the ImageSlider section */}
      
      <Box sx={{ background: "#000" }}> </Box>
      <Container>
        <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1a1a1a', fontWeight: 900, letterSpacing: '-0.04em', mb: 0.5 }}>
            Chef's Daily Specials — {location}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999', mb: 3, textTransform: 'uppercase', letterSpacing: 2, fontSize: 10, fontWeight: 700 }}>Handpicked for a Royal Experience</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {FILTERS.map(f => (
              <Chip
                key={f.value}
                label={f.label}
                onClick={() => { setActiveFilter(f.value); setShowAll(false); }}
                sx={{
                  fontWeight: 800,
                  fontSize: '13px',
                  bgcolor: activeFilter === f.value ? '#FF7E5F' : '#fff',
                  border: activeFilter === f.value ? 'none' : '1px solid rgba(0,0,0,0.08)',
                  color: activeFilter === f.value ? '#fff' : '#333',
                  '&:hover': { bgcolor: activeFilter === f.value ? '#FF4A35' : 'rgba(0,0,0,0.04)' },
                  cursor: 'pointer',
                  px: 1, height: 36
                }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={2}>
          {visibleItems.length > 0 ? (
            visibleItems.map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden', height: '300px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { boxShadow: '0px 15px 35px rgba(0,0,0,0.08)', transform: 'translateY(-6px)' } }}>
                  <Box sx={{ height: '160px', overflow: 'hidden' }}>
                    <OfferImage1 src={image.src} alt={image.alt} />
                  </Box>
                  <Box sx={{ padding: '20px', flex: 1, position: 'relative' }}>
                    <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 900, mb: 0.2, color: '#1a1a1a' }}>{image.title}</Typography>
                    <Typography variant="body1" sx={{ color: '#FF7E5F', fontWeight: 900, fontSize: '18px' }}>
                      {image.price.includes('Rs.') ? image.price : `₹ ${image.price}`}
                    </Typography>
                    <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: 'rgba(76,175,80,0.1)', color: '#2E7D32', borderRadius: '8px', fontSize: '12px', fontWeight: 900, px: 1.5, py: 0.75 }}>★ {image.rating}</Box>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h5" sx={{ color: '#ced4da', fontWeight: 700 }}>Our Kitchen is currently preparing today's specials.</Typography>
            </Grid>
          )}
        </Grid>
        {filteredItems.length > 4 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Chip label={showAll ? 'Show Less' : `See All (${filteredItems.length})`} onClick={() => setShowAll(p => !p)}
              sx={{ fontWeight: 700, bgcolor: '#FF7E5F', color: '#fff', px: 2, cursor: 'pointer', '&:hover': { bgcolor: '#FF4A35' } }} />
          </Box>
        )}
      </Container>

      <Divider sx={{ width: "100%", my: 2 }} />

      <Suspense fallback={<CircularProgress color="primary" />}>
        <Available images={allBranches.map(branch => ({ title: branch.name, address: branch.address }))} />
      </Suspense>
    </>
  );
};

export default Page;
