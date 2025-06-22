import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import backgroundImage from "./assets/helping-hands-bg.png";
import "./HelpersList.css";

export default function HelpersList() {
  const [helpers, setHelpers] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // id to delete
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = () => {
    axios
      .get("https://helperportalbackend.onrender.com/helpers")
      .then((res) => setHelpers(res.data))
      .catch((err) => console.error(err));
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowConfirm(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://helperportalbackend.onrender.com/helpers/${deleteId}`);
      setShowConfirm(false);
      setDeleteId(null);
      fetchHelpers();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete helper. Please try again.");
    }
  };

  return (
    <div
      className="helpers-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="helpers-content">
        <div className="helpers-header" style={{ marginBottom: "1rem" }}>
          <h2 className="helpers-title">Helper List</h2>
          {/* Back to Home link added here */}
          <Link
            to="/"
            style={{
              color: "#D2691E",
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            &larr; Back to Home
          </Link>
        </div>
        <table className="helpers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service Type</th>
              <th>Area</th>
              <th>Charges</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((helper) => (
              <tr key={helper._id}>
                <td>{helper.name}</td>
                <td>{helper.contact}</td>
                <td>{helper.serviceType}</td>
                <td>{helper.area}</td>
                <td>{helper.chargesHourly}</td>
                <td
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <Link to={`/helpers/edit/${helper._id}`}>
                    <Pencil
                      size={18}
                      color="#D2691E"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Trash2
                    size={18}
                    color="#D2691E"
                    style={{ cursor: "pointer" }}
                    onClick={() => confirmDelete(helper._id)}
                    title="Delete helper"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#3B2F2F", // dark background
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "350px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#F5F1E9", marginBottom: "1.5rem" }}>
              Are you sure you want to delete this helper?
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: "#D2691E",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  color: "#F5F1E9",
                  fontWeight: "600",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#D2691E",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  color: "#F5F1E9",
                  fontWeight: "600",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
