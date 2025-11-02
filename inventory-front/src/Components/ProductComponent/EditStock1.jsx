import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getProductById, issueProduct, purchaseProduct } from "../../Services/ProductService";
import { generateTransactionId, saveTransaction } from "../../Services/TransactionService";

const styles = {
  container: { display: "flex", justifyContent: "center", padding: "40px 0", backgroundColor: "#f8f9fa" },
  card: { backgroundColor: "#fff", padding: "30px 40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "450px" },
  title: { textAlign: "center", fontSize: "1.8em", fontWeight: "700", marginBottom: "25px", textDecoration: "underline" },
  row: { marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  label: { fontWeight: "600", width: "180px" },
  value: { fontWeight: "500", width: "250px", textAlign: "left" },
  input: { width: "250px", padding: "6px 8px", borderRadius: "4px", border: "1px solid #ced4da" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" },
  button: { padding: "10px 25px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "1em" },
};

const EditStock1 = () => {
  const { id } = useParams(); // optional if user navigates from Product List
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "OUT"; // OUT = Issue, IN = Purchase
  const returnPath = "/AdProdRepo";

  const [product, setProduct] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // optional
        const resProduct = await getProductById(Number(id)); // ensure numeric productId
        setProduct(resProduct.data);

        const resTransaction = await generateTransactionId();
        setTransactionId(resTransaction.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!quantity || quantity <= 0) {
      setMessage("Please enter a valid quantity.");
      return;
    }
    if (!transactionDate) {
      setMessage("Please select a transaction date.");
      return;
    }

    const transaction = {
      transactionId,
      transactionType: type,
      productId: Number(product.productId),
      quantity: Number(quantity),
      rate: type === "OUT" ? product.salesPrice : product.purchasePrice,
      transactionValue: Number(quantity) * (type === "OUT" ? product.salesPrice : product.purchasePrice),
      transactionDate,
      userId: localStorage.getItem("loggedInUser") || "unknown",
    };

    try {
      await saveTransaction(transaction);
      if (type === "OUT") await issueProduct(Number(product.productId), Number(quantity));
      else await purchaseProduct(Number(product.productId), Number(quantity));

      alert("Transaction saved successfully!");
      navigate(returnPath);
    } catch (err) {
      console.error(err);
      setMessage("Error saving transaction. Check console/network tab.");
    }
  };

  if (!product) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading product details...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{type === "OUT" ? "Product Issue" : "Product Purchase"}</h2>

        <div style={styles.row}><span style={styles.label}>Product Id:</span> <span style={styles.value}>{product.productId}</span></div>
        <div style={styles.row}><span style={styles.label}>SKU:</span> <span style={styles.value}>{product.sku}</span></div>
        <div style={styles.row}><span style={styles.label}>Product Name:</span> <span style={styles.value}>{product.productName}</span></div>
        <div style={styles.row}><span style={styles.label}>{type === "OUT" ? "Sales Price:" : "Purchase Price:"}</span> <span style={styles.value}>{type === "OUT" ? product.salesPrice : product.purchasePrice}</span></div>
        <div style={styles.row}><span style={styles.label}>Reorder Level:</span> <span style={styles.value}>{product.reorderLevel}</span></div>
        <div style={styles.row}><span style={styles.label}>Stock:</span> <span style={styles.value}>{product.stock}</span></div>
        <div style={styles.row}><span style={styles.label}>Vendor:</span> <span style={styles.value}>{product.vendorId}</span></div>

        <div style={styles.row}><span style={styles.label}>Transaction Id:</span> <input type="text" value={transactionId} readOnly style={styles.input} /></div>
        <div style={styles.row}>
          <span style={styles.label}>Select Transaction Date:</span>
          <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.row}>
          <span style={styles.label}>{type === "OUT" ? "Enter Issued Quantity:" : "Enter Purchased Quantity:"}</span>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={styles.input} />
        </div>

        {message && <p style={{ color: "red", fontWeight: "600" }}>{message}</p>}

        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, backgroundColor: "#28a745", color: "#fff" }} onClick={handleSave}>Save</button>
          <button style={{ ...styles.button, backgroundColor: "#17a2b8", color: "#fff" }} onClick={() => navigate(returnPath)}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default EditStock1;
