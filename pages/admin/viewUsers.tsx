import AdminMenu from '@/components/AdminMenu';
import React, { useEffect, useState } from 'react';
import User from '@/Models/User';
import mongoose from "mongoose";
import { useRouter } from 'next/router';

// Define the interface for the user data object
interface UserData {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
}

// Define the Props interface with the correct type for userData
interface Props {
  userRole: string;
  userData: UserData[]; // Use the UserData interface as the type for userData
}

const ViewUsers: React.FC<Props> = ({ userRole , userData }) => {
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

  // Function to update the user role
  // Function to update the user role
const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('../api/updatedUserAdmin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
  
      // Reload the user data after updating the role
      router.replace(router.asPath);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  

  return (
    <>
      <AdminMenu /> {/* Include the AdminMenu component */}
      <div className="grid gap-4 sm:grid-cols-2 lg:ml-72"> {/* Adjust margin-left for large screens */}
        {userData.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden my-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg">
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base mb-2">
                <span className='font-bold text-xl'>Name: </span>
                {item.name}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <span className='font-bold text-xl'>Email: </span>
                {item.email}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <span className='font-bold text-xl'>Address: </span>
                {item.address}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <span className='font-bold text-xl'>Phone: </span>
                {item.phone}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <span className='font-bold text-xl'>Role: </span>
                {item.role}
              </p>
              {/* Select dropdown for updating user role */}
              <select value={item.role} onChange={(e) => updateUserRole(item._id, e.target.value)}>
                <option value="0">user</option>
                <option value="1">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewUsers;

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || ' ');
  }

  try {
    // Find the user with role equal to 1
    const user = await User.findOne({ role: process.env.auth });

    // Check if user is found
    if (!user) {
      console.log("No user with role 'Admin' found.");
    } else {
      console.log("User with role 'Admin' found:", user);
    }

    let usersData = await User.find({});
  
    // Extract userRole from user if found, otherwise set to null
    const userRole = user ? user.email : null;

    return {
      props: {
        userRole,
        userData: JSON.parse(JSON.stringify(usersData)), // Parse JSON string to array of objects
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
