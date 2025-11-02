import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveProduct,
  generateProductId,
} from "../../Services/ProductService";
import { getSkuIdList } from "../../Services/SKUService";
import { getVendorIdList } from "../../Services/LoginService";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  card: {
    background: "#fff",
    padding: "2.5rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "25px",
    fontSize: "1.8rem",
    fontWeight: "700",
    textDecoration: "underline",
    textUnderlineOffset: "8px",
    textDecorationColor: "#007bff",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  fullWidth: { gridColumn: "1 / -1" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#555",
    fontSize: "0.9rem",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  inputError: { border: "1px solid red" },
  errorText: { color: "red", fontSize: "0.75rem", marginTop: "2px" },
  readOnlyInput: {
    backgroundColor: "#e9ecef",
    cursor: "not-allowed",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "0.3s",
    minWidth: "120px",
  },
  addButton: { backgroundColor: "#28a745", color: "white" },
  resetButton: { backgroundColor: "#ffc107", color: "white" },
  returnButton: { backgroundColor: "#007bff", color: "white" },
};

const ProductAddition = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    sku: "",
    purchasePrice: "",
    salesPrice: "",
    stock: "",
    reorderLevel: "",
    vendorId: "",
    status: true,
  });

  const [errors, setErrors] = useState({});
  const [skuList, setSkuList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // Fetch product ID, SKUs, and Vendors on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [idRes, skuRes, vendorRes] = await Promise.all([
          generateProductId(),
          getSkuIdList(),
          getVendorIdList(),
        ]);

        setProduct((prev) => ({ ...prev, productId: idRes.data }));
        setSkuList(skuRes.data);
        setVendorList(vendorRes.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }
    if (!product.sku.trim()) {
      tempErrors.sku = "SKU is required";
      isValid = false;
    }
    if (!product.purchasePrice || Number(product.purchasePrice) < 1) {
      tempErrors.purchasePrice = "Purchase Price must be at least 1";
      isValid = false;
    }
    if (!product.stock || Number(product.stock) < 1) {
      tempErrors.stock = "Stock must be at least 1";
      isValid = false;
    }
    if (!product.reorderLevel || Number(product.reorderLevel) < 1) {
      tempErrors.reorderLevel = "Reorder Level must be at least 1";
      isValid = false;
    }
    if (!product.vendorId.trim()) {
      tempErrors.vendorId = "Vendor ID is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedProduct = {
      ...product,
      status: Number(product.stock) > Number(product.reorderLevel),
    };

    try {
      await saveProduct(updatedProduct);
      alert("✅ Product added successfully.");
      navigate("/AdProdRepo");
    } catch (err) {
      console.error("Add product failed:", err);
      alert("❌ Add product failed. Check console for details.");
    }
  };

  const handleReset = () => {
    setProduct((prev) => ({
      ...prev,
      productName: "",
      sku: "",
      purchasePrice: "",
      salesPrice: "",
      stock: "",
      reorderLevel: "",
      vendorId: "",
    }));
    setErrors({});
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Product ID</label>
              <input
                type="text"
                name="productId"
                value={product.productId}
                readOnly
                style={{ ...styles.input, ...styles.readOnlyInput }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Product Name</label>
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.productName ? styles.inputError : {}),
                }}
              />
              {errors.productName && (
                <p style={styles.errorText}>{errors.productName}</p>
              )}
            </div>

            {/* ✅ SKU Dropdown */}
            <div style={styles.formGroup}>
              <label style={styles.label}>SKU</label>
              <select
                name="sku"
                value={product.sku}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.sku ? styles.inputError : {}),
                }}
              >
                <option value="">Select SKU</option>
                {skuList.map((sku) => (
                  <option key={sku} value={sku}>
                    {sku}
                  </option>
                ))}
              </select>
              {errors.sku && <p style={styles.errorText}>{errors.sku}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={product.purchasePrice}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.purchasePrice ? styles.inputError : {}),
                }}
              />
              {errors.purchasePrice && (
                <p style={styles.errorText}>{errors.purchasePrice}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.stock ? styles.inputError : {}),
                }}
              />
              {errors.stock && (
                <p style={styles.errorText}>{errors.stock}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Reorder Level</label>
              <input
                type="number"
                name="reorderLevel"
                value={product.reorderLevel}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.reorderLevel ? styles.inputError : {}),
                }}
              />
              {errors.reorderLevel && (
                <p style={styles.errorText}>{errors.reorderLevel}</p>
              )}
            </div>

            {/* ✅ Vendor Dropdown */}
            <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
              <label style={styles.label}>Vendor ID</label>
              <select
                name="vendorId"
                value={product.vendorId}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.vendorId ? styles.inputError : {}),
                }}
              >
                <option value="">Select Vendor</option>
                {vendorList.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              {errors.vendorId && (
                <p style={styles.errorText}>{errors.vendorId}</p>
              )}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.addButton }}
            >
              Add Product
            </button>
            <button
              type="button"
              style={{ ...styles.button, ...styles.resetButton }}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              style={{ ...styles.button, ...styles.returnButton }}
              onClick={() => navigate(-1)}
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddition;
