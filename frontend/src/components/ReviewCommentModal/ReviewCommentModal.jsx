import { useSelector } from 'react-redux';
import './ReviewCommentModal.css';
import CommentArea from '../CommentArea/CommentArea.jsx'

function ReviewCommentModal({ onClose, reviewId }) {
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const allReviewsArray = reviews ? Object.entries(reviews) : [];

  const selectedReview = allReviewsArray.find(review => review[1].id === reviewId);
  const review = selectedReview ? selectedReview[1] : null;

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
            <CommentArea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCommentModal;