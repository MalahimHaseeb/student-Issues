import AdminMenu from '@/components/AdminMenu';
import React, { useEffect, useState } from 'react';
import User from '@/Models/User';
import mongoose from "mongoose";
import { useRouter } from 'next/router';
import Issue from '@/Models/Issue';
import toast from 'react-hot-toast';

// Define the interface for the user data object
interface UserData {
    _id: string;
    name: string;
    email: string;
    department: string;
    contactNumber: string;
    shift: string;
    semester: string;
    gender: string;
    createdAt: string;
    description: string;
    resolved : string ;
}

// Define the Props interface with the correct type for userData
interface Props {
    userRole: string;
    userData: UserData[]; // Use the UserData interface as the type for userData
}

const ViewIssues: React.FC<Props> = ({ userRole, userData }) => {
    const router = useRouter();
    const [admin, setAdmin] = useState<boolean>(false);
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

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
    const handleIssueClick = (issueId: string) => {
        // setSelectedIssueId(prevId => prevId === issueId ? null : issueId);
        router.push(`/showAllissue?id=${issueId}`); // Navigate to the showAllIssue page with the selected issue ID
    };
    const handleIssueClick2 = async (issueId: string) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this issue?');
    
        // If user confirms deletion
        if (confirmDelete) {
            try {
                const response = await fetch('../api/deleteIssue', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ issueId }),
                });
    
                if (response.ok) {
                    toast.success('Successfully deleted issue');
                    router.push('/admin/viewIssues');
                } else {
                    toast.error('Error in deleting issue');
                    console.error('Error deleting issue');
                }
    
            } catch (error) {
                console.error('Error deleting issue:', error);
            }
        }
    };   
    return (
        <>
            <AdminMenu /> {/* Include the AdminMenu component */}
            <div className="grid gap-4 sm:grid-cols-2 lg:ml-72"> {/* Adjust margin-left for large screens */}
             {userData.length === 0 && (
                <div className=' flex  items-center justify-center  h-screen'>No! Issue Found</div>
            )}
                {userData.map((item) => (
                    <div key={item._id} className={` ${item.resolved == "0" ? "bg-white" : "bg-green-500"} shadow-md rounded-lg overflow-hidden my-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg`}>
                    
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Created At: </span>
                                {(new Date(item.createdAt)).toLocaleDateString()}
                                <br />
                                <span className='font-bold text-xl'>Name: </span>
                                {item.name}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Email: </span>
                                {item.email}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Department: </span>
                                {item.department}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Phone: </span>
                                {item.contactNumber}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Shift: </span>
                                {item.shift}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Semester: </span>
                                {item.semester}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Gender: </span>
                                {item.gender}
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>IssueResolved: </span>
                                {item.resolved == "0" ? "No" : "Yes" } 
                            </p>
                            <p className="text-gray-700 text-base mb-2">
                                <span className='font-bold text-xl'>Issue: </span>
                                {item.description.slice(0, 15) + "..."}
                            </p>
                            <div className="flex justify-center mt-4">
                                <button className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleIssueClick(item._id)}>
                                    View Issue
                                </button>
                                <button className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleIssueClick2(item._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ViewIssues;

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

        let usersData = await Issue.find({});

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
