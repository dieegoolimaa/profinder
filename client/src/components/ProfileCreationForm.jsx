import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const ProfileCreationForm = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const { token } = useContext(SessionContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age,
          profile: {
            skills: skills.split(","),
            experience,
            location,
            bio,
          },
          contact: {
            phone,
            linkedin,
            website,
          },
        }),
      });
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Create Profile</h1>
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
        <button type="submit">Create Profile</button>
      </form>
    </>
  );
};

export default ProfileCreationForm;
