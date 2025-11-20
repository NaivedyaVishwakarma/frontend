import React, { useEffect, useState } from "react";
import api from "../api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/users/profile");
      setProfile(res.data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Role:</b> {profile.role}</p>
      {profile.role === "faculty" && (
        <p><b>Subjects:</b> {profile.subjects.join(", ")}</p>
      )}
    </div>
  );
};

export default Profile;
