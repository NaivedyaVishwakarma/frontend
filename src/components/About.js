import React, { useEffect, useState } from "react";
import api from "../api";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const res = await api.get("/about");
      setAbout(res.data);
    };
    fetchAbout();
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <div>
      <h2>About Us</h2>
      <p><strong>Institution:</strong> {about.institution}</p>
      <p>{about.description}</p>
    </div>
  );
};

export default About;
