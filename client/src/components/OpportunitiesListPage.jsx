import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import "../styles/OpportunitiesListPage.css";

const OpportunitiesListPage = () => {
  const { token } = useContext(SessionContext);
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const getOpportunity = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/opportunities`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setOpportunities(response.data);
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
  }, [token]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filter opportunities based on the search input
  const filteredOpportunities = opportunities.filter((opportunity) =>
    opportunity.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>Opportunities</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by title"
      />
      <ul>
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((currentOpportunity) => (
            <div key={currentOpportunity._id}>
              <Link to={`/opportunities/${currentOpportunity._id}`}>
                <li>{currentOpportunity.title}</li>
                <p>{currentOpportunity.location}</p>
              </Link>
              <Link to={`/opportunities/${currentOpportunity._id}/apply`}>
                Apply
              </Link>
            </div>
          ))
        ) : (
          <p>No opportunities found.</p>
        )}
      </ul>
      <div>
        <Link to="/create-opportunity">Create new opportunity</Link>
      </div>
    </>
  );
};

export default OpportunitiesListPage;
