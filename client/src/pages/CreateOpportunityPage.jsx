import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import axios from "axios";
import "../styles/CreateOpportunityPage.css";

const CreateOpportunityPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/opportunities`,
        {
          title,
          description,
          skillsRequired: skillsRequired.split(","),
          location,
          salary,
          expiryDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/opportunities");
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
      <h1>Create a new opportunity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <label>
          Skills Required
          <input
            value={skillsRequired}
            onChange={(event) => setSkillsRequired(event.target.value)}
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
          Salary
          <input
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            required
          />
        </label>
        <label>
          Expiry Date
          <input
            type="date"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            required
          />
        </label>
        <button type="submit">Create Job</button>
      </form>
    </>
  );
};

export default CreateOpportunityPage;
