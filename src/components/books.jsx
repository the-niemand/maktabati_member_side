import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Book from './book';
import axios from 'axios';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import Notfound from '../assets/33752979_8073548.jpg';
import IconNotFound from '../assets/search.png';
import BooksLoading from './BooksLoading';

const Books = () => {
  const URL = import.meta.env.VITE_URL_API;
  const [booksData, setBooksData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsperpage, setPostsperpage] = useState(16);
  const lastPostIndex = currentPage * postsperpage;
  const firstPostIndex = lastPostIndex - postsperpage;
  const query = useSelector(state => state.books.query);
  const searchValue = useSelector(state => state.books.query.searchValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${URL}books/fetchFilteredBooks`, query);
        setBooksData(response.data.data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [URL, query]);

  return (
    <>
      <div>
        <h1 className='font-Poppins text-[18px]'>search for <span className='font-extra text-[24px]'>{searchValue}</span></h1>
      </div>
      <div className='flex gap-10 w-full flex-wrap justify-center'>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <BooksLoading key={index} />
          ))
        ) : (
          booksData && booksData.length > 0 ? (
            <>
              {booksData.slice(firstPostIndex, lastPostIndex).map((book) => (
                <Book showSave={true} key={book._id} book_id={book._id} title={book.title} authors={book.authors} img={book.image} />
              ))}
              {booksData.length > 8 && (
                <div className='w-full flex items-center justify-center'>
                  <Pagination
                    totalPosts={booksData.length}
                    postsPerPage={postsperpage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <div id="notFound" className='w-full flex flex-col items-center justify-center gap-4'>
                <img src={Notfound} className='w-[20%]' alt="Not found" />
                <div className='py-3 px-6 rounded-md bg-red-600 flex gap-4 items-center justify-center'>
                  <img src={IconNotFound} className='w-7' />
                  <h1 className='text-white font-Poppins font-bold text-[20px]'>There is no book with such name</h1>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
};


export default Books;
