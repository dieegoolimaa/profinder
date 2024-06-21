import { useState, useEffect } from "react";
import axios from "axios";

const ProfileView = () => {
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <h1>Professional Profile</h1>
      {profile && <p>Name: {profile.name}</p>}
    </>
  );
};
export default ProfileView;
