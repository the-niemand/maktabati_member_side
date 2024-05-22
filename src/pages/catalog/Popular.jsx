import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksLoading from '../../components/BooksLoading';
import Book from '../../components/book';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Popular = () => {


     const [booksData, setBooksData] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
   
   
   
     useEffect(() => {
       const fetchData = async () => {
         try {
           setIsLoading(true);
           const response = await axios.get(`https://openlibrary.org/search.json?q=popular&limit=10`);
           setBooksData(response.data.docs);
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
                    Most Popular books
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
                                   <Book showSave={false} key={book._id} title={book.title} authors={book.author_name} img={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                              ))}
                         </Carousel>
                    )
               )}
          </div>
     )
}

export default Popular