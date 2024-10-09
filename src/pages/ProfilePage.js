import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const ProfilePage = () => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch(`${API_URL}/cv`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCvData(data);
                } else {
                    console.error("Error fetching CV data");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [API_URL]);

    const generatePDF = () => {
        if (!cvData) return;

        const doc = new jsPDF();
        doc.text(`${cvData.user.email}'s CV`, 10, 10);
        doc.text(`Profile Summary: ${cvData.profileSummary}`, 10, 20);
        
        let y = 30;

        // Experience Section
        doc.text("Experience", 10, y);
        cvData.experienceList.forEach((exp, index) => {
            y += 10;
            doc.text(`Company: ${exp.company}`, 10, y);
            doc.text(`Position: ${exp.position}`, 60, y);
            y += 10;
            doc.text(`Tech Stack: ${exp.techStack}`, 10, y);
            doc.text(`Dates: ${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}`, 60, y);
            y += 10;
            doc.text(`Responsibilities: ${exp.responsibilities}`, 10, y);
        });

        // Education Section
        y += 10;
        doc.text("Education", 10, y);
        cvData.educationList.forEach((edu, index) => {
            y += 10;
            doc.text(`Institution: ${edu.institution}`, 10, y);
            doc.text(`Degree: ${edu.degree}`, 60, y);
            y += 10;
            doc.text(`Field of Study: ${edu.fieldOfStudy}`, 10, y);
            doc.text(`Dates: ${new Date(edu.startDate).toLocaleDateString()} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}`, 60, y);
            y += 10;
            doc.text(`Description: ${edu.description}`, 10, y);
        });

        // Skills Section
        y += 10;
        doc.text("Skills", 10, y);
        cvData.skills.forEach((skill, index) => {
            y += 10;
            doc.text(`${skill.name} (${skill.level})`, 10, y);
        });

        // Certifications Section
        y += 10;
        doc.text("Certifications", 10, y);
        cvData.certifications.forEach((cert, index) => {
            y += 10;
            doc.text(`${cert.name} - Issued by ${cert.issuer} on ${new Date(cert.issueDate).toLocaleDateString()}`, 10, y);
        });

        doc.save("cv.pdf");
    };

    if (loading) return <p>Loading...</p>;
    if (!cvData) return <p>No CV data found</p>;

    return (
        <div>
            <h1>{cvData.user.email}'s CV</h1>
            <p><strong>Profile Summary:</strong> {cvData.profileSummary}</p>
            
            {/* Experience Section */}
            <h2>Experience</h2>
            {cvData.experienceList.map((exp, index) => (
                <div key={index}>
                    <p><strong>Company:</strong> {exp.company}</p>
                    <p><strong>Position:</strong> {exp.position}</p>
                    <p><strong>Tech Stack:</strong> {exp.techStack}</p>
                    <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}</p>
                    <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                </div>
            ))}

            {/* Education Section */}
            <h2>Education</h2>
            {cvData.educationList.map((edu, index) => (
                <div key={index}>
                    <p><strong>Institution:</strong> {edu.institution}</p>
                    <p><strong>Degree:</strong> {edu.degree}</p>
                    <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
                    <p><strong>Start Date:</strong> {new Date(edu.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}</p>
                    <p><strong>Description:</strong> {edu.description}</p>
                </div>
            ))}

            {/* Skills Section */}
            <h2>Skills</h2>
            {cvData.skills.map((skill, index) => (
                <p key={index}><strong>{skill.name}</strong> ({skill.level})</p>
            ))}

            {/* Certifications Section */}
            <h2>Certifications</h2>
            {cvData.certifications.map((cert, index) => (
                <p key={index}><strong>{cert.name}</strong> - Issued by {cert.issuer} on {new Date(cert.issueDate).toLocaleDateString()}</p>
            ))}

            {/* Availability and Other Fields */}
            <p><strong>Availability:</strong> {cvData.availability}</p>
            <p><strong>Desired Position:</strong> {cvData.desiredPosition}</p>
            <p><strong>Salary:</strong> {cvData.salary}</p>

            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default ProfilePage;
