import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import User from '@/Models/User';
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ userRole }: { userRole: string }) => {
  const [auth, setAuth] = useState(false);
  const router = useRouter() ;
  useEffect(() => {
    const storedUser = localStorage.getItem('myuser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email && userRole === parsedUser.email) {
        setAuth(true);
      }
    }else{
      router.push('/')
    }
  }, [userRole]);
  return (
    <div>
      <Head>
        <title>CollegeName</title>
        <meta name='description' content='College for supporting the students' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="">
        {auth && <div className='fixed lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2 z-20'>
          <Link href={'/admin/adminPanel'}><button className='flex mr-2 text-white bg-blue-500  border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded lg:text-lg'>
            AdminDashboard
          </button></Link>
        </div> }
        
        <section className="h-screen relative">
          <img className="absolute -z-10 inset-0 w-full h-full object-cover bg-black opacity-80" src="/Home1.jpg" alt="Home" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Link href={"/Form"}>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-blue-900 cursor-pointer">College Zone</h1>
            </Link>
            <p className="lg:w-1/2 w-full leading-relaxed text-black font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-black font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-black font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-black font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </section>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx={6} cy={6} r={3} />
                    <circle cx={6} cy={18} r={3} />
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
export default Home ;
export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || ' ');
  }

  try {
    // Find the user with role equal to 1
    const user = await User.findOne({ role: process.env.auth });

    // Extract userRole from user if found, otherwise set to null
    const userRole = user ? user.email : null;

    return {
      props: {
        userRole, // Ensure userRole is included in the props object
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        userRole: null,
      },
    };
  }
};
