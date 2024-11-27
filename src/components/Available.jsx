import React from 'react';
import { Container, Typography, Grid, Divider } from '@mui/material';
import * as styles from './styles';
import Link from 'next/link';

const Available = ({ city }) => {
  return (
    <Container sx={{ mt: 4, mb: 8, p: 1 }}>
      <Typography sx={styles.head}>Available in</Typography>
      <Divider sx={{ width: "25px", borderBottom: "2px solid #ff645a" ,marginBottom:"20px"}} />
      <Grid container spacing={2}>
        {city.map((el, index) => (
          <Grid item xs={12} sm={2} md={2} key={index}>
              <Link href="/"  passHref><Typography sx={styles.element}>{el}</Typography></Link>

          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default Available;