import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrders } from "../orders/orderSlice";
import { useSelector } from "react-redux";
import { clearCart } from "./cartSlice";

export default function OrderSummary({
  totalQuantity,
  totalAmount,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.cart);

  function addCartItemToOrders() {
    dispatch(addOrders(currentState?.cart));
    dispatch(clearCart());
    navigate("/Orders");
  }

  return (
    <div className="cart-order-summary">
      <h1 className="cart-header">Order summary</h1>

      <div className="cart-order-summary-details ">
        <h2 className="summary-item-title">No of item(s)</h2>
        <p className="cart-value">{totalQuantity}</p>

        <h2 className="summary-description">Discount ({totalQuantity} item)</h2>
        <p className="cart-value">$0</p>
        <hr />

        <h2 className="summary-total">Total Amount</h2>
        <p className="cart-value">${totalAmount.toFixed(2)}</p>
        <div className="place-order">
          <button
            style={{ marginTop: "10px" }}
            className="btn-place-order"
            onClick={addCartItemToOrders}
            disabled={totalQuantity === 0}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}
