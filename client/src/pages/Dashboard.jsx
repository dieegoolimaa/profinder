import { useEffect, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import OpportunityApplicationsPage from "../components/OpportunityApplicationsPage";
import OpportunitiesListPage from "../components/OpportunitiesListPage";
import ProfileView from "../components/ProfileView";

const Dashboard = () => {
  const { token } = useContext(SessionContext);
  const [opportunities, setOpportunities] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/opportunities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setOpportunities(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOpportunities();
  }, [API_URL, token]);

  return (
    <>
      <ProfileView />
      {opportunities.map((opportunity) => (
        <div key={opportunity._id}>
          <h2>{opportunity.title}</h2>
          <OpportunityApplicationsPage opportunityId={opportunity._id} />
        </div>
      ))}
      <OpportunitiesListPage />
    </>
  );
};

export default Dashboard;
