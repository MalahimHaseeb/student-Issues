import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [friend, setFriend] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, email, password, friend };
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      setEmail('');
      setName('');
      setFriend('');
      setPassword('');
      if (response.success) {
        toast.success('Your account is created', { duration: 3000 });
        await router.push('/login');
      } else {
        toast.error('Invalid Properties', { duration: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server Error', { duration: 3000 });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'friend') {
      setFriend(value.toLowerCase());
    }
  };

  const seePassword = () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  return (
    <>
      <Head>
        <title>Signup for your Account - CodeThreads</title>
        <meta name='description' content='visit this page if you want to create your account' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="flex  h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            OR{' '}
            <Link href="login"className="font-semibold leading-6 text-blue-600 hover:text-blue-500">Login
            </Link>
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="friend" className="block text-sm font-medium leading-6 text-gray-900">
                Friend Name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Name of your favorite friend?"
                  onChange={handleChange}
                  value={friend}
                  id="friend"
                  name="friend"
                  type="text"
                  autoComplete="friend"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Set Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div onClick={seePassword} className="mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-gray-500 font-bold" htmlFor="remember">
                    <input className="leading-tight" type="checkbox" id="remember" name="remember" />
                    <span className="text-sm font-medium leading-6 text-gray-900 mx-2">See password</span>
                  </label>
                </div>
                <div></div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
