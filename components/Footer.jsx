import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';

const Footer = () => {
  const router = useRouter();
  return (


    !router.pathname.startsWith('/admin') && <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">Jamiyat</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/" className="hover:underline me-4 md:me-6">Home</Link>
          </li>
          <li>
            <Link href="/Form" className="hover:underline me-4 md:me-6">Issue</Link>
          </li>
          <li>
            <Link href="/myIssue" className="hover:underline me-4 md:me-6">My Issue</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
