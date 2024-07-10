import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OpportunityPage = () => {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/opportunities/${opportunityId}`
        );
        if (response.status === 200) {
          setOpportunity(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching opportunity:", error);
      }
    };

    fetchOpportunity();
  }, [opportunityId]);

  return (
    <div className="opportunity-container">
      {opportunity ? (
        <>
          <h1>{opportunity.title}</h1>
          <div className="opportunity-details">
            <p>
              <span>Description:</span> {opportunity.description}
            </p>
            <p>
              <span>Skills Required:</span>{" "}
              {opportunity.skillsRequired.join(", ")}
            </p>
            <p>
              <span>Location:</span> {opportunity.location}
            </p>
            <p>
              <span>Salary:</span> {opportunity.salary}
            </p>
            <p>
              <span>Expiry Date:</span> {opportunity.expiryDate}
            </p>
          </div>
          <Link
            to={`/opportunities/${opportunity._id}/apply`}
            className="apply-link"
          >
            Apply
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OpportunityPage;
