import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileCreation.css";

const ProfileCreation = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const profile = {
      name,
      age,
      skills,
      experience,
      location,
      bio,
      phone,
      linkedin,
      website,
    };
    if (profile) {
      navigate("/profile");
    }
    console.log("Profile:", profile);
  };

  return (
    <>
      <h1>Profile Creation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Age
          <input
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
          />
        </label>
        <label>
          Skills
          <input
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            required
          />
        </label>
        <label>
          Experience
          <input
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            required
          />
        </label>
        <label>
          Location
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </label>
        <label>
          Bio
          <input
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            required
          />
        </label>
        <label>
          Phone
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>
        <label>
          LinkedIn
          <input
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
            required
          />
        </label>
        <label>
          Website
          <input
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ProfileCreation; // Export the ProfileCreation component
