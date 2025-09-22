import { useState, useEffect } from "react";

export default function useFilteredProducts(
  products,
  query,
  filter,
  sortBy,
  priceRange,
  filtersApplied = false
) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = [...products];

    // Filter products by query
    if (query.length > 2) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filtersApplied) {
      if (filter !== "all") {
        filtered = filtered.filter((p) => p.category.includes(filter));
      }

      if (priceRange[0] || priceRange[1]) {
        filtered = filtered.filter(
          (p) =>
            p.price >= (priceRange[0] || 0) &&
            p.price <= (priceRange[1] || Infinity)
        );
      }

      if (sortBy === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      }
    }
    const filteredProducts = [...filtered];
    setFilteredProducts(filteredProducts);
  }, [query, products, filter, sortBy, priceRange, filtersApplied]);

  return filteredProducts;
}
