import ProductDescription from "./productDetails";
import ProductReview from "./productReview";
import React, { useState } from "react";

export default function Product({ product, setFilter,className }) {
  const [showPopup, setShowPopup] = useState(false);
 

  const shortDescription =
    product.description.length > 100
      ? product.description.slice(0, 50) + "..."
      : product.description;

  function handleShowPopup(isShow) {
    setShowPopup(isShow);
  }

  return (
    <>
      <div className={`product-card ${className}`} onClick={() => handleShowPopup(true)}>
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
        />
        <h3>{product.title}</h3>
        <p className="product-description">{shortDescription}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <div className="product-rating">
          <ProductReview rating={product.rating} />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <ProductDescription
              id={product.id}
              handleShowPopup={handleShowPopup}
            />
          </div>
        </div>
      )}
    </>
  );
}
