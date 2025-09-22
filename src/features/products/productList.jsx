import Product from "./productItem";

export default function ProductList({ products, setFilter }) {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
        
          {products?.length > 0
            ? products.map((product) => (
                <Product product={product} key={product.id} className={""} />
              ))
            : ""}
        </div>
      )}
    </div>
  );
}
