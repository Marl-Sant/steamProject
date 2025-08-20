import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../store/comments";
import "./ReviewCommentModal.css";
import CommentArea from "../CommentArea/CommentArea.jsx";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function PostCommentModal({ onClose, reviewId, gameId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const allReviewsArray = reviews ? Object.entries(reviews) : [];
  const [isHelpful, setIsHelpful] = useState(null);

  const comments = useSelector((state) => state.comments?.allComments);
  let allCommentsArray;
  if (comments) {
    allCommentsArray = Object.entries(comments);
  } else {
    allCommentsArray = [];
  }

  useEffect(() => {
    if (reviewId) {
      dispatch(commentActions.setCommentsState(reviewId));
    }
  }, [gameId, reviewId, dispatch]);

  const reviewComments = allCommentsArray.filter(
    (comment) => comment[1].reviewId === reviewId
  );
  const selectedReview = allReviewsArray.find(
    (review) => review[1].id === reviewId
  );

  const review = selectedReview ? selectedReview[1] : null;

  let isHelpfulCount = 0;
  let isNotHelpfulCount = 0;

  if (allCommentsArray) {
    allCommentsArray.forEach((entry) => {
      const comment = entry[1];
      if (comment.isHelpful === true) isHelpfulCount++;
      else if (comment.isHelpful === false) isNotHelpfulCount++;
    });
  }

  let sentiment = "No Ratings";
  const total = isHelpfulCount + isNotHelpfulCount;

  if (total === 1) {
    sentiment = isHelpfulCount === 1 ? "Mostly Helpful" : "Mostly Not Helpful";
  } else if (total > 1) {
    const ratio = isHelpfulCount / total;

    if (ratio > 0.65) sentiment = `${Math.floor(ratio * 100)}% Mostly Helpful`;
    else if (ratio < 0.35)
      sentiment = `${Math.floor(ratio * 100)}% Mostly Helpful`;
    else sentiment = `${Math.floor(ratio * 100)}% Mixed`;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close" onClick={onClose}>
            &times;
          </button>

          {review?.User && (
            <div className="reviewer-profile-container">
              <img
                className="reviewer-profile-pic"
                src={review.User.profilePic || "/default-avatar.png"}
                alt={`${review.User.username}'s profile`}
              />
              <div className="review-author">{review.User.username}</div>
            </div>
          )}
        </div>

        <div className="review-content">
          <div className="recommended-container">
            <div className="is-recommended">
              {review.isRecommended ? (
                <div className="recommendation">
                  <FaThumbsUp className="yes-helpful" />
                  <div className="recommended-text-container">
                    <span className="recommended-text">Recommended</span>
                    <div className="review-sentiment">
                      <span className="game-description-value">
                        {sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="recommendation">
                  <FaThumbsDown className="not-helpful" />
                  <div className="recommended-text-container">
                    <span className="not-recommended-text">
                      Not Recommended
                    </span>
                    <div className="review-sentiment">
                      <span className="helpful-description-value">
                        {sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="review-details-comment-area">
            <div className="created-at-container">
              <div className="review-created">
                Posted:{" "}
                {(() => {
                  const date = new Date(review.createdAt);
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = date.toLocaleString("en-US", {
                    month: "short",
                  });
                  let hours = date.getHours();
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  const ampm = hours >= 12 ? "pm" : "am";
                  hours = hours % 12 || 12;
                  return `${day} ${month} @ ${hours}:${minutes}${ampm}`;
                })()}
              </div>
            </div>

            <div className="updated-at-container">
              {review.updatedAt && review.updatedAt !== review.createdAt && (
                <div className="review-updated">
                  Updated: {review.updatedAt}
                </div>
              )}
            </div>

            <div className="user-review-container">
              <div className="user-review">{review.review}</div>
            </div>
          </div>

          <div className="helpful-row-container">
            <div className="helpful-divider"></div>

            <div className="helpful-row">
              <p className="helpful-label">Was this review helpful?</p>
              <div id="comment-button-row-2">
                <button
                  className={
                    isHelpful === true
                      ? "comment-review-button selected"
                      : "comment-review-button"
                  }
                  onClick={() => setIsHelpful(true)}
                >
                  👍 Yes
                </button>
                <button
                  className={
                    isHelpful === false
                      ? "comment-review-button selected"
                      : "comment-review-button"
                  }
                  onClick={() => setIsHelpful(false)}
                >
                  👎 No
                </button>
              </div>
            </div>

            <div>
              <CommentArea
                gameId={gameId}
                reviewId={reviewId}
                isHelpful={isHelpful}
              />
            </div>

            <div className="comment-container">
              {allCommentsArray && allCommentsArray.length > 0 ? (
                [...reviewComments].reverse().map((comment) => (
                  <div key={comment[1].id} className="comment-item">
                    <img
                      src={`${comment[1].User?.profilePic}`}
                      alt={`${comment[1].User?.username}'s profile`}
                      className="commentor-profile-pic"
                    />
                    <div className="comment-details">
                      <div className="comment-header">
                        <div className="comment-author">
                          {comment[1].User?.username}
                        </div>
                        <div className="comment-created-at">
                          {(() => {
                            const date = new Date(comment[1].createdAt);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = date.toLocaleString("en-US", {
                              month: "short",
                            });
                            let hours = date.getHours();
                            const minutes = String(date.getMinutes()).padStart(
                              2,
                              "0"
                            );
                            const ampm = hours >= 12 ? "pm" : "am";
                            hours = hours % 12 || 12;
                            return `${day} ${month} @ ${hours}:${minutes}${ampm}`;
                          })()}
                        </div>
                      </div>
                      <div className="commentor-comment">
                        {comment[1].comment}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No comments yet. Be the first to comment!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCommentModal;
