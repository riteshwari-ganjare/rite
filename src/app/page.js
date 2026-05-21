"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Box, Container, Typography, Grid, Divider, Card, CircularProgress } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import { images, data, bot, items } from "./data";
import * as page1 from "./page1";
import Front from "@/components/Front";

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
  const [selectedCategory, setSelectedCategory] = useState(null); // Start with no category selected
  const [showAll, setShowAll] = useState(false);
  const [dynamicImages, setDynamicImages] = useState(images);
  const [dynamicItems, setDynamicItems] = useState(items);

  // Get current URL safely for SEO script
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    async function fetchLatestMenu() {
      try {
        const res = await fetch(`/api/daily-menu?date=${todayISO()}&userEmail=riteshwari`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch daily menu');
        }

        const result = await res.json();
        
        if (result && result.menu && result.menu.items && result.menu.items.length > 0 && result.menu.startTime) {
          const todaysSpecials = {
            title: "Today's Specials",
            // Add day, time, location for Front component if needed, otherwise it will be undefined
            day: "Today",
            time: result.menu.startTime, // Display the startTime from the fetched menu
            location: "Central Facility Building, MIHAN, Nagpur",
            alt: "Today's Specials",
            image: result.menu.items[0].image || "/download.png",
            items: result.menu.items.map(item => ({
              title: item.name,
              price: `Rs. ${item.price || 0}`,
              src: item.image || "/download.png",
              rating: "5.0",
              alt: item.name
            }))
          };
          
          setDynamicImages([todaysSpecials]); // Only Today's Specials
          
          // Update the "We Provide" slider items with canteen items
          setDynamicItems(result.menu.items.map(item => ({
            title: item.name,
            description: item.description || "Freshly prepared for you."
          })));
          // Automatically select Today's Specials to show canteen items instead of default vegetables
          setSelectedCategory("Today's Specials");
        } else {
          throw new Error('No items found');
        }
      } catch (e) { 
        console.error("Failed to fetch menu:", e);
        // Fallback to empty state on error or missing data
        if (dynamicImages.length > 0 || dynamicItems.length > 0) {
          setDynamicImages([]); // No categories to display
          setDynamicItems([]); // No items for the "We Provide" slider
          setSelectedCategory(null); // No category selected
        }
      }
    }
    fetchLatestMenu();
  }, []); // Empty dependency array to run once on mount

  // Filtered items for display will always come from "Today's Specials" if available
  const filteredItemsForDisplay = dynamicImages.find((category) => category.title === "Today's Specials")?.items || [];
  const visibleItemsForDisplay = showAll ? filteredItemsForDisplay : filteredItemsForDisplay.slice(0, 4);

  return (
    <>
      <Head>
        <meta name="description" content={`Find fresh ${selectedCategory || 'vegetables'} near you. Explore offerings by [Your Name].`} />
        <title>{selectedCategory ? `${selectedCategory} - Local Fresh Produce | [Your Name]` : `Local Fresh Produce | [Your Name]`}</title>
        <meta property="og:title" content={selectedCategory ? `${selectedCategory} - Local Fresh Produce | [Your Name]` : `Local Fresh Produce | [Your Name]`} />
        <meta property="og:description" content={`Explore a wide range of fresh ${selectedCategory || 'vegetables'} near you, curated by [Your Name].`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "riteshwari ganjare",
              "url": currentUrl,
              "description": "Find fresh vegetables and produce curated by riteshwari ganjare.",
            }),
          }}
        />
      </Head>

      <Front items={dynamicItems} images={dynamicImages} data={data} />

      {/* Removed the ImageSlider section */}
      
      <Box sx={{ background: "#000" }}> </Box>
      <Container >
        <Box sx={{ ...page1.b1, mt: 8, mb: 4, alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#1a1a1a', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {selectedCategory === "Today's Specials" ? "Chef's Daily Specials" : "Canteen Menu"}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Freshly prepared at Central Facility Building, MIHAN
            </Typography>
          </Box>
          {selectedCategory === "Today's Specials" && filteredItemsForDisplay.length > 4 && (
            <Link href="/" passHref>
              <Typography sx={{ ...page1.seeMore, color: '#FF7E5F', fontWeight: 700 }} onClick={() => setShowAll(prev => !prev)}>
                {showAll ? "Show Less" : "See All"}
              </Typography>
            </Link>
          )}
        </Box>

        <Grid container spacing={2}>
          {visibleItemsForDisplay.length > 0 ? (
            visibleItemsForDisplay.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <Card
                sx={{
                  position: 'relative',
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "340px",
                  boxShadow: "none",
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { boxShadow: "0px 30px 60px rgba(0, 0, 0, 0.12)", transform: 'translateY(-12px)' },
                }}
              >
                <Box sx={{ height: '200px', overflow: 'hidden' }}>
                  <OfferImage1 src={image.src} alt={image.alt} />
                </Box>
                <Box sx={{ padding: "20px", flex: 1, position: "relative" }}>
                  <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 800, mb: 1, color: '#1a1a1a' }}>
                    {image.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#FF7E5F", fontWeight: 800, fontSize: '18px' }}>
                    {image.price.includes('Rs.') ? image.price : `₹ ${image.price}`}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      backgroundColor: "rgba(76, 175, 80, 0.1)",
                      color: "#2E7D32",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 900,
                      px: 1.5, py: 0.75
                    }}
                  >
                    ★ {image.rating}
                  </Box>
                </Box>
              </Card>
            </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h5" sx={{ color: '#ced4da', fontWeight: 700 }}>
                Our Kitchen is currently preparing today's specials.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      <Divider sx={{ width: "100%", my: 2 }} />

      <Suspense fallback={<CircularProgress color="primary" />}>
        <Available images={dynamicImages} />
      </Suspense>
    </>
  );
};

export default Page;
