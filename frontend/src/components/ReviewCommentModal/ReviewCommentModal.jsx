import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as commentActions from '../../store/comments';
import './ReviewCommentModal.css';
import CommentArea from '../CommentArea/CommentArea.jsx'

function ReviewCommentModal({ onClose, reviewId, gameId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const allReviewsArray = reviews ? Object.entries(reviews) : [];

  const comments = useSelector((state) => state.comments?.allComments)
  const allCommentsArray = comments ? Object.entries(comments) : [];

  useEffect(() => {
    dispatch(commentActions.setCommentsState(reviewId));
  }, []);

  const reviewComments = allCommentsArray.filter(
    ([_, comment]) => comment.reviewId === reviewId
  );
  const selectedReview = allReviewsArray.find(
    ([_, review]) => review.id === reviewId
  );

  const review = selectedReview ? selectedReview[1] : null;

  console.log('reviewId:', reviewId);
  console.log('✅allCommentsArray:', allCommentsArray);
  console.log('✅reviewComments:', reviewComments);
  console.log('review:', review);
  
  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='modal-header'>
          <button className='close' onClick={onClose}>&times;</button>
  
          <div className='reviewer-profile-container'>
            <img
              className='reviewer-profile-pic'
              src={review.User?.profilePic}
              alt={`${review.User?.username}'s profile`}
            />
            <div className='review-author'>{review.User?.username}</div>
          </div>
        </div>
  
        <div className='review-content'>
  
          <div className='recommended-container'>
            <div className='is-recommended'>
              {review.isRecommended ? '👍 Recommended' : '👎 Not Recommended'}
            </div>
          </div>
  
          <div className='created-at-container'>
            <div className='review-created'>Posted: {review.createdAt}</div>
          </div>
  
          <div className='updated-at-container'>
            {review.updatedAt && review.updatedAt !== review.createdAt && (
              <div className='review-updated'>Updated: {review.updatedAt}</div>
            )}
          </div>
  
          <div className='user-review-container'>
            <div className='user-review'>{review.review}</div>
          </div>
  
          <div>
            <CommentArea gameId={gameId} reviewId={reviewId} />
          </div>

          <div className='comments-container'>
            {reviewComments.length > 0 ? (
              reviewComments.map(([id, comment]) => (
                <div key={id} className='comment'>
                  <div className='comment-author'>
                    {comment.User?.username}:
                  </div>
                  <div className='comment-text'>{comment.comment}</div>
                </div>
              ))
            ) : (
              <div>No comments yet. Be the first to comment!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCommentModal;