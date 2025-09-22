import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Loader from "./loader";
import { useState } from "react";
import useProducts from "../services/useProduct";
import useFilteredProducts from "../services/useFilteredProducts";
import { useSelector } from "react-redux";

function AppLayout() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("none");
  const [filter, setFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const state = useSelector((state) => state);
  useProducts();
  const products = state.product.products;

  const filteredProducts = useFilteredProducts(
    products,
    query,
    filter,
    sortBy,
    priceRange
  );

  const contextValue = {
    filteredProducts,
    allProducts: products,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    query,
    setQuery,
  };

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Navbar
        products={filteredProducts}
        query={query}
        setQuery={setQuery}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <Loader />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl" onClick={() => setShowMenu(false)}>
          <Outlet context={contextValue} />
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
