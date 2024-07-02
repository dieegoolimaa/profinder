import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ApplePage = ({ opportunityId }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [desiredSalary, setDesiredSalary] = useState("");
  const [availability, setAvailability] = useState("");

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
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

  ApplePage.propTypes = {
    opportunityId: PropTypes.string.isRequired,
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
        <label htmlFor="desiredSalary">Desired Salary:</label>
        <input
          type="text"
          id="desiredSalary"
          value={desiredSalary}
          onChange={(e) => setDesiredSalary(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
      </div>
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplePage;
