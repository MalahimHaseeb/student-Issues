import React, { useEffect, useState } from 'react';
import AdminMenu from '@/components/AdminMenu';
import { useRouter } from 'next/router';
import User from '@/Models/User';
import mongoose from "mongoose";
import Link from 'next/link';

interface Props {
    userRole: string;
}

const adminPanel: React.FC<Props> = ({ userRole }) => {
    const router = useRouter();
    const [admin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('myuser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.token && userRole === parsedUser.email) {
                setAdmin(true);
            } else {
                router.push('/404'); // Redirect to the home page if not logged in
            }
        } else {
            router.push('/404'); // Redirect to the home page if user data is not found
        }
    }, []);

    return (
      <div className="mt-8  flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/4">
          <AdminMenu />
      </div>
      <div className="lg:w-2/4">
          <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Welcome to College Admin Panel</h2>
                  <img className="rounded w-full lg:max-w-lg mx-auto" src="/Home1.jpg" alt="hello" />
                  <div className="mt-4 text-center">
                      <Link href={'/'}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                              HomePage
                          </button>
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
};

export const getServerSideProps = async () => {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI || '');
    }

    try {
        // Find the user with role equal to 1
        const user = await User.findOne({ role: process.env.auth || '' });

        if (!user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            };
        } else {
            // If no user with role 1 is found, or you want to restrict access for role 0 as well
            return {
                props: {
                    userRole: user.email,
                },
            };
        }
    } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error:', error);
        return {
            props: { userRole: '' },
        };
    }
};

export default adminPanel;
