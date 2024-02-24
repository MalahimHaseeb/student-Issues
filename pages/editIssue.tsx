import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface FormValues {
    id: string; // Add id property
    name: string;
    department: string;
    semester: string;
    description: string;
    email: string;
    gender: string;
    contactNumber: string;
    shift: string;
}


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
}


const EditIssue: React.FC = () => {
    const router = useRouter();
    const id = router.query.id ;
    const [formData, setFormData] = useState<FormValues>({
        name: '',
        department: '',
        semester: '',
        description: '',
        email: '',
        gender: '',
        contactNumber: '',
        shift: '',
        id: '' // This line is missing in your original code
    });
    const [issue, setIssue] = useState<Issue | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    

    useEffect(() => {
        const fetchIssueDetails = async () => {
            const id = router.query.id as string;
            if (!id) return;
            try {
                const response = await fetch(`/api/getIssueDetails?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch issue details');
                }
                const data: Issue = await response.json();
                setIssue(data);
                setFormData(data); // Initialize formData with fetched data
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchIssueDetails();
    }, [router.query.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            let url = '/api/editIssue';
            if (issue) {
                console.log(router.query.id)
                url += `?id=${router.query.id}`;
            }
            
            const { id, ...formDataWithoutId } = formData; // Extract id from formData
            const response = await fetch(url, { // Send PUT request to editIssue API
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithoutId) // Pass formDataWithoutId without the id property
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            toast.success('Your issue has been updated', { duration: 3000 });
            router.push('/myIssue');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update your issue', { duration: 3000 });
        }
    };
    
    
    

    if (loading) {
        return <div>Loading...</div>;
    }

    // Conditional rendering when issue is null
    if (!issue) {
        return <div>Issue not found</div>;
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Edit Issue
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Your Name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                value={formData.name}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Include other fields */}
                    {/* Department */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                            Department
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                value={formData.department}
                                id="department"
                                name="department"
                                type="text"
                                autoComplete="department"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Semester */}
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">
                            Semester
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={handleChange}
                                value={formData.semester}
                                id="semester"
                                name="semester"
                                autoComplete="semester"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                style={{ backgroundColor: '#f3f4f6' }} // Add inline style for background color
                            >
                                <option value="">Select</option>
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                                <option value="fourth">Fourth</option>
                                <option value="fifth">Fifth</option>
                                <option value="six">Six</option>
                                <option value="seven">Seven</option>
                                <option value="eight">Eight</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleChange}
                                    value={formData.description}
                                    id="description"
                                    name="description"
                                    autoComplete="description"
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Your Email
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                value={formData.email}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                            Gender
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={handleChange}
                                value={formData.gender}
                                id="gender"
                                name="gender"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Contact Number
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                value={formData.contactNumber}
                                id="contactNumber"
                                name="contactNumber"
                                type="text"
                                autoComplete="tel"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Shift */}
                    <div>
                        <label htmlFor="shift" className="block text-sm font-medium leading-6 text-gray-900">
                            Shift
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={handleChange}
                                value={formData.shift}
                                id="shift"
                                name="shift"
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select</option>
                                <option value="morning">Morning</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditIssue;
