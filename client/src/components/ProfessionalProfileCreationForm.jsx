import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import axios from "axios";

const ProfessionalProfileCreationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
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
      console.log(error);
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
          type="text"
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
          type="text"
          className="form-input"
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Website:
        <input
          type="text"
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
