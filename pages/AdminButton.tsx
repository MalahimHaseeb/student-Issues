import React from 'react';
import Link from 'next/link';

const AdminButton = ({ userRole }: { userRole: string }) => {
  if (!userRole) {
    return null;
  }

  return (
    <div className='fixed cursor-pointer lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2'>
      <Link href='/admin/adminPanel'>
        <button className='flex mr-2 text-white bg-blue-500 z-10 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded lg:text-lg'>
          AdminDashboard
        </button>
      </Link>
    </div>
  );
};
export default AdminButton;
