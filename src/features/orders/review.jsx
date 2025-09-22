import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdateReview, deleteReview } from "../orders/orderSlice";

export default function OrderReview({ itemId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);

  const dispatch = useDispatch();
//   const currentState = useSelector((state) => state.order);
//   console.log(currentState);
  //   if(currentState){}
  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") return;

    const newReview = {
      reviewId: reviewId ?? crypto.randomUUID(),
      itemId,
      rating,
      comments: comment,
      date: new Date().toLocaleString(),
    };

    dispatch(addOrUpdateReview(newReview));

    setReviews((prev) => {
      const updated = prev.filter((r) => r.reviewId !== newReview.reviewId);
      return [...updated, newReview];
    });

    setRating(0);
    setComment("");
    setReviewId(null);
  };

  const handleReviewEdit = (review) => {
    setReviewId(review.reviewId);
    setRating(review.rating);
    setComment(review.comments);
    setReviewId(review.reviewId);
  };

  const handleReviewDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      dispatch(deleteReview(id));
      setReviews((prev) => prev.filter((r) => r.reviewId !== id));
    }
  };

  return (
    <div className="review-container">
      <h2 className="black">Product Reviews</h2>

      <div className="review-form">
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${
                  starValue <= (hover || rating) ? "filled" : ""
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {reviewId ? "Update Review" : "Submit Review"}
        </button>
      </div>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="black">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="review-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {console.log("review", review)}
              <div>
                <div className="review-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="black">{review.comments}</p>
                <span className="review-date">{review.date}</span>
              </div>
              <div>
                <button
                  onClick={() => handleReviewEdit(review)}
                  title="Edit"
                  style={{
                    marginRight: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-edit black"></i>
                </button>

                <button
                  onClick={() => handleReviewDelete(review.reviewId)}
                  title="Delete"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-trash black"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
