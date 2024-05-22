import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksLoading from '../../components/BooksLoading';
import Book from '../../components/book';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Categories = () => {
  const URL = import.meta.env.VITE_URL_API;
  const [booksData, setBooksData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${URL}books/fetchBooks`);
        setBooksData(response.data.data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [URL]);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 10
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 10  // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 10 // optional, default to 1.
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }} className='flex flex-col gap-5'>
      <h1 className='text-[23px] font-Poppins font-extra ml-2'>
        Book Categories
      </h1>
      {isLoading ? (
       <Carousel
       responsive={responsive}
       containerClass="carousel-container"
       itemClass="carousel-item"
       customTransition="transform 500ms ease-in-out"
       customTransitionDuration={500}
       renderButtonGroupOutside={true}
       slidesToSlide={1}
       partialVisible={true}
       dotListClass="custom-dot-list-style"
       removeArrowOnDeviceType={['tablet', 'mobile']}
       deviceType="desktop"
       style={{ width: '80%', margin: 'auto' }}
   >
       {Array.from({ length: 10 }).map((_, index) => (
           <BooksLoading key={index} />
       ))}
   </Carousel>
      ) : (
        booksData && booksData.length > 0 && (
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"
            itemClass="carousel-item"
            customTransition="transform 500ms ease-in-out"
            customTransitionDuration={500}
            renderButtonGroupOutside={true}
            slidesToSlide={1}
            partialVisible={true}
            dotListClass="custom-dot-list-style"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            deviceType="desktop"
            style={{ width: '80%', margin: 'auto' }}
          >
            {booksData.map((book) => (
              <Book showSave={false} key={book._id} title={book.title} authors={book.authors} img={book.image} />
            ))}
          </Carousel>
        )
      )}
    </div>
  );
};

export default Categories;
