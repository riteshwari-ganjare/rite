"use client";

import React, { useState, Suspense } from "react";
import { Box, Container, Typography, Grid, Divider, Card, CircularProgress } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import { images, data, bot, items } from "./data";
import * as page1 from "./page1";
import Front from "@/components/Front";

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
        boxShadow: "3px 4px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px 8px 0 0",
        borderBottom: "2px solid #FF645A",
        transition: "transform 0.3s ease-in-out",
      }}
      loading="lazy"
    />
  </div>
));

OfferImage1.displayName = "OfferImage1";

const ImageSlider = React.memo(({ onCategorySelect }) => (
  <>
    <Typography variant="h5" sx={page1.head1}>
      Begin your journey to health with the crisp, vibrant taste of farm-fresh vegetables near you.
    </Typography>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflowX: "auto",
        display: "flex",
        flexDirection: "row",
        paddingBottom: "10px",
        gap: "10px",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            flexShrink: 0,
            padding: "8px",
            boxSizing: "border-box",
            color: "#000",
            cursor: "pointer",
          }}
          onClick={() => onCategorySelect(image.title)}
        >
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              pb: "2px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
              borderBottom: "1px solid #FF7E5F",
            }}
          >
            <Image
              src={image.image}
              alt={image.alt}
              width={200}
              height={100}
              priority={index === 0}
              style={{ objectFit: "cover", transition: "transform 0.3s ease-in-out" }}
            />
            <Typography sx={{ textAlign: "center", marginTop: "8px" }}>
              {image.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </>
));

ImageSlider.displayName = "ImageSlider";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleCategorySelect = (category) => setSelectedCategory(category);

  const filteredImages = images.find((category) => category.title === selectedCategory)?.items || [];
  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, 4);

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
              "url": window.location.href,
              "description": "Find fresh vegetables and produce curated by riteshwari ganjare.",
            }),
          }}
        />
      </Head>

      <Front items={items} images={images} data={data} />

      <Box sx={{ background: "#fff", marginTop: "60px" }}>
        <Container>
          <ImageSlider onCategorySelect={handleCategorySelect} />
        </Container>
      </Box>
      <Box sx={{ background: "#000" }}> </Box>
      <Container >
        <Box sx={page1.b1}>
          <Typography variant="h5" sx={page1.head1}>
            {selectedCategory ? `Find Fresh Vegetables in ${selectedCategory}` : ""}
          </Typography>
          <Link href="/" passHref>
            <Typography sx={page1.seeMore} onClick={() => setShowAll(prev => !prev)}>
              {selectedCategory ? (showAll ? "Show Less" : "See All") : ""}
            </Typography>
          </Link>
        </Box>

        <Grid container spacing={2}>
          {visibleImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "240px",
                  boxShadow: "none",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
                }}
              >
                <Box>
                  <OfferImage1 src={image.src} alt={image.alt} />
                </Box>
                <Box sx={{ padding: "8px", flex: 1, position: "relative" }}>
                  <Typography variant="h4" sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 700 }}>
                    {image.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray", marginBottom: "8px" }}>
                    {image.price}
                  </Typography>
                  {image.off && <Typography sx={page1.off}>{image.off}</Typography>}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#8cbb0f",
                      borderRadius: "2px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#fff",
                      padding: "3px 6px",
                    }}
                  >
                    {image.rating}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ width: "100%", my: 2 }} />

      <Suspense fallback={<CircularProgress color="primary" />}>
        <Available images={images} />
      </Suspense>
    </>
  );
};

export default Page;
