import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  deleteFromCart,
} from "../cart/cartSlice";

import OrderReview from "../orders/review";

export default function CartItem({ cartItem, actions }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-item">
        <div className="cart-item-image">
          <img
            className="cart-image"
            src={cartItem.image}
            alt={cartItem.title}
          />
        </div>
        <div className="cart-product-detail">
          <h2 className="cart-item-title">{cartItem.title}</h2>
          <h2 className="cart-description">{cartItem.category}</h2>
          <h2>
            <strong>Price:</strong> ${cartItem.unitPrice}
          </h2>
        </div>
        {actions && (
          <div className="cart-buttons">
            {cartItem.quantity === 1 && (
              <button
                className="btn delete-btn"
                onClick={() => dispatch(deleteFromCart(cartItem.id))}
              >
                <i className="fas fa-trash" data-testid="delete-icon" ></i>
              </button>
            )}

            {cartItem.quantity > 1 && (
              <button
                className="btn delete-btn"
                onClick={() => dispatch(decreaseItemQuantity(cartItem.id))}
              >
                <i className="fas fa-minus" data-testid="minus-icon" ></i>
              </button>
            )}

            <span className="cart-Qty">{cartItem.quantity}</span>
            <button
              className="btn add-btn"
              onClick={() => dispatch(increaseItemQuantity(cartItem.id))}
            >
              <i className="fas fa-plus" data-testid="plus-icon" ></i>
            </button>
          </div>
        )}

        {!actions && <OrderReview itemId={cartItem.id} />}
      </div>
    </>
  );
}
