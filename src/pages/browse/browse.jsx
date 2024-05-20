/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import FilterAndSearch from '../../components/FilterAndSearch';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Books from '../../components/books';
import { setHasToggled } from '../../../redux/Slice';


function Browse() {
  const onSearch = useSelector(state => state.books.onSearch);
  const hasToggled = useSelector(state => state.books.hasToggled);
  const dispatch = useDispatch()
  const [showBooks, setShowBooks] = useState(false);
  

  
  const containerStyles = css`
    transition: margin-top 0.5s ease-in-out;
    margin-top: ${hasToggled && onSearch ? '-18rem' : '0'};
  `;

  useEffect(() => {
    if (onSearch) {
      dispatch(setHasToggled(true))
      const timer = setTimeout(() => {
        setShowBooks(true);
      }, 500); // Wait for the transition to complete (0.5s)

      return () => clearTimeout(timer); // Cleanup the timeout if onSearch changes
    } else {
      setShowBooks(false);
      dispatch(setHasToggled(false))
    }
  }, [onSearch]);

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", pb: "500px" }}
    >
      <div css={containerStyles} className='flex flex-col items-center justify-center gap-6'>
        <Typography
          sx={{ width: "60%", fontFamily: "Source Serif", fontSize: "50px", fontWeight: "400", textAlign: "center" }}
        >
          Maktabati Where Stories Find Their Forever Home
        </Typography>
        <Typography
          color="#3d3d4e"
          sx={{ width: "50%", fontFamily: "Poppins", fontSize: "14px", fontWeight: "400", textAlign: "center" }}
        >
          Maktabati stands as the ultimate hub for unearthing & flaunting literary marvels, housing the globe's most fervent bibliophiles.
        </Typography>
      </div>
      <FilterAndSearch />

      {showBooks && <Books />}
    </Container>
  );
}

export default Browse;
