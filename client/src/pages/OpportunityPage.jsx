import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OpportunityPage.css";

const OpportunityPage = () => {
  const { opportunityId } = useParams();
  const [opportunities, setOpportunities] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getOpportunity = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/opportunities/${opportunityId}`
      );
      if (response.status === 200) {
        const data = response.data;
        setOpportunities([data]);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOpportunity();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {opportunities.map((currentOpportunity) => (
        <div className="opportunity-container" key={currentOpportunity._id}>
          <h1>{currentOpportunity.title}</h1>
          <div className="opportunity-details">
            <p>
              <span>Description:</span> {currentOpportunity.description}
            </p>
            <p>
              <span>Skills Required:</span>{" "}
              {currentOpportunity.skillsRequired.join(", ")}
            </p>
            <p>
              <span>Location:</span> {currentOpportunity.location}
            </p>
            <p>
              <span>Salary:</span> {currentOpportunity.salary}
            </p>
            <p>
              <span>Expiry Date:</span> {currentOpportunity.expiryDate}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OpportunityPage;
