import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignOutAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../CSS/Home.css"
const Home = () => {

  const [patients, setPatients] = useState(() => {
    return JSON.parse(localStorage.getItem("patients")) || [];
  });
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    disease: "",
    contact: "",
  });
  const [error, setError] = useState("");

  
  const toggleSidebar = () => {
    if (window.innerWidth > 768) {
      handleLogout();
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  }
  const closeSidebar = () => setSidebarOpen(false);

  const navigate = useNavigate()

   useEffect(() => {
     const isLoggedIn = localStorage.getItem("isLoggedIn");
     if (isLoggedIn !== "true") {
       navigate("/");
       return;
     }

     const preventBackNavigation = () => {
       window.history.pushState(null, null, window.location.href);
       navigate("/");
     };

     window.history.pushState(null, null, window.location.href);
     window.addEventListener("popstate", preventBackNavigation);
     return () => {
       window.removeEventListener("popstate", preventBackNavigation);
     };
   }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, 
    }));
  };

  const validateForm = () => {
    const { name, age, dob, disease, contact } = formData;

    if (!name || !age || !dob || !disease || !contact) {
      setError("All fields are required.");
      return false;
    }

    if (age < 1 || age > 100 || isNaN(age)) {
      setError("Age must be a number between 1 to 100.");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(contact)) {
      setError("Contact must be a valid 10-digit mobile number.");
      return false;
    }

    setError("");
    return true;
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedPatients = [...patients, formData];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setFormData({ name: "", age: "", dob: "", disease: "", contact: "" });
    setShowForm(false);
  };

  const handleDeletePatient = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  return (
    <div
      style={{
        backgroundColor: "#f8e1f0",
        minHeight: "100vh",
        color: "#7f0356",
        padding: "1rem",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center mx-auto hos-title" style={{ color: "#7f0356" }}>
          Hospital Management
        </h1>
        <button
          className="btn"
          onClick={toggleSidebar}
          style={{
            backgroundColor: "#7f0356",
            color: "#ffffff",
            border: "none",
          }}
        >
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar}></div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
          style={{
            fontSize: "18px",
            border: "none",
            fontWeight:"bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Add Patient Button */}
      <div className="text-center my-4">
        <button
          className="btn btn-success"
          onClick={() => setShowForm(!showForm)}
        >
          Add Patients
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Patient Form */}
      {showForm && (
        <form
  className="p-4 bg-black rounded shadow mx-auto"
  style={{ maxWidth: "500px" }}
  onSubmit={handleAddPatient}
>
  <h3 className="text-center mb-4">Add Patient</h3>
  <div className="mb-3">
    <label htmlFor="name" style={{color:"#7f0356",fontSize:"1.2rem",fontWeight:"bolder"}}>Name</label>
    <input
      type="text"
      className="form-control border-bottom-only"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="age" style={{color:"#7f0356",fontSize:"1.2rem",fontWeight:"bolder"}}>Age</label>
    <input
      type="number"
      className="form-control border-bottom-only"
      name="age"
      id="age"
      value={formData.age}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="dob" style={{color:"#7f0356",fontSize:"1.2rem",fontWeight:"bolder"}}>Date of Birth</label>
    <input
      type="date"
      className="form-control border-bottom-only"
      name="dob"
      id="dob"
      value={formData.dob}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="disease" style={{color:"#7f0356",fontSize:"1.2rem",fontWeight:"bolder"}}>Disease</label>
    <textarea
      className="form-control"
      name="disease"
      rows="3"
      id="disease"
      value={formData.disease}
      onChange={handleInputChange}
      required
    ></textarea>
  </div>
  <div className="mb-3">
    <label htmlFor="contact" style={{color:"#7f0356",fontSize:"1.2rem",fontWeight:"bolder"}}>Contact</label>
    <input
      type="text"
      className=" border-bottom-only"
      id="contact"
      name="contact"
      value={formData.contact}
      onChange={handleInputChange}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary w-100">
    Save Patient
  </button>
</form>
)}

      {/* Patient Cards */}
      <div className="container mt-4">
        <div className="row">
          {patients.map((patient, index) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
              <div
                className="card shadow position-relative"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#7f0356",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  className="position-absolute"
                  style={{ top: "10px", right: "10px" }}
                >
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePatient(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="card-body">
                  <h3 className="card-title text-center" style={{ color: "#7f0356" }}>
                    <i>{patient.name}</i>
                  </h3>
                  <p className="card-text"><strong>Age:</strong> <i>{patient.age}</i></p>
                  <p className="card-text"><strong>DOB:</strong> <i>{patient.dob}</i> </p>
                  <p className="card-text"><strong>Disease:</strong> <i>{patient.disease}</i></p>
                  <p className="card-text"><strong>Contact:</strong> <i>{patient.contact}</i></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
