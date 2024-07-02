import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/SignupPage.css";

const SignupAndProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

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

  const { setToken } = useContext(SessionContext);
  const navigate = useNavigate();
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

  const handleSignupAndProfileCreation = async (event) => {
    event.preventDefault();
    setError(null); // Reset error

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const signupResponse = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
      });

      if (signupResponse.data.authToken) {
        setToken(signupResponse.data.authToken);

        try {
          const profileResponse = await axios.post(
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
                Authorization: `Bearer ${signupResponse.data.authToken}`,
              },
            }
          );

          if (profileResponse.status === 200) {
            navigate("/profile");
          } else {
            setError("Error creating profile.");
          }
        } catch (profileError) {
          setError(
            profileError.response
              ? profileError.response.data.message
              : profileError.message
          );
        }
      } else {
        setError("Token is missing in the response.");
      }
    } catch (signupError) {
      setError(
        signupError.response
          ? signupError.response.data.message
          : signupError.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSignupAndProfileCreation}
      className="signup-and-profile-form"
    >
      {error && <div className="error-notification">{error}</div>}

      <h2>Sign Up</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </label>
      <br />

      <h2>Create Professional Profile</h2>
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
        Sign Up and Create Profile
      </button>
    </form>
  );
};

export default SignupAndProfilePage;
