import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./OrderSuccessScreen.css";

const OrderSuccessScreen = () => {
  const [txRef, setTxRef] = useState("");
  const [receiptVisible, setReceiptVisible] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tx = query.get("tx_ref") || query.get("transaction_id");
    if (tx) setTxRef(tx);
  }, []);

  // Set receipt visible once txRef is available
  useEffect(() => {
    if (txRef) {
      setTimeout(() => setReceiptVisible(true), 200); // Allow render to complete
    }
  }, [txRef]);

  const handleDownload = async () => {
    const element = document.getElementById("receipt");
    if (!element) {
      alert("Receipt not ready. Please try again in a moment.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("receipt.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("An error occurred while generating the receipt.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-success">✅ Payment Successful!</h2>
        <p>Your order has been placed successfully.</p>
        {txRef && (
          <p className="text-muted">
            <strong>Transaction Ref:</strong> {txRef}
          </p>
        )}

        <button
          className="btn btn-primary mt-3"
          onClick={handleDownload}
          disabled={!receiptVisible}>
          Download Receipt
        </button>
        <a href="/products" className="btn btn-outline-success mt-3 ms-3">
          Continue Shopping
        </a>
      </div>

      {receiptVisible && (
        <div
          id="receipt"
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            width: "600px",
            margin: "20px auto",
            backgroundColor: "#fff",
            color: "#333",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}>
          <h4 className="mb-3 text-center">🧾 Digital Grocery Receipt</h4>
          <hr />
          <p>
            <strong>Date:</strong> {new Date().toLocaleString()}
          </p>
          <p>
            <strong>Transaction Ref:</strong> {txRef}
          </p>
          <p>
            <strong>Status:</strong> Paid
          </p>
          <p>Thank you for shopping with us!</p>
        </div>
      )}
    </div>
  );
};

export default OrderSuccessScreen;
