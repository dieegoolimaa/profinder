import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const OpportunityApplicationsPage = ({ opportunityId }) => {
  const [applications, setApplications] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getApplications = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming token is stored in localStorage
        },
      };

      try {
        const response = await axios.get(
          `${API_URL}/api/opportunities/${opportunityId}/applications`,
          config
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    getApplications();
  }, [opportunityId]);

  OpportunityApplicationsPage.propTypes = {
    opportunityId: PropTypes.string.isRequired,
  };

  return (
    <div>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>{application.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OpportunityApplicationsPage;
