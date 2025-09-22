
export default function ProductReview({ rating }) {
  return (
    <>
      <strong>Rating:</strong>{" "}
      {Array.from({ length: Math.round(rating?.rate || 0) }).map((_, i) => (
        <span key={i} style={{ color: "#FFD700" }}>
          ★
        </span>
      ))}
      {Array.from({ length: 5 - Math.round(rating?.rate || 0) }).map(
        (_, i) => (
          <span key={i + 5} style={{ color: "#ccc" }}>
            ★
          </span>
        )
      )}{" "}
      ({rating?.count || 0} reviews)
    </>
  );
}
