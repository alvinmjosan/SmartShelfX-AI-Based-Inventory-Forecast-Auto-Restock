import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { findSKUById, update } from '../../Services/SKUService';

const SKUUpdate = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [sku, setSku] = useState(null); // start with null for loading state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // loading flag
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    findSKUById(id)
      .then(response => {
        setSku(response.data);
        setLoading(false);
      })
      .catch(() => {
        setFetchError("Error fetching SKU details");
        setLoading(false);
      });
  }, [id]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSku(prev => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!sku.skuId?.trim()) {
      tempErrors.skuId = "SKU ID is required";
      isValid = false;
    }

    if (!sku.skuDescription?.trim()) {
      tempErrors.skuDescription = "SKU description is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      update(sku)
        .then(() => {
          alert("SKU updated successfully");
          navigate('/SkuRepo');
        })
        .catch(() => {
          alert("Error updating SKU");
        });
    }
  };

  const cancelUpdate = () => {
    navigate('/SkuRepo');
  };

  if (loading) return <p>Loading SKU details...</p>;
  if (fetchError) return <p style={{ color: 'red' }}>{fetchError}</p>;

  return (
    <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Segoe UI, Arial, sans-serif",
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        padding: "40px 50px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#007bff",
          marginBottom: "25px",
          textDecoration: "underline",
          textUnderlineOffset: "6px",
        }}
      >
        Update SKU
      </h2>
  
      <form onSubmit={handleValidation}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            SKU ID:
          </label>
          <input
            placeholder="Enter SKU ID"
            name="skuId"
            className="form-control"
            value={sku.skuId}
            onChange={onChangeHandler}
            style={{
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ced4da",
              width: "100%",
            }}
          />
          {errors.skuId && (
            <p style={{ color: "red", marginTop: "6px", fontSize: "0.9em" }}>
              {errors.skuId}
            </p>
          )}
        </div>
  
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            SKU Description:
          </label>
          <input
            placeholder="Enter SKU Description"
            name="skuDescription"
            className="form-control"
            value={sku.skuDescription}
            onChange={onChangeHandler}
            style={{
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ced4da",
              width: "100%",
            }}
          />
          {errors.skuDescription && (
            <p style={{ color: "red", marginTop: "6px", fontSize: "0.9em" }}>
              {errors.skuDescription}
            </p>
          )}
        </div>
  
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#007bff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              marginRight: "10px",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Update
          </button>
  
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelUpdate}
            style={{
              backgroundColor: "#6c757d",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default SKUUpdate;
