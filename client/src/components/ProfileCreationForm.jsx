import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import axios from "axios";

const ProfileCreationForm = () => {
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
  // eslint-disable-next-line no-undef
  const { token } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/profile`,
        {
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </label>
      <br />
      <label>
        Skills:
        <input
          type="text"
          value={skills}
          onChange={(event) => setSkills(event.target.value)}
        />
      </label>
      <br />
      <label>
        Experience:
        <input
          type="text"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </label>
      <br />
      <label>
        Bio:
        <input
          type="text"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>
      <br />
      <label>
        LinkedIn:
        <input
          type="text"
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />
      </label>
      <br />
      <label>
        Website:
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileCreationForm;
