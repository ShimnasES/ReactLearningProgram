import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import OrderSummary from "./cartSummary";
import Product from "../products/productItem";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const currentState = useSelector((state) => state.cart);
  const totalQuantity = currentState.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalAmount = currentState.cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const { allProducts } = useOutletContext();
  const selectedCategory = currentState.cart.map((x) => x.category);
  const selectedProduct = currentState.cart.map((c) => c.id);
  const products = allProducts.filter(
    (product) =>
      selectedCategory.includes(product.category) &&
      !selectedProduct.includes(product.id)
  );

  return (
    <>
      <div className="cart-grid">
        {totalQuantity === 0 ? (
          <h1 className="summary-total">
            Your cart is empty!.Please add item to proceed.
          </h1>
        ) : (
          <>
            <div className="cart-order-list">
              <h1 className="cart-header">Your Cart Items</h1>

              {currentState.cart?.map((item) => (
                <CartItem cartItem={item} key={item.id} actions={true} />
              ))}
            </div>
            <OrderSummary
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
            />
          </>
        )}
      </div>
      {totalQuantity > 0 && (
        <div className="cart-grid-relative">
          <h1 className="cart-header">
            Products related to items in your cart
          </h1>
          <div className="product-scroll-container">
            {products.map((item) => (
              <Product
                product={item}
                key={item.id}
                className={"relative-item"}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
