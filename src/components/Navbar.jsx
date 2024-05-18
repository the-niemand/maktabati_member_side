import React from 'react';
import logo from '/open-book.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const Navbar = () => {
    const URL = import.meta.env.VITE_URL_API;
    const Listyle = "text-[13px] border-2 border-white font-Poppins bg-opacity-30 py-1 px-3 rounded-full cursor-pointer hover:border-yellow-200";
    const path = window.location.pathname;
    const list = ['Browse', 'Catalog', 'Saved', 'About'];
    const navigate = useNavigate();

    const handleAuth = (isLogout) => {
        if (isLogout) {
            axios.post(`${URL}users/logout`)
                .then(() => {
                    sessionStorage.removeItem('user_id');
                    window.location.href = '/auth';
                })
                .catch(error => {
                    console.error('Logout failed', error);
                });
        } else {
            window.location.href = '/auth';
        }
    };

    const currentLink = {
        '/browse': 1,
        '/catalog': 2,
        '/saved': 3,
        '/about': 4
    }[path] || 0;

    return (
        <div className='grid grid-cols-3 py-5'>
            <div className='flex items-center justify-center'>
                <ul className='flex gap-4'>
                    {list.map((item, index) => (
                        <li key={index}
                            className={`${Listyle} ${index + 1 === currentLink ? 'bg-yellow-400 font-bold' : 'font-medium'}`}
                            onClick={() => navigate(item.toLowerCase())}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex justify-center items-center space-x-2 hover:opacity-60 transition-colors cursor-pointer duration-100'>
                <img src={'https://see.fontimg.com/api/renderfont4/4n7xD/eyJyIjoiZnMiLCJoIjo4MSwidyI6MTI1MCwiZnMiOjY1LCJmZ2MiOiIjRjhEMjIwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/TWFrdGFiYXRp/radeil-3d-demo-ruderight.png'} onClick={() => navigate("browse")} className='w-auto h-8' alt="Logo" />
            </div>

            <div className='flex items-center justify-center gap-2'>
                <div
                    className='flex items-center font-medium text-[13px] font-Poppins justify-center py-2 px-4 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 hover:font-bold transition-colors cursor-pointer duration-100'
                    onClick={() => handleAuth(!!sessionStorage.getItem("user_id"))}>
                    {sessionStorage.getItem("user_id") ? 'Logout' : 'Login'}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
