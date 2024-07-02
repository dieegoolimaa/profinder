import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ApplePage = ({ opportunityId }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [desiredSalary, setDesiredSalary] = useState("");
  const [availability, setAvailability] = useState("15 days"); // Default availability

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSalaryChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Allow only digits
    setDesiredSalary(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    formData.append("desiredSalary", desiredSalary);
    formData.append("availability", availability);

    try {
      const response = await axios.post(
        `/api/apply/${opportunityId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Application submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pdfFile">Attach Resume (PDF only):</label>
        <input
          type="file"
          id="pdfFile"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="desiredSalary">Desired Salary (USD):</label>
        <input
          type="text"
          id="desiredSalary"
          value={desiredSalary}
          onChange={handleSalaryChange}
          placeholder="Enter desired salary"
        />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <select
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="15 days">15 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="Immediately">Immediately</option>
        </select>
      </div>
      <button type="submit">Submit Application</button>
    </form>
  );
};

ApplePage.propTypes = {
  opportunityId: PropTypes.string.isRequired,
};

export default ApplePage;
