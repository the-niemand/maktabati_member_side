import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Book from './book';
import axios from 'axios';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import Notfound from '../assets/33752979_8073548.jpg'
import IconNotFound from '../assets/search.png'


const Books = () => {
  const URL = import.meta.env.VITE_URL_API;
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsperpage, setPostsperpage] = useState(16)
  const lastPostIndex = currentPage * postsperpage
  const firstPostIndex = lastPostIndex - postsperpage
  const query = useSelector(state => state.books.query);
  const searchValue = useSelector(state => state.books.query.searchValue);

  useEffect(() => {
    console.log(query);
    const data = query
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${URL}books/fetchFilteredBooks` , data);
        // const response = await axios.post(`http://localhost:5002/books/fetchFilteredBooks` , data);
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
        <h1 className=' font-Poppins text-[18px]'>search for <span className='font-extra text-[24px]'>{searchValue}</span></h1>
      </div>
      <div className='flex gap-12 w-full flex-wrap justify-center'>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <BooksLoading key={index} />
          ))
        ) : (
          booksData.length > 0 ? (
            <>
              {booksData.slice(firstPostIndex, lastPostIndex).map((book) => (
                <Book key={book._id} title={book.title} authors={book.authors} img={book.image} />
              ))}
              <div className='w-full flex items-center justify-center'>
                <Pagination
                  totalPosts={booksData.length}
                  postsPerPage={postsperpage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </>
          ) : (
            <div className='w-full flex flex-col items-center justify-center gap-4 '>
              <img src={Notfound} className='w-[20%]' alt="Not found" />
              <div className='py-3 px-6 rounded-md bg-red-600 flex gap-4 items-center justify-center '>
                <img src={IconNotFound} className='w-7' />
                <h1 className='text-white font-Poppins font-bold text-[20px]'>There is no book with such name</h1>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );


};

function BooksLoading() {
  return (
    <div className='bg-white cursor-pointer flex flex-col gap-3 rounded-md shadow-button p-3 '>
      <div>
        <Skeleton variant="rectangular" sx={{ width: "180px", height: "250px", borderRadius: "0.375rem" }} />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col w-4/5'>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
        </div>
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    </div>
  );
}

export default Books;
