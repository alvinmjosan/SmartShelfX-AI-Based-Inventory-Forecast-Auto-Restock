import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const ManagerMenu = () => {
  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        align="center"
        style={{
          background: "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
          padding: "28px 0",
          color: "#fffde7",
          fontWeight: 800,
          fontSize: "2.5rem",
          letterSpacing: "1.5px",
          textShadow: "2px 2px 10px rgba(25,118,210,0.18)",
          borderBottom: "3px solid #00bcd4",
          boxShadow: "0 4px 20px rgba(25,118,210,0.18)",
        }}
      >
       Manager <span style={{ color: "#ffffff" }}>Dashboard</span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        expand="lg"
        style={{
          background: "#fff",
          borderRadius: "14px",
          margin: "30px auto",
          boxShadow: "0 4px 25px rgba(25,118,210,0.12)",
          maxWidth: "88%",
          padding: "12px 24px",
        }}
      >
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ fontWeight: "500", width: "100%", fontSize: "1rem" }}>
            <NavDropdown title="SKU" id="sku-nav-dropdown">
              <NavDropdown.Item href="/SkuRepo?from=manager">SKU List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Product" id="product-nav-dropdown">
              <NavDropdown.Item href="MngProdRepo">Product List</NavDropdown.Item>
              <NavDropdown title="Product Analysis" id="product-analysis-dropdown" drop="end">
                <NavDropdown.Item href="/ProductAnalysis">All Product Sales</NavDropdown.Item>
                <NavDropdown.Item href="/SingleProductDemand">Single Product Demand</NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
            <NavDropdown title="Transaction" id="transaction-nav-dropdown">
              <NavDropdown.Item href="/Transactions?type=issue">Issued History</NavDropdown.Item>
              <NavDropdown.Item href="/Transactions?type=purchase">Purchase History</NavDropdown.Item>
              <NavDropdown.Item href="/Transactions">Transaction History</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/ShowSingleUser"
              style={{
                color: "#0288d1",
                fontWeight: 600,
                marginLeft: "10px",
                marginRight: "auto",
                transition: "0.3s",
              }}
              onMouseOver={e => (e.target.style.color = "#01579b")}
              onMouseOut={e => (e.target.style.color = "#0288d1")}
            >
              Show User Details
            </Nav.Link>
            <Nav.Link
              href="/"
              style={{
                color: "#fff",
                fontWeight: 600,
                background: "linear-gradient(90deg, #00bcd4, #1976d2)",
                borderRadius: "10px",
                marginLeft: "auto",
                marginRight: "10px",
                textShadow: "1px 1px 3px rgba(33,150,243,0.2)",
                padding: "8px 18px",
                transition: "0.3s",
                boxShadow: "0 3px 10px rgba(0,188,212,0.13)",
              }}
              onMouseOver={e =>
                (e.target.style.background =
                  "linear-gradient(90deg, #0288d1, #1976d2)")
              }
              onMouseOut={e =>
                (e.target.style.background =
                  "linear-gradient(90deg, #00bcd4, #1976d2)")
              }
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Welcome Section for Manager */}
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
          <h2 style={{ fontWeight: 700, color: "#1976d2", marginBottom: "14px" }}>
            Welcome, Manager
          </h2>
          <p
            style={{
              color: "#444",
              lineHeight: "1.7",
              fontSize: "1.05rem",
            }}
          >
            Oversee your <b>inventory</b> dashboard with powerful, actionable insights.
            Stay updated on SKUs, products, and transactions in your central manager hub.
          </p>
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(25,118,210,0.11)",
            border: "3px solid rgba(25,118,210,0.12)",
            transition: "all 0.5s ease",
            maxWidth: "440px",
          }}
          onMouseOver={e => {
            e.currentTarget.style.boxShadow = "0 16px 38px rgba(2,136,209,0.2)";
            e.currentTarget.style.border = "3px solid #00bcd4";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(25,118,210,0.11)";
            e.currentTarget.style.border = "3px solid rgba(25,118,210,0.12)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
            alt="Manager Dashboard"
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

export default ManagerMenu;