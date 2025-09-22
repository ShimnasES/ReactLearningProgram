import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  products,
  query,
  setQuery,
  user,
  showMenu,
  setShowMenu,
}) {
  const navigate = useNavigate();
  const currentState = useSelector((state) => state.cart);
  const cartCount = currentState.cart?.length || 0;

  const userInfo = JSON.parse(localStorage.getItem("user"));

  function handleRedirectToCart() {
    setShowMenu(false);
    navigate("/cart");
  }

  function handleRedirectToHome() {
    setShowMenu(false);
    navigate("/");
  }

  function handleEdit() {
    setShowMenu(false);
    navigate("/Edit");
  }

  function handleLogout() {
    
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className="nav-bar">
      <div className="logo" onClick={handleRedirectToHome}>
        <span role="img">
          <img
            src="./logoIcon.svg"
            alt="Stock Pit"
            height={50}
            width={50}
          ></img>
        </span>
        <h1>Stock Pit</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{products.length}</strong> results
      </p>
      <p className="cart-button" onClick={handleRedirectToCart}>
        🛒
        {cartCount > 0 && (
          <span className="badge badge-warning" id="lblCartCount">
            {cartCount}
          </span>
        )}
      </p>

      <div className="navbar-right">
        <div
          className="user-avatar-fallback"
          onClick={() => setShowMenu(!showMenu)}
        >
          {userInfo?.name?.charAt(0).toUpperCase()}
        </div>

        {showMenu && (
          <div className="user-menu">
            <ul>
              <li>
                <button onClick={handleEdit}>Edit</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
