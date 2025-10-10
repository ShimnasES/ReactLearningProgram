import ProductList from "../features/products/productList";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import ProductFilter from "../features/products/productFilter";
import useFilteredProducts from "../services/useFilteredProducts";

export default function Home() {
  const [filtersApplied, setFiltersApplied] = useState(false);
  const {
    filteredProducts,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    query,
    setQuery,
  } = useOutletContext();

  const productList = useFilteredProducts(
    filteredProducts,
    query,
    filter,
    sortBy,
    priceRange,
    filtersApplied
  );

  function ApplyFilters() {
    setFiltersApplied((prev) => !prev);
  }

  function clearFilters() {
    setFiltersApplied(false);
  }

  return (
    <>
      <ProductFilter
        setFilter={setFilter}
        priceRange={priceRange}
        setFilterCategory={setFilter}
        setSortBy={setSortBy}
        setPriceRange={setPriceRange}
        setQuery={setQuery}
        applyFilters={ApplyFilters}
        clearFilters={clearFilters}
      />

      <ProductList products={productList} setFilter={filter} />
    </>
  );
}
