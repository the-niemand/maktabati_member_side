import React from 'react'
import library from '../../assets/clay-banks-GX8KBbVmC6c-unsplash (1).jpg'
import { Container } from '@mui/material'

function About() {
  return (
    <Container
      maxWidth="lg"
      sx={{ my: 8, display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", gap: "5rem" , }}
    >
      <div className='flex gap-4 mx-20'>
        <div className='w-[65%] rounded-md overflow-hidden'>
          <img src={library} className='w-full h-full' />
        </div>
        <div className=' flex flex-grow-1 flex-col justify-between gap-3'>

          <div className='bg-yellow-400 bg-opacity-20 h-fit rounded-md flex flex-col items-start justify-start gap-5 p-6'>
            <h1 className='text-[23px] font-Poppins font-extra ml-2'>About Our Library</h1>
            <h1 className='text-[19px] font-Poppins font-medium'>Welcome to <span className='text-[23px] text-yellow-500 font-bold'>Maktabati</span>, your gateway to endless knowledge and resources</h1>
            <div>
              <p>Maktabati has been committed to serving the community with a wide array of books and digital resources. The idea for our web app emerged in 2024, aiming to bring library services to your fingertips.</p>
              <p>Our mission is to foster a love for reading and learning by providing easy access to diverse resources.</p>
            </div>
          </div>

          <div className='bg-yellow-400 bg-opacity-20  h-fit rounded-md flex flex-col items-start justify-start gap-2 p-6'>
            <h1 className='text-[15px] font-Poppins font-bold'>We believe in </h1>
            <div className='pl-3'>
              <p className='text-[12px] font-Poppins font-bold'>Inclusivity: Welcoming all readers.</p>
              <p className='text-[12px] font-Poppins font-bold'>Accessibility: Making resources available to everyone.</p>
              <p className='text-[12px] font-Poppins font-bold'>Innovation: Continuously improving our services.</p>
              <p className='text-[12px] font-Poppins font-bold'>Community: Building a network of readers and learners.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1661.760461709899!2d-7.597131700309811!3d33.591786002096605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6eb0ffffff%3A0x7cc953cad0c53b6d!2sCommune%20Urbaine%20Essoukour%20Assawda!5e0!3m2!1sen!2sma!4v1716480214868!5m2!1sen!2sma" className='w-[87%] rounded-md border border-neutral-400' height="250" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </Container>
  )
}

export default About