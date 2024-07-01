import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const ApplyPage = () => {
  const { opportunityId } = useParams();
  const { token } = useContext(SessionContext);
  const [applicationData, setApplicationData] = useState({
    // Add other necessary fields
    resume: "",
    coverLetter: "",
  });

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5005/api/applications/${opportunityId}/apply`,
        applicationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        console.log("Application successful");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Apply for Opportunity {opportunityId}</h1>
      <form onSubmit={handleApply}>
        <div>
          <label>Resume</label>
          <input
            type="text"
            name="resume"
            value={applicationData.resume}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea
            name="coverLetter"
            value={applicationData.coverLetter}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyPage;
