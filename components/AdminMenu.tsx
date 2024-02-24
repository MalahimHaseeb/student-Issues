import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const AdminMenu: React.FC = () => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleCard = () => {
        setSidebar(!sidebar);
    };

    return (
        <div>
            <div className='fixed lg:right-6 right-2 lg:hidden text-2xl  top-4 sm:top-7 overflow-y-auto '>
                <GiHamburgerMenu onClick={toggleCard} className='cursor-pointer' />
            </div>
            <div ref={ref} className={`z-20  top-0 lg:h-screen lg:w-69 overflow-y-auto w-61 h-screen sideCard fixed py-10 lg:left-0  bg-white shadow-lg  transition-all  px-7  ${sidebar ? 'left-0' : '-left-96'}`}>

                <Link href={'/admin/adminPanel'}><h2 className='font-bold text-xl text-center mb-10'>Admin Panel</h2></Link>

                <span onClick={toggleCard} className="absolute top-4 lg:hidden right-2 cursor-pointer text-2xl text-blue-500"><AiFillCloseCircle /></span>

                <div className="flex flex-col ">
                    <Link href={'/admin/viewUsers'}><div className='w-full text-center justify-center mb-3 rounded checked:bg-blue-500 checked:text-white h-9 hover:bg-blue-500  hover:text-white  font-semibold'> View Users</div></Link>
                    <Link href={'/admin/viewIssues'}><div className='w-full text-center justify-center mb-3 rounded  checked:bg-blue-500 checked:text-white h-9  hover:bg-blue-500  hover:text-white  font-semibold'> View Issues</div></Link>
                    <Link href={'/admin/viewAdmins'}><div className='w-full text-center justify-center mb-3 rounded  checked:bg-blue-500 checked:text-white h-9 hover:bg-blue-500  hover:text-white  font-semibold'>View Admins</div></Link>
                </div>
                <Link href={'/'}>
                          <button className="bg-blue-500 mt-12 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                              HomePage
                          </button>
                </Link>
            </div>
        </div>
    );
};

export default AdminMenu;
