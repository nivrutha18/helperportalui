import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditHelper.css";

export default function EditHelper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    serviceType: "",
    area: "",
    chargesHourly: ""
  });

  useEffect(() => {
    axios
      .get(`https://helperportalbackend.onrender.com/helpers/${id}`)
      .then((res) => {
        const data = {
          name: res.data.name || "",
          contact: res.data.contact || "",
          serviceType: res.data.serviceType || "",
          area: res.data.area || "",
          chargesHourly: res.data.chargesHourly || ""
        };
        setFormData(data);
      })
      .catch((err) => console.error("Failed to fetch helper data:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData before send:", formData);

      const payload = {
        name: formData.name,
        contact: formData.contact,
        serviceType: formData.serviceType,
        area: formData.area,
        chargesHourly: formData.chargesHourly
      };

      console.log("Payload sent:", payload);

      await axios.put(`https://helperportalbackend.onrender.com/helpers/${id}`, payload);
      navigate("/helpers");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update helper. Please check your input and try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Edit Helper</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name ?? ""}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="contact"
            value={formData.contact ?? ""}
            onChange={handleChange}
            placeholder="Contact Number"
          />
          <input
            name="serviceType"
            value={formData.serviceType ?? ""}
            onChange={handleChange}
            placeholder="Service Type (e.g., Cook, Maid)"
          />
          <input
            name="area"
            value={formData.area ?? ""}
            onChange={handleChange}
            placeholder="Area / Location"
          />
          <input
            name="chargesHourly"
            value={formData.chargesHourly ?? ""}
            onChange={handleChange}
            placeholder="Charges per Hour"
          />
          <button type="submit">Save Changes</button>
        </form>
        <Link to="/helpers" className="back-link">
          Back to List
        </Link>
      </div>
    </div>
  );
}
