import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Issue {
    id: string;
    name: string;
    department: string;
    semester: string;
    description: string;
    email: string;
    gender: string;
    contactNumber: string;
    shift: string;
    createdAt : string ;
}

const ShowAllIssue = () => {
    const router = useRouter();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchIssueDetails = async () => {
            const id = router.query.id as string;
            console.log(id)
            if (!id) {
                return;
            }
            try {
                const response = await fetch(`/api/getIssueDetails?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch issue details');
                }
                const data: Issue = await response.json();
                setIssue(data);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchIssueDetails();
    }, [router.query.id]);

    if (!issue) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-screen'>
            <h2 className="mt-24 text-center text-xl">Issue Details</h2>
            <div className="flex justify-center">
                <div className="w-72 mb-4 rounded overflow-hidden shadow-lg m-2">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{issue.name}</div>
                        <p className="text-gray-700 text-base"><span className="font-bold">Email:</span> {issue.email}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Contact Number:</span> {issue.contactNumber}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Department:</span> {issue.department}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Semester:</span> {issue.semester}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Gender:</span> {issue.gender}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Shift:</span> {issue.shift}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">Issue:</span> {issue.description}</p>
                        <p className="text-gray-700 text-base"><span className="font-bold">created at:</span> {new Date(issue.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllIssue;
