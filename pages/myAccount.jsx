import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { User } from '@/Models/User';

const MyAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ name: '', email: '', password: '', friend: '' });
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      // case 'pincode':
      //   setPincode(value);
      //   break;
      case 'password':
        setPassword(value);
        break;
      case 'newpassword':
        setNewpassword(value);
        break;
      case 'cpassword':
        setCpassword(value);
        break;
      default:
        break;
    }

    // setTimeout(() => {
    //   if (name.length >= 3 && email.length >= 3 &&  address.length >= 3) {
    //     setDisabled(false);
    //   } else {
    //     setDisabled(true);
    //   }
    // }, 100);
  };

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser') || '');
    if (!myuser || !myuser.token) {
      router.push('/');
    } else {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.email, myuser.token); // Pass email and token to fetchData
    }
  }, []);
  
  const fetchData = async (email, token) => { // Modify fetchData to accept email and token
    try {
      const data = { email, token }; // Include email and token in the request body
      const response = await fetch('/api/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const res = await response.json();
      console.log(res); // Log the entire response object
  
      // Set the state with the received user details
      setName(res.name);
      setAddress(res.address);
      setPhone(res.phone);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display an error message to the user
    }
  };
  
  

  const handleUserSubmit = async () => {
    const data = { token: user.token, address, name, phone };
    const response = await fetch('/api/updatedUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    if (res.success) {
      toast.success('Successfully Updated Account');
    } else {
      toast.error('Error in Updating Account');
    }
  };

  const handlePasswordSubmit = async () => {
    let res;
    if (newpassword === cpassword) {
      const data = { token: user.token, password, cpassword, newpassword };
      const response = await fetch('/api/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      res = await response.json();
      setPassword('');
      setNewpassword('');
      setCpassword('');
    } else {
      res = { success: false };
    }
    if (res.success) {
      toast.success('Successfully Updated Password');
    } else {
      toast.error('Error in Updating Password');
    }
  };

  const seePassword = () => {
    const passwordInput = document.getElementById('watchpassword');
    const passwordInput1 = document.getElementById('watchpassword1');
    const passwordInput2 = document.getElementById('watchpassword2');

    if (
      passwordInput.type === 'password' &&
      passwordInput1.type === 'password' &&
      passwordInput2.type === 'password'
    ) {
      passwordInput.type = 'text';
      passwordInput1.type = 'text';
      passwordInput2.type = 'text';
    } else {
      passwordInput.type = 'password';
      passwordInput1.type = 'password';
      passwordInput2.type = 'password';
    }
  };

  return (
    <div className='h-screen'>
      <section className="text-gray-600 body-font relative">
        <div className="container px-2 py-4 mautox-">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Update Your Account</h1>
          </div>
          <div className="lg:w-full md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={name}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    Email (cannot be updated)
                  </label>
                  <input
                    value={user.email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    readOnly
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                    Address
                  </label>
                  <textarea
                    placeholder="please enter your home address in detail..."
                    onChange={handleChange}
                    value={address}
                    id="address"
                    name="address"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="Phone" className="leading-7 text-sm text-gray-600">
                    Phone
                  </label>
                  <input
                    placeholder="Your 10 digit - Phone Number"
                    onChange={handleChange}
                    value={phone}
                    type="text"
                    id="Phone"
                    name="phone"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                  />
                </div>
              </div>
              {/* <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                    PinCode
                  </label>
                  <input
                    onChange={handleChange}
                    value={pincode}
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mx-12">
          <button
            onClick={handleUserSubmit}
            
            className={` bg-blue-500 hover:bg-blue-600'
            } flex mx-auto text-white border-0 py-2 px-4 focus:outline-none rounded text-lg`}
          >
            Submit
          </button>
        </div>
      </section>

      <section className="text-gray-600 body-font relative">
        <div className="container px-2 py-4 mautox-">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Change Your Password</h1>
          </div>
          <div className="lg:w-full md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    id="watchpassword"
                    name="password"
                    className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                  />
                  <div onClick={seePassword} className="mb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-gray-500 font-bold" htmlFor="remember">
                          <input
                            className="leading-tight"
                            type="checkbox"
                            id="remember"
                            name="remember"
                          />
                          <span className="text-sm font-medium leading-6 text-gray-900 mx-2">See password</span>
                        </label>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">
                    New Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={newpassword}
                    type="password"
                    id="watchpassword1"
                    name="newpassword"
                    className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
                    Confirm Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={cpassword}
                    type="password"
                    id="watchpassword2"
                    name="cpassword"
                    className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-12">
          <button
            onClick={handlePasswordSubmit}
            className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Change Password
          </button>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
