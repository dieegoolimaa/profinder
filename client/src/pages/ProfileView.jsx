import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const ProfileView = () => {
  const [profileInformation, setProfileInformation] = useState(null);
  const { token } = useContext(SessionContext);

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileInformation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (!profileInformation) {
    return <div>Loading...</div>;
  }

  const {
    name,
    age,
    profile: { skills = [], experience, location, bio } = {},
    contact: { phone, linkedin, website } = {},
  } = profileInformation;

  return (
    <>
      <h1>Professional Profile</h1>
      <div>
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Skills: {skills.join(", ")}</p>
        <p>Experience: {experience}</p>
        <p>Location: {location}</p>
        <p>Bio: {bio}</p>
        <p>Phone: {phone}</p>
        <p>LinkedIn: {linkedin}</p>
        <p>Website: {website}</p>
      </div>
    </>
  );
};

export default ProfileView;
