import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import PropTypes from "prop-types";

const OpportunityApplicationsPage = ({ opportunityId }) => {
  const { token } = useContext(SessionContext);
  const [applications, setApplications] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!opportunityId) {
      console.error("Opportunity ID is missing");
      return;
    }

    const getApplications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/opportunities/${opportunityId}/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setApplications(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getApplications();
  }, [API_URL, opportunityId, token]);

  OpportunityApplicationsPage.propTypes = {
    opportunityId: PropTypes.string,
  };

  return (
    <div>
      <h1>Applications</h1>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>{application.coverLetter}</li>
          ))}
        </ul>
      ) : (
        <p>No applications found</p>
      )}
    </div>
  );
};

export default OpportunityApplicationsPage;
