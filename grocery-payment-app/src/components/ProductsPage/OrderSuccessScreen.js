import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);
  const txRef = new URLSearchParams(window.location.search).get("tx_ref");

  useEffect(() => {
    if (!txRef) return;
    fetch(`http://localhost:5000/order-details?tx_ref=${txRef}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch(() => setOrder(null));
  }, [txRef]);

  const handleDownload = async () => {
    const element = document.getElementById("receipt");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save("receipt.pdf");
  };

  if (!order && txRef) {
    return <p className="text-center mt-5">Verifying your order...</p>;
  }

  if (!order) {
    return (
      <div className="text-center mt-5 text-danger">
        <h4>Order verification failed.</h4>
        <a href="/" className="btn btn-outline-primary mt-3">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>✅ Payment Successful!</h2>
        <p>
          Thank you, <strong>{order.customer_name}</strong>!
        </p>
        <p>
          Transaction Reference: <strong>{order.tx_ref}</strong>
        </p>

        <button className="btn btn-success mt-3" onClick={handleDownload}>
          Download Receipt
        </button>
        <a href="/" className="btn btn-outline-primary mt-3 ms-3">
          Continue Shopping
        </a>
      </div>

      <div
        id="receipt"
        style={{
          backgroundColor: "#f8f8f8",
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "10px",
        }}>
        <h4>🧾 Digital Grocery Receipt</h4>
        <p>
          <strong>Name:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {order.customer_email}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer_phone}
        </p>
        <p>
          <strong>Total Paid:</strong> ₦{order.total_amount}
        </p>
        <p>
          <strong>Reference:</strong> {order.tx_ref}
        </p>
        <p>
          <strong>Status:</strong> Paid
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
