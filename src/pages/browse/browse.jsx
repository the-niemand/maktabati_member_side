/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import FilterAndSearch from '../../components/FilterAndSearch';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Books from '../../components/books';
import { addData, setHasToggled } from '../../../redux/Slice';
import { Toaster, toast } from 'sonner';

function Browse() {
  const onSearch = useSelector(state => state.books.onSearch);
  const hasToggled = useSelector(state => state.books.hasToggled);
  const selectedBook = useSelector(state => state.books.selectedData);
  const dispatch = useDispatch();
  const [showBooks, setShowBooks] = useState(false);
  const userID = sessionStorage.getItem("user_id");

  const containerStyles = css`
    transition: margin-top 0.5s ease-in-out;
    margin-top: ${hasToggled && onSearch ? '-18rem' : '0'};
  `;

  useEffect(() => {
    if (onSearch) {
      dispatch(setHasToggled(true));
      const timer = setTimeout(() => {
        setShowBooks(true);
      }, 500); // Wait for the transition to complete (0.5s)

      return () => clearTimeout(timer); // Cleanup the timeout if onSearch changes
    } else {
      setShowBooks(false);
      dispatch(setHasToggled(false));
    }
  }, [onSearch]);

  const handleAuthors = () => {
    if (selectedBook.authors && selectedBook.authors.length > 0) {
      return selectedBook.authors.join(', ');
    } else {
      return "unknown";
    }
  };

  const handleCategory = () => {
    if (selectedBook.categories && selectedBook.categories.length > 0) {
      return selectedBook.categories.join(', ');
    } else {
      return "unknown";
    }
  };

  const handleReservation = () => {
    if (!userID) {
      toast.error('You are not currently logged in');
    }
  };

  return (
    <>
      {selectedBook && (
        <div className='fixed z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
          <div className='bg-white rounded relative p-4 pr-14 flex gap-5 items-center'>
            <div className='h-[350px] rounded overflow-hidden'>
              <img src={selectedBook.image} alt="book image" className='w-full h-full object-cover' />
            </div>
            <div className='h-[350px] flex flex-col gap-5 justify-center'>
              <div className='absolute right-3 top-3'>
                <svg onClick={() => { dispatch(addData(null)) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 hover:opacity-100 transition duration-200 cursor-pointer feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <h1 title={selectedBook.title} className='text-[23px] font-Poppins font-extra w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{selectedBook.title}</h1>
              <h1 title={selectedBook.type} className='text-[18px] font-Poppins font-bold w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>type {selectedBook.type}</h1>
              <div title={handleAuthors()} className='text-[15px] inline w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>by : <p className='text-[15px] font-Poppins inline font-bold'>{handleAuthors()}</p></div>
              <h1 title={handleCategory()}>category : <p className='text-[15px] font-Poppins inline font-bold w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{handleCategory()}</p></h1>
              <h1>copies available : <p className='text-[15px] font-Poppins inline font-bold'>{selectedBook.copies}</p></h1>

              {selectedBook.status && selectedBook.status == "upcomming" ? (
                <button  className={`cursor-not-allowed bg-red-500 text-white rounded border-2 border-white border-opacity-0 py-1 px-3 text-[15px] shadow-search font-popping font-bold hover:border-red-500 hover:bg-white hover:text-red-500`}>
                  Not Available yet
                </button>
              ) : (
                <button onClick={handleReservation} className={`${selectedBook.copies === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} bg-yellow-400 text-white rounded border-2 border-white border-opacity-0 py-1 px-3 text-[15px] shadow-search font-popping font-bold hover:border-yellow-400 hover:bg-white hover:text-yellow-400`}>
                  reserve
                </button>
              )}
              
            </div>
          </div>
        </div >
      )
      }
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
      <div className='absolute'>
        <Toaster expand={false} position="bottom-right" richColors containerStyle={{ position: 'fixed', bottom: 0, right: 0 }} />
      </div>
    </>
  );
}

export default Browse;
