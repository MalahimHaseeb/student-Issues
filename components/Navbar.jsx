// Import statements
// import Image from "next/image";
// import { Inter } from "next/google-fonts";
// import Head from "next/head";
import Link from "next/link";
import User from '@/Models/User';
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutUser } from '@/Reducers/userReducer';
import { MdAccountCircle } from 'react-icons/md';
import { CgOptions } from 'react-icons/cg';

// Font declaration
// const inter = Inter({ subsets: ["latin"] });

// Navbar component
const Navbar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false); // Separate state for account dropdown
  const [dashboardDropdown, setDashboardDropdown] = useState(false); // Separate state for dashboard dropdown
  const [myUser, setMyUser] = useState(null); // Initialize myUser state to null
  const [auth, setAuth] = useState(false); // Initialize auth state to false

  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('myuser');
    if (userToken) {
      setMyUser(JSON.parse(userToken));
      const parsedUser = JSON.parse(userToken);
      // if (parsedUser.token && userRole === parsedUser.email) {
      //   setAuth(true);
      // } else {
      //   setAuth(false);
      //   router.push('/'); // Redirect to the home page if not logged in or role mismatch
      // }
    } else {
      setMyUser(null);
      router.push('/');
    }
    
  }, []);

  const toggleDashboardDropdown = () => {
    setDashboardDropdown(!dashboardDropdown);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    !router.pathname.startsWith('/admin') && <nav className="bg-white shadow-lg fixed z-50 top-0 w-screen border-gray-200 dark:bg-blue-900" style={{ height: '60px' }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href={'/'} className="self-center text-lg font-semibold whitespace-nowrap text-blue-900  dark:text-blue-500">
          CollegeName
        </Link>
        <div className="flex items-center mr-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="z-50  right-11 top-4 my-4 shadow dark:bg-blue-700 dark:divide-blue-600 ">
            {!myUser && <Link href={'/login'}><MdAccountCircle className="text-3xl text-blue-700 bg-transparent" /></Link>}
          </div>
          {myUser && (
            <div
              className="cursor-pointer flex text-sm md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-600 lg:mr-5"
              onClick={toggleDashboardDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <CgOptions onClick={toggleDashboardDropdown} className="w-8 h-8 text-blue-700" />
            </div>
          )}

{dashboardDropdown && (
  <div className="z-50 fixed lg:top-6 right-2 md:right-2 top-4 md:top-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 md:w-48" id="user-dropdown">
    <div className="px-4 py-3">
      {myUser && <span className="block text-sm text-gray-900 dark:text-white">{myUser.email}</span>}
    </div>
    <ul className="py-2" aria-labelledby="user-menu-button">
      <li>
        <Link href="/myAccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          Account
        </Link>
      </li>
      <li>
        <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          Logout
        </a>
      </li>
    </ul>
  </div>
)}



          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg onClick={toggleMenu} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isOpen && 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="flex flex-col font-medium p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href={'/'}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={'/Form'}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Issue
              </Link>
            </li>
            <li>
              <Link
                href="/myIssue"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                My Issues
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// export const getServerSideProps = async () => {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   try {
//     // Find the user with role equal to 1
//     const user = await User.findOne({ role: process.env.Auth });
    
//     if (!user) {
//       return {
//         redirect: {
//           destination: '/404',
//           permanent: false,
//         }
//       }


//     } else {
//       // If no user with role 1 is found, or you want to restrict access for role 0 as well
//       return {
//         props: {
//           userRole: user.email,
         
//         },
//       };
//     }
//   } catch (error) {
//     // Handle any errors that might occur during the database query
//     console.error('Error:', error);
//     return {
//       props: { userRole },
//     };
//   }
// };
