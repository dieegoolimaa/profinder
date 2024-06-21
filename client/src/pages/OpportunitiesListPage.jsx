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
        const data = response.data;
        setOpportunities(data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOpportunity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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
        {opportunities
          .filter((opportunity) =>
            opportunity.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((opportunity) => (
            <li key={opportunity._id}>
              <Link to={`/opportunities/${opportunity._id}`}>
                <div>
                  <h2>{opportunity.title}</h2>
                  <p>{opportunity.location}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <div>
        <Link to="/create-opportunity">Create new opportunity</Link>
      </div>
    </>
  );
};

export default OpportunitiesListPage;
