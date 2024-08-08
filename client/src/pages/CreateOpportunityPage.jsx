import React, { useState } from 'react';

const CreateOpportunityPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    const createOpportunity = async (title, description) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/opportunities`,
                { title, description },
                config
            );
            console.log('Opportunity created:', response.data);
        } catch (error) {
            console.error('Error creating opportunity:', error);
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission here
        console.log('Opportunity created:', { title, description });
        // Reset the form fields
        setTitle('');
        setDescription('');
    };

    return (
        <div>
            <h1>Create Opportunity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateOpportunityPage;