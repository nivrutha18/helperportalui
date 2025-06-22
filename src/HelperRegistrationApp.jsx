import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HelperRegistrationApp.css";

export default function HelperRegistrationApp() {
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    serviceType: "",
    state: "",
    city: "",
    area: "",
    age: "",
    gender: "",
    chargeshourly: "",
    chargesmonthly: "",
  });

  const serviceSuggestions = ["Cook", "Maid", "Electrician", "Plumber"];

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Selected Place: ", place);

      const getComponent = (type) => {
        const result = place.address_components?.find(c =>
          c.types.includes(type)
        );
        return result ? result.long_name : "";
      };

      const area = getComponent("sublocality_level_1") ||
                   getComponent("neighborhood") ||
                   getComponent("locality") || "";
      const city = getComponent("locality") ||
                   getComponent("administrative_area_level_2") || "";
      const state = getComponent("administrative_area_level_1") || "";

      setFormData((prev) => ({
        ...prev,
        area,
        city,
        state,
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["age", "chargeshourly", "chargesmonthly"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://helperportalbackend.onrender.com/helpers", formData);
      navigate("/helpers");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="helper-container">
      <div className="form-box">
        <h2>Register as a Helper</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
          <input name="serviceType" list="services" placeholder="Service Type" value={formData.serviceType} onChange={handleChange} required />
          <datalist id="services">
            {serviceSuggestions.map((s, idx) => <option key={idx} value={s} />)}
          </datalist>

          {/* Google Autocomplete Input */}
          <input
            ref={autocompleteRef}
            placeholder="Search Area / City / State..."
            type="text"
          />

          {/* Populated Fields */}
          <input placeholder="Area" name="area" value={formData.area} readOnly />
          <input placeholder="City" name="city" value={formData.city} readOnly />
          <input placeholder="State" name="state" value={formData.state} readOnly />

          <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input name="chargeshourly" type="number" placeholder="Charges per Hour" value={formData.chargeshourly} onChange={handleChange} required />
          <input name="chargesmonthly" type="number" placeholder="Charges per Month" value={formData.chargesmonthly} onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
