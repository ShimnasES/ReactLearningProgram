import { useOutletContext } from "react-router-dom";
import { useState } from "react";
export default function ProductFilter({ applyFilters }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const clearFilter = () => {
    setSortBy("");
    setFilter("none");
    setPriceRange([0, 1000]);
    setIsDrawerOpen(false);
  };

  const { filter, setFilter, sortBy, setSortBy, priceRange, setPriceRange } =
    useOutletContext();

  return (
    <>
      <div className="product-list">
        <button onClick={toggleDrawer} className="drawer-toggle">
          <i className="fa-solid fa-filter"></i>
        </button>

        <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <h4 className="price-header">Shop by category</h4>

          <div class="filter-group">
            <select
              className="select-dropdown"
              value={filter}
              id="category"
              name="category"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Kitchen</option>
            </select>
          </div>

          <div className="filter-group price-range-container">
            <h4 className="price-header">Sort by Price</h4>

            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              placeholder="Min"
              className="price-input"
            />
            <span className="to-label">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              placeholder="Max"
              className="price-input"
            />
          </div>

          <div class="filter-group">
            <h4 className="price-header">Sort by Price</h4>

            <select
              className="select-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="none">None</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="category">Category</option>
            </select>
          </div>

          <button
            type="button"
            className="filter-button"
            onClick={applyFilters}
          >
            Apply
          </button>

          <button
            type="button"
            className="filter-button"
            onClick={clearFilter}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
