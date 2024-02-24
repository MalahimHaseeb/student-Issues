import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface FormValues {
    _id: string
    name: string;
    department: string;
    semester: string;
    description: string;
    email: string;
    gender: string;
    contactNumber: string;
    shift: string;
    createdAt: string;
    resolved: string;
}

const MyIssue = () => {
    const router = useRouter();

    const [issues, setIssues] = useState<FormValues[]>([]);
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const myuserStr = localStorage.getItem('myuser');
            const myuser = myuserStr ? JSON.parse(myuserStr) : null;
            if (!myuser || !myuser.token) {
                router.push('/');
            } else {
                await fetchData(myuser.email, myuser.token);
            }
        };
        fetchUserDetails();
    }, []);

    const fetchData = async (email: any, token: any) => {
        try {
            const data = { email, token };
            const response = await fetch('/api/getMyIssue', {
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
            setIssues(res);
        } catch (error) {
            console.error(error);
        }
    };

    const handleIssueClick = (issueId: string) => {
        // setSelectedIssueId(prevId => prevId === issueId ? null : issueId);
        router.push(`/showAllissue?id=${issueId}`); // Navigate to the showAllIssue page with the selected issue ID
    };
    const handleIssueClick1 = (issueId: string) => {
        // setSelectedIssueId(prevId => prevId === issueId ? null : issueId);
        router.push(`/editIssue?id=${issueId}`); // Navigate to the showAllIssue page with the selected issue ID
    };

    const handleIssueClick2 = async (issueId: string) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this issue?');

        // If user confirms deletion
        if (confirmDelete) {
            try {
                const response = await fetch('/api/deleteIssue', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ issueId }),
                });

                if (response.ok) {
                    toast.success('Successfully deleted issue');
                    router.push('/myIssue');
                } else {
                    toast.error('Error in deleting issue');
                    console.error('Error deleting issue');
                }

            } catch (error) {
                console.error('Error deleting issue:', error);
            }
        }
    };

    const updateUserResolved = async (userId: string, newRole: string) => {
        try {
            const response = await fetch('/api/resolvedIssue', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, resolved: newRole }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
    
            // Reload the user data after updating the role
            router.push('/');
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };
    
    return (
        <div className='h-screen'>
            <h2 className='mt-24  text-center text-xl'>User Issues</h2>
            {issues.length === 0 && (
                <div className='text-center h-screen'>No! Issue Found</div>
            )}
            <div className="flex justify-center ">
                {issues.map((issue) => (
                    <div key={issue._id} className={`${issue.resolved == "0" ? "bg-white" : "bg-green-500"} w-72 mb-4 rounded overflow-hidden shadow-lg m-2`}>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{issue.name}</div>
                            {/* <div className="font-bold text-xl mb-2">{issue._id}</div> */}
                            <p className="text-gray-700 text-base"><span className="font-bold">Email:</span> {issue.email}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Contact Number:</span> {issue.contactNumber}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Department:</span> {issue.department}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Semester:</span> {issue.semester}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Gender:</span> {issue.gender}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Isssue Resolved :</span> {issue.resolved == "0" ? "No" : "Yes"}</p>
                            <p className="text-gray-700 text-base"><span className="font-bold">Shift:</span> {issue.shift}</p>
                            <p className="text-gray-700 text-base">
                                <span className="font-bold">Issue:</span>
                                {selectedIssueId === issue._id
                                    ? issue.description
                                    : issue.description.slice(0, 15) + "..."
                                }
                            </p>
                            <p className="text-gray-700 text-base"><span className="font-bold">created at:</span> {new Date(issue.createdAt).toLocaleString()}</p>
                            <button className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleIssueClick(issue._id)}>
                                {selectedIssueId === issue._id ? "Hide" : "Show"} Issue
                            </button>
                            <button className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleIssueClick1(issue._id)}>
                                Edit User
                            </button>
                            <select onChange={(e) => updateUserResolved(issue._id, e.target.value)}>
                                <option disabled selected value="">Is your issue resolved?</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default MyIssue;
