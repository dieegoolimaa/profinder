import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const ProfessionalProfileCreationForm = () => {
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(30);
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [newSkill, setNewSkill] = useState("");
  const [experience, setExperience] = useState("5 years in web development");
  const [location, setLocation] = useState("San Francisco");
  const [bio, setBio] = useState(
    "Passionate developer with a love for coding."
  );
  const [phone, setPhone] = useState("123-456-7890");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/johndoe");
  const [website, setWebsite] = useState("https://johndoe.com");
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/professional-profile`,
        {
          name,
          age,
          skills,
          experience,
          location,
          bio,
          phone,
          linkedin,
          website,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/profile");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">
        Name:
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Age:
        <input
          type="number"
          className="form-input"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Skills:
        <div>
          {skills.map((skill, index) => (
            <span key={index} className="tag">
              {skill}
              <button
                type="button"
                className="tag-remove"
                onClick={() => handleSkillRemove(index)}
              >
                x
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="form-input"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleSkillAdd}
        >
          Add Skill
        </button>
      </label>
      <br />
      <label className="form-label">
        Experience:
        <textarea
          className="form-input"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Location:
        <input
          type="text"
          className="form-input"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Bio:
        <textarea
          className="form-input"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Phone:
        <input
          type="text"
          className="form-input"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        LinkedIn:
        <input
          type="url"
          className="form-input"
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Website:
        <input
          type="url"
          className="form-input"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ProfessionalProfileCreationForm;
