import React from 'react';
import { Container, Typography, Grid, Divider } from '@mui/material';
import * as styles from './styles';
import Link from 'next/link';

const Available = ({ images }) => {
  return (
    <Container sx={{ mt: 4, mb: 8, p: 2 }}>
      <Typography sx={styles.head}>Our services are available in</Typography>
      <Divider sx={{ width: "25px", borderBottom: "2px solid #ff645a" ,marginBottom:"20px"}} />
      <Grid container spacing={2}>
        {images.map((el, index) => (
          <Grid item xs={4} sm={2} md={2} key={index}>
              <Link href="/"  passHref><Typography sx={styles.element}>{el.title}</Typography></Link>

          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default Available;