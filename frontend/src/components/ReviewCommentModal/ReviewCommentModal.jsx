import { useSelector } from 'react-redux';
import './ReviewCommentModal.css';

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
          <div className='user-profile'>
            <img
              className='user-profile-pic'
              src={review.User?.profilePic}
              alt={`${review.User?.username}'s profile`}
            />
            <div className='review-author'>{review.User?.username}</div>
          </div>
        </div>
        <div className='modal-content'>
        </div>
      </div>
    </div>
  );
}

export default ReviewCommentModal;