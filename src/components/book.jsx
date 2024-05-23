import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Book = ({ book_id, title, authors, img, showSave }) => {

  const userID = sessionStorage.getItem("user_id");
  const URL = import.meta.env.VITE_URL_API;
  const [saveIsOnHover, setSaveIsOnHover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        setSaveIsOnHover(true)
        setIsLoading(true)
        const data = {
          userId: userID,
          bookId: book_id
        }
        const response = await axios.get(`${URL}users/checkIsSaved/${data.userId}/${data.bookId}`);
        setIsSaved(response.data.data)
        setSaveIsOnHover(false)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        notify()
      }
    }
    checkIfSaved()
  }, [])


  const handleAuthors = () => {
    if (authors && authors.length > 0) {
      return authors.join(', ');
    } else {
      return "unknown";
    }
  };

  const notify = () => toast.error('Your not currently logged', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });


  const handleSaveBook = async () => {

    if (isSaved) {

      try {

        setSaveIsOnHover(true)
        setIsLoading(true)
        const data = {
          bookId: book_id,
          userId: userID
        }
        const response = await axios.get(`${URL}users/RemoveSaved/${data.userId}/${data.bookId}`);
        setIsSaved(false);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setSaveIsOnHover(false)
        setIsLoading(false)
      }

    } else {
      try {
        setSaveIsOnHover(true)
        setIsLoading(true)
        const data = {
          bookId: book_id,
          userId: userID
        }
        const response = await axios.get(`${URL}users/Saved/${data.userId}/${data.bookId}`);
        setIsSaved(true);
      } catch (error) {
        console.log('Error:', error);
        notify()
      } finally {
        setSaveIsOnHover(false)
        setIsLoading(false)
      }
    }

  }


  return (
    <>
      <div className='h-fit cursor-pointer flex flex-col gap-3 rounded-md bg-white shadow-button p-3 border border-white hover:border-neutral-400 transition-color duration-100'>
        <div className='w-[180px] h-[250px] rounded-md overflow-hidden'>
          <img className="w-full h-full object-cover" src={img} alt="Book Cover" />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <h1 className='font-extra font-Poppins w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap' title={title}>{title}</h1>
            <p className={`text-[11px] font-bold font-Mulish ${showSave ? ("w-[100px]") : ("w-[160px]")} overflow-hidden overflow-ellipsis whitespace-nowrap`} title={handleAuthors()}>
              By {handleAuthors()}
            </p>
          </div>
          {showSave && (
            <div
              onMouseEnter={() => setSaveIsOnHover(true)}
              onMouseLeave={() => setSaveIsOnHover(false)}
              onClick={handleSaveBook}
              className="transition-opacity duration-150"
            >
              <div
                className={saveIsOnHover ? "bg-black bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center" : "flex items-center justify-center rounded-full w-10 h-10"}
                style={{ transition: "background-color 0.15s ease" }}
              >
                {
                  isLoading ? (
                    <CircularProgress color='third' size={20} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={saveIsOnHover || isSaved ? "black" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  )
                }

              </div>
            </div>
          )}

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Book;
