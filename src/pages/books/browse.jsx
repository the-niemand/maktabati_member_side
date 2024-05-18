import React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import FilterAndSearch from '../../components/FilterAndSearch';
import Books from '../../components/books';

function Browse() {
     return (
          <Container maxWidth="lg" sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
               <div className='flex flex-col items-center justify-center gap-6'>
                    <Typography sx={{ width: "60%", fontFamily: "Source Serif", fontSize: "50px", fontWeight: "400", textAlign: "center" }}>
                         Maktabati Where Stories Find Their Forever Home
                    </Typography>
                    <Typography color={"#3d3d4e"} sx={{ width: "50%", fontFamily: "poppins", fontSize: "14px", fontWeight: "400", textAlign: "center" }}>
                         Maktabati stands as the ultimate hub for unearthing & flaunting literary marvels, housing the globe's most fervent bibliophiles.
                    </Typography>
               </div>
               <FilterAndSearch />
          </Container>
     )
}

export default Browse;
