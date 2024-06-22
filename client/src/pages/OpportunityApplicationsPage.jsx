import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const OpportunityApplicationsPage = () => {
  const { token } = useContext(SessionContext);
  const [applications, setApplications] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const { opportunityId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const getApplications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/opportunities/${opportunityId}/applications`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setApplications(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicationCount = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/opportunities/${opportunityId}/application-count`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setApplicationCount(response.data.count);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
    getApplicationCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1>Applications for Opportunity</h1>
      <p>Number of applications: {applicationCount}</p>
      <ul>
        {applications.length > 0 ? (
          applications.map((application) => (
            <li key={application._id}>
              <h2>{application.userId.name}</h2>
              <p>{application.userId.email}</p>
              <p>{application.coverLetter}</p>
            </li>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </ul>
    </>
  );
};

export default OpportunityApplicationsPage;
