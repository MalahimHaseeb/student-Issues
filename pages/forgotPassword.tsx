import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [friend, setFriend] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'friend') {
      setFriend(value.toLowerCase());
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { email, friend };
    try {
      const res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      setEmail('');
      setFriend('');

      if (response.success) {
        toast.success('Password reset', { duration: 3000 });
        setPassword(response.password);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      } else {
        toast.error('Invalid credentials', { duration: 3000 });
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 6000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in reset password', { duration: 3000 });
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password - CodeThreads</title>
        <meta name="description" content="Visit this page if you forgot your password" />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Getting Password of your account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            OR{' '}
            <Link href="signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Signup
            </Link>
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
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
                  autoComplete="email"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="friend" className="block text-sm font-medium leading-6 text-gray-900">
                  Friend Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Name of your favorite friend?"
                  onChange={handleChange}
                  value={friend}
                  id="friend"
                  name="friend"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          {visible && (
            <div>
              <p className="mt-4">Your Password is : {password}</p>
              <Link href={'/login'}>
                <button
                  className="mt-4 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Log in
                </button>
              </Link>
            </div>
          )}
          {invalid && (
            <div>
              <p className="mt-4">Invalid credentials</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
