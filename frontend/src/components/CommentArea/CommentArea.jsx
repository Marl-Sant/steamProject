import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import * as commentActions from '../../store/comments';
import './CommentArea.css';

function CommentArea({ gameId, reviewId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [isHelpful, setIsHelpful] = useState(null);

  const user = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.games?.currentGame)
  const review = useSelector((state) => state.reviews?.currentReview)

  const handleSubmit = async () => {
    const newComment = await dispatch(commentActions.addCommentState({
      gameId: gameId,
      reviewId: reviewId,
      comment: text,
      userId: user.id,
      isHelpful,
    }))
    setText('')
    return newComment
  };
  
  const disabled = text.length < 10 || isHelpful === null;

  return (
    <div className='comment-area-container'>
      <div id='comment-text-area'>
        <div id='comment-profile-pic-container'>
          <img
            src={user?.profilePic}
            id='comment-user-review-profile-pic'
            className='comment-user-profile-pic'
            alt='profile'
          />
        </div>
        <div id='comment-area'>
          <textarea
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Write your comment…'
          />
          <p id='comment-recommend-text'>Was this review helpful?</p>
          <div id='comment-button-row'>
            <div id='comment-liked-group'>
              <button
                className={isHelpful === true ? 'comment-review-button selected' : 'comment-review-button'}
                onClick={() => setIsHelpful(true)}
              >
                <FaThumbsUp />
              </button>
              <button
                className={isHelpful === false ? 'comment-review-button selected' : 'comment-review-button'}
                onClick={() => setIsHelpful(false)}
              >
                <FaThumbsDown />
              </button>
            </div>
            <div id='comment-review-button-container'>
              <button
                className={!disabled ? 'comment-review-button' : 'comment-disabled-button'}
                disabled={disabled}
                onClick={handleSubmit}
              >
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentArea;
