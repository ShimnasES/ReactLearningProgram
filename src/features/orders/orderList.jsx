import { useSelector } from "react-redux";
import CartItem from "../cart/cartItem";

export default function OrderList() {
  const currentState = useSelector((state) => state.order?.orders);
  
  return (
    <div className="order-grid">
      <div className="order-list">
        <h1 className="cart-header">Your order(s)</h1>
        {currentState.map((item) => (
          <CartItem cartItem={item} key={item.id} actions={false} />
        ))}
      </div>
    </div>
  );
}
