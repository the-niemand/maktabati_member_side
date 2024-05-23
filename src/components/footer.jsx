import React from 'react'

const Footer = () => {
  return (
     <footer class="bg-yellow-400 w-full shadow px-30 mt-10">
     <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
       <span class="text-sm text-white sm:text-center dark:text-white">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
     </span>
     <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">About</a>
         </li>
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
         </li>
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
         </li>
         <li>
             <a href="#" class="hover:underline">Contact</a>
         </li>
     </ul>
     </div>
 </footer>
  )
}

export default Footer