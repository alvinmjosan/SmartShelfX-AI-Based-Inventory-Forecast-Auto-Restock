import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const VendorMenu = () => {
  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #ece9f7 0%, #cfd8dc 100%)",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        align="center"
        style={{
          background: "linear-gradient(90deg, #455a64 0%, #90a4ae 100%)",
          padding: "28px 0",
          color: "#f3e5f5",
          fontWeight: 800,
          fontSize: "2.3rem",
          letterSpacing: "1.2px",
          textShadow: "2px 2px 10px rgba(69,90,100,0.18)",
          borderBottom: "3px solid #607d8b",
          boxShadow: "0 4px 20px rgba(69,90,100,0.18)",
        }}
      >
        Vendor <span style={{ color: "#fff" }}>Dashboard</span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        expand="lg"
        style={{
          background: "#fff",
          borderRadius: "14px",
          margin: "30px auto",
          boxShadow: "0 4px 20px rgba(69,90,100,0.12)",
          maxWidth: "88%",
          padding: "12px 24px",
        }}
      >
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ fontWeight: "500", width: "100%", fontSize: "1rem" }}>
            <Nav.Link
              href="/ShowSingleUser"
              style={{
                color: "#455a64",
                fontWeight: 600,
                marginLeft: "10px",
                marginRight: "auto",
                transition: "all 0.3s ease",
              }}
              onMouseOver={e => (e.target.style.color = "#1a237e")}
              onMouseOut={e => (e.target.style.color = "#455a64")}
            >
              Show User Details
            </Nav.Link>
            <Nav.Link
              href="/"
              style={{
                color: "#fff",
                fontWeight: 600,
                background: "linear-gradient(90deg, #607d8b, #455a64)",
                borderRadius: "10px",
                marginLeft: "auto",
                marginRight: "10px",
                padding: "8px 18px",
                textShadow: "1px 1px 3px rgba(69,90,100,0.2)",
                boxShadow: "0 3px 10px rgba(96,125,139,0.16)",
                transition: "0.3s",
              }}
              onMouseOver={e =>
                (e.target.style.background =
                  "linear-gradient(90deg, #78909c, #455a64)")
              }
              onMouseOut={e =>
                (e.target.style.background =
                  "linear-gradient(90deg, #607d8b, #455a64)")
              }
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Welcome Section for Vendor */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "60px",
          textAlign: "center",
          gap: "70px",
        }}
      >
        <div style={{ maxWidth: "480px", textAlign: "left" }}>
          <h2 style={{ fontWeight: 700, color: "#455a64", marginBottom: "14px" }}>
            Welcome, Vendor
          </h2>
          <p
            style={{
              color: "#444",
              lineHeight: "1.7",
              fontSize: "1.05rem",
            }}
          >
            Access your <b>vendor dashboard</b> to view partnerships, contracts, and user details. Manage your relationship with ease and clarity.
          </p>
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(69,90,100,0.11)",
            border: "3px solid rgba(69,90,100,0.12)",
            transition: "all 0.5s ease",
            maxWidth: "440px",
          }}
          onMouseOver={e => {
            e.currentTarget.style.boxShadow = "0 16px 38px rgba(69,90,100,0.28)";
            e.currentTarget.style.border = "3px solid #607d8b";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(69,90,100,0.11)";
            e.currentTarget.style.border = "3px solid rgba(69,90,100,0.12)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
            alt="Vendor Dashboard"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorMenu;