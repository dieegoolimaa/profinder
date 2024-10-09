import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCreationPage = () => {
    const [profileSummary, setProfileSummary] = useState('');
    const [experienceList, setExperienceList] = useState([
        { company: '', position: '', techStack: '', startDate: '', endDate: '', responsibilities: '' }
    ]);
    const [educationList, setEducationList] = useState([
        { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }
    ]);
    const [skills, setSkills] = useState([{ name: '', level: 'Beginner' }]);
    const [certifications, setCertifications] = useState([{ name: '', issuer: '', issueDate: '' }]);
    const [availability, setAvailability] = useState('');
    const [desiredPosition, setDesiredPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    // Handle dynamic experience fields
    const handleExperienceChange = (index, event) => {
        const { name, value } = event.target;
        const newExperienceList = [...experienceList];
        newExperienceList[index][name] = value;
        setExperienceList(newExperienceList);
    };

    const handleAddExperience = () => {
        setExperienceList([...experienceList, { company: '', position: '', techStack: '', startDate: '', endDate: '', responsibilities: '' }]);
    };

    const handleRemoveExperience = (index) => {
        const newExperienceList = [...experienceList];
        newExperienceList.splice(index, 1);
        setExperienceList(newExperienceList);
    };

    // Handle dynamic education fields
    const handleEducationChange = (index, event) => {
        const { name, value } = event.target;
        const newEducationList = [...educationList];
        newEducationList[index][name] = value;
        setEducationList(newEducationList);
    };

    const handleAddEducation = () => {
        setEducationList([...educationList, { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }]);
    };

    const handleRemoveEducation = (index) => {
        const newEducationList = [...educationList];
        newEducationList.splice(index, 1);
        setEducationList(newEducationList);
    };

    // Handle dynamic skills fields
    const handleSkillChange = (index, event) => {
        const { name, value } = event.target;
        const newSkillsList = [...skills];
        newSkillsList[index][name] = value;
        setSkills(newSkillsList);
    };

    const handleAddSkill = () => {
        setSkills([...skills, { name: '', level: 'Beginner' }]);
    };

    const handleRemoveSkill = (index) => {
        const newSkillsList = [...skills];
        newSkillsList.splice(index, 1);
        setSkills(newSkillsList);
    };

    // Handle dynamic certifications fields
    const handleCertificationChange = (index, event) => {
        const { name, value } = event.target;
        const newCertificationsList = [...certifications];
        newCertificationsList[index][name] = value;
        setCertifications(newCertificationsList);
    };

    const handleAddCertification = () => {
        setCertifications([...certifications, { name: '', issuer: '', issueDate: '' }]);
    };

    const handleRemoveCertification = (index) => {
        const newCertificationsList = [...certifications];
        newCertificationsList.splice(index, 1);
        setCertifications(newCertificationsList);
    };

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/cv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    profileSummary,
                    experienceList,
                    educationList,
                    skills,
                    certifications,
                    availability,
                    desiredPosition,
                    salary
                }),
            });

            if (response.ok) {
                navigate('/profile-success'); // Redirect to success or profile page
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create Your Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleProfileSubmit}>
                <div>
                    <label htmlFor="profileSummary">Profile Summary:</label>
                    <textarea
                        id="profileSummary"
                        value={profileSummary}
                        onChange={(e) => setProfileSummary(e.target.value)}
                    />
                </div>

                {/* Experience Section */}
                {experienceList.map((experience, index) => (
                    <div key={index}>
                        <h3>Experience {index + 1}</h3>
                        <div>
                            <label>Company:</label>
                            <input
                                type="text"
                                name="company"
                                value={experience.company}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Position:</label>
                            <input
                                type="text"
                                name="position"
                                value={experience.position}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Tech Stack:</label>
                            <input
                                type="text"
                                name="techStack"
                                value={experience.techStack}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={experience.startDate}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={experience.endDate}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Responsibilities:</label>
                            <textarea
                                name="responsibilities"
                                value={experience.responsibilities}
                                onChange={(event) => handleExperienceChange(index, event)}
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveExperience(index)}>Remove Experience</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddExperience}>Add Experience</button>

                {/* Education Section */}
                {educationList.map((education, index) => (
                    <div key={index}>
                        <h3>Education {index + 1}</h3>
                        <div>
                            <label>Institution:</label>
                            <input
                                type="text"
                                name="institution"
                                value={education.institution}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Degree:</label>
                            <input
                                type="text"
                                name="degree"
                                value={education.degree}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Field of Study:</label>
                            <input
                                type="text"
                                name="fieldOfStudy"
                                value={education.fieldOfStudy}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={education.startDate}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={education.endDate}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={education.description}
                                onChange={(event) => handleEducationChange(index, event)}
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveEducation(index)}>Remove Education</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddEducation}>Add Education</button>

                {/* Skills Section */}
                {skills.map((skill, index) => (
                    <div key={index}>
                        <h3>Skill {index + 1}</h3>
                        <div>
                            <label>Skill Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={skill.name}
                                onChange={(event) => handleSkillChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Level:</label>
                            <select
                                name="level"
                                value={skill.level}
                                onChange={(event) => handleSkillChange(index, event)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <button type="button" onClick={() => handleRemoveSkill(index)}>Remove Skill</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddSkill}>Add Skill</button>

                {/* Certifications Section */}
                {certifications.map((certification, index) => (
                    <div key={index}>
                        <h3>Certification {index + 1}</h3>
                        <div>
                            <label>Certification Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={certification.name}
                                onChange={(event) => handleCertificationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Issuer:</label>
                            <input
                                type="text"
                                name="issuer"
                                value={certification.issuer}
                                onChange={(event) => handleCertificationChange(index, event)}
                            />
                        </div>
                        <div>
                            <label>Issue Date:</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={certification.issueDate}
                                onChange={(event) => handleCertificationChange(index, event)}
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveCertification(index)}>Remove Certification</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddCertification}>Add Certification</button>

                {/* Availability and Other Fields */}
                <div>
                    <label htmlFor="availability">Availability:</label>
                    <input
                        type="text"
                        id="availability"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desiredPosition">Position You Aim For:</label>
                    <input
                        type="text"
                        id="desiredPosition"
                        value={desiredPosition}
                        onChange={(e) => setDesiredPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="salary">Desired Salary:</label>
                    <input
                        type="number"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                <button type="submit">Submit Profile</button>
            </form>
        </div>
    );
};

export default ProfileCreationPage;
