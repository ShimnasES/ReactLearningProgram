import ProductReview from "./productReview";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart  } from "../cart/cartSlice";

export default function ProductDescription({ id, handleShowPopup }) {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    async function GetProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
      }

      return function () {
        controller.abort();
      };
    }

    GetProduct();
  }, [id]);

  
  function addItemToCart(product) {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      unitPrice: product.price,
      description:product.description,
      category:product.category,
      quantity: 1,
      totalPrice: product.price,
      rating: product.rating,
      image: product.image,
    }));
    handleShowPopup(false);
  }

  return (
    <div className="product-description-overlay">
      <div className="product-description-popup">
        <button
          className="close-btn"
          alt="close"
          onClick={() => handleShowPopup(false)}
        >
          X
        </button>
        <img
          className="product-description-image"
          src={product.image}
          alt={product.title}
        />
        <h3 className="product-description-title">{product.title}</h3>
        <p className="product-description-details">{product.description}</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="product-description-price">
            <strong>Price:</strong> <span data-testid="product-price"> ${product.price}</span>
          </p>
          <p className="product-description-category">
            <strong>Product Category </strong>: <span data-testid="product-category"> {product.category}</span>
          </p>

          <div className="product-description-rating">
            <ProductReview rating={product.rating} />
          </div>
          <button 
            style={{ marginTop: "10px" }}
            className="add-to-cart-btn"
            onClick={() => addItemToCart(product)}
            disabled={!product.id}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
