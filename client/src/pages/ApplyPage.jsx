import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ApplyPage = ({ opportunityId }) => {
  const [formData, setFormData] = useState({
    pdfFile: null,
    desiredSalary: "",
    availability: "Immediately",
  });
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    if (e.target.name === "pdfFile") {
      setFormData({
        ...formData,
        pdfFile: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("pdfFile", formData.pdfFile);
    form.append("desiredSalary", formData.desiredSalary);
    form.append("availability", formData.availability);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token is stored in localStorage
      },
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/applications/${opportunityId}/apply`,
        form,
        config
      );
      console.log("Application submitted:", response.data);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application");
    }
  };

  ApplyPage.propTypes = {
    opportunityId: PropTypes.string.isRequired,
  };

  return (
    <div>
      <h1>Apply for Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pdfFile">Resume (PDF only):</label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="desiredSalary">Desired Salary:</label>
          <input
            type="text"
            name="desiredSalary"
            value={formData.desiredSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="availability">Availability:</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="Immediately">Immediately</option>
            <option value="15 days">15 days</option>
            <option value="30 days">30 days</option>
            <option value="60 days">60 days</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyPage;
