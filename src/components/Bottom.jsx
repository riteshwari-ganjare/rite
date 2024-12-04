// import React from 'react';
// import { Container, Typography, Grid, Divider } from '@mui/material';
// import * as styles from './styles';
// import Link from 'next/link';

// const Bottom = ({ bot }) => {
//   return (
//     <Container sx={{ mt: 4, mb: 1, p: 1 }}>
//       <Grid container spacing={2} justifyContent="space-between">
//         {bot.map((category, index) => (
//           <Grid 
//             item 
//             xs={12} 
//             sm={2} 
//             md={2} 
//             lg={2} 
//             key={index}
//             sx={{ px: 1 }} 
//           >
//             <Typography sx={styles.head}>
//               <strong>{category.category}</strong>
//             </Typography>

//             <Divider sx={{ width: "25px", borderBottom: "2px solid #ff645a", marginBottom: "10px" }} />

//             <Grid container spacing={1} sx={{ mt: 1 }}>
//               {category.subcategories.map((sub, subIndex) => (
//                 <Grid item xs={12} key={subIndex}>
//                   <Typography sx={styles.element}>
//                     <Link href="/"  passHref>{sub.name}</Link>

//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Bottom;
