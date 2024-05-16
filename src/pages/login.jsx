import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import {
     Input, InputGroup, InputRightElement,
     Button, Checkbox
} from '@chakra-ui/react';



const Login = () => {

     const URL = import.meta.env.VITE_URL_API;


     const [data, setData] = useState({
          email: '',
          password: ''
     });

     const login = async (e) => {
          e.preventDefault();
          if (data.email && data.password) {
               try {
                    console.log(URL);
                    const response = await axios.post(`${URL}users/login`, data);
                    console.log(response);
                   
               } catch (error) {
                    console.log('Error:', error);
               }
          }
     };

     const handleValueChanges = (e) => {
          const { name, value } = e.target;
          setData(prevData => ({
               ...prevData,
               [name]: value
          }));
     };

     return (
          <div className="flex bg-white h-4/6 w-3/6 rounded overflow-hidden shadow-lg">
               <div className='h-full w-[80%] rounded-r-xl overflow-hidden'>
                    <img className="h-full w-full object-cover" src="https://img.freepik.com/free-vector/book-shelves-dtcorative-colorful-icon-poster_1284-6714.jpg" alt="Bookshelves" />
               </div>
               <form onSubmit={login} className='w-full flex flex-col gap-5 items-center justify-center py-12 px-7'>
                    <div className='flex flex-col gap-1 items-center justify-center'>
                         <h1 className='text-3xl font-bold'>Welcome Back !</h1>
                         <p>please enter your details</p>
                    </div>
                    <div className='w-full flex flex-col items-start gap-2'>
                         <label className='font-medium text-sm'>Email Address</label>
                         <Input name="email" placeholder='Email' type='email' focusBorderColor='yellow.400' size='md' width={"full"} onChange={handleValueChanges} />
                    </div>
                    <div className='w-full flex flex-col items-start gap-2'>
                         <label className='font-medium text-sm'>Password</label>
                         <PasswordInput onChange={handleValueChanges} />
                    </div>
                    <div className='w-full flex items-start justify-between'>
                         <Checkbox size='sm'>
                              <label>Remember me</label>
                         </Checkbox>
                         <a className='text-sm text-zinc-800 hover:text-violet-800 hover:underline cursor-pointer'> Forget Password ?</a>
                    </div>
                    <Button isLoading={false} color={'white'} colorScheme={'yellow'} width={"100%"} variant='solid' type="submit">
                         Login
                    </Button>
                    <p className='text-sm'>By creating an account, you agree to our <span className='text-blue-700'>Terms and Service</span> and <span className='text-blue-700'>Privacy Policy</span></p>
               </form>
          </div>
     );
};

function PasswordInput({ onChange }) {
     const [show, setShow] = useState(false);
     const handleClick = () => setShow(!show);

     return (
          <InputGroup size='md'>
               <Input pr='4.5rem'
                    name="password"
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password' focusBorderColor='yellow.400' size='md' width={"full"} onChange={onChange} />

               <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                         {show ? 'Hide' : 'Show'}
                    </Button>
               </InputRightElement>
          </InputGroup>
     );
}

export default Login;
