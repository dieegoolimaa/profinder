import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const ApplyPage = () => {
  const { token } = useContext(SessionContext);
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const navigate = useNavigate();

  const getOpportunityDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/opportunities/${opportunityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpportunity(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOpportunityDetails();
    // eslint-disable-next-line
  }, []);

  const handleApply = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/opportunities/${opportunityId}/apply`,
        { coverLetter },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate(`/opportunities/${opportunityId}`);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {opportunity && (
        <>
          <h1>Apply to {opportunity.title}</h1>
          <form onSubmit={handleApply}>
            <h2>Opportunity Details</h2>
            <p>{opportunity.title}</p>
            <label>
              Cover Letter
              <textarea
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Application</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ApplyPage;
