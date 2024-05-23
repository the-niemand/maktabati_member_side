import { Container, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BooksLoading from '../../components/BooksLoading';
import IconNotFound from '../../assets/search.png';
import Notfound from '../../assets/33752979_8073548.jpg';
import axios from 'axios';

const Saved = () => {
  const URL = import.meta.env.VITE_URL_API;
  const userID = sessionStorage.getItem('user_id');
  const [isLoading, setIsLoading] = useState(false);
  const [booksData, setBooksData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = {
          userId: userID,
        };
        const response = await axios.post(`${URL}books/fetchSavedBooks`, data);
        setBooksData(response.data.books);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [URL, userID]);





  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '2rem', pb: '500px' }}
    >
      <h1 className="text-[23px] font-Poppins font-extra">Saved Books</h1>

      <div className={`flex ${booksData?.length > 1 || isLoading ? 'gap-10' : ''} w-full flex-wrap items-center justify-center`}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <BooksLoading key={index} />)
        ) : booksData?.length > 0 ? (
          <>
            {booksData.map((book) => (
              <Book
                key={book._id}
                id={book._id}
                title={book.title}
                authors={book.authors}
                img={book.image}
                setBooksData={setBooksData}
              />
            ))}
          </>
        ) : (
          <div id="notFound" className="w-full flex flex-col items-center justify-center gap-4">
            <img src={Notfound} className="w-[20%]" alt="Not found" />
            <div className="py-3 px-6 rounded-md bg-yellow-500 flex gap-4 items-center justify-center">
              <img src={IconNotFound} className="w-7" alt="Icon not found" />
              <h1 className="text-white font-Poppins font-bold text-[20px]">There is no book saved</h1>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};



function Book({ id, title, authors, img, setBooksData }) {

  const [hoveredBookId, setHoveredBookId] = useState(null);
  const URL = import.meta.env.VITE_URL_API;
  const userID = sessionStorage.getItem('user_id');
  const [isLoading, setIsLoading] = useState(false);



  const handleAuthors = () => {
    if (authors && authors.length > 0) {
      return authors.join(', ');
    } else {
      return 'unknown';
    }
  };



  const handleDeleteSaveBook = async () => {

    try {
      setIsLoading(true);
      const data = {
        bookId: id,
        userId: userID,
      };


      const res = await axios.get(`${URL}users/RemoveSaved/${data.userId}/${data.bookId}`);
      console.log(res);
      setBooksData(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      key={id}
      className="h-fit cursor-pointer flex flex-col gap-3 rounded-md bg-white shadow-button p-3 border border-white hover:border-neutral-400 transition-color duration-100"
    >
      <div className="w-[180px] h-[250px] rounded-md overflow-hidden">
        <img className="w-full h-full object-cover" src={img} alt="Book Cover" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-extra font-Poppins w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap" title={title}>
            {title}
          </h1>
          <p
            className={`text-[11px] font-bold font-Mulish w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap truncate`}
            title={handleAuthors()}
          >
            By {handleAuthors()}
          </p>
        </div>
        <div
          onClick={handleDeleteSaveBook}
          className="transition-opacity duration-150"
        >
          <div
            className={hoveredBookId === id ? 'bg-black bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center' : 'flex items-center justify-center rounded-full w-10 h-10'}
            style={{ transition: 'background-color 0.15s ease' }}
            onMouseEnter={() => setHoveredBookId(id)}
            onMouseLeave={() => setHoveredBookId(null)}
          >
            {isLoading ? (
              <CircularProgress color="third" size={20} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={'black'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bookmark"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Saved;
