import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comments';
import './CommentArea.css';


function CommentArea({ gameId, reviewId, isHelpful }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async () => {
    if (text.length < 10 || isHelpful === null) return;

    console.log(gameId)

    await dispatch(commentActions.addCommentState({
      gameId,
      reviewId,
      comment: text,
      userId: user.id,
      isHelpful,
    }));

    setText('');
  };

  const disabled = text.length < 10 || isHelpful === null;

  return (
    <div className='comment-area-container'>
      <div className='comment-text-area'>
        <div className='comment-profile-pic-container'>
          <img
            src={user?.profilePic}
            className='comment-user-profile-pic'
            alt='profile'
          />
        </div>
        <div className='comment-area'>
          <textarea
            className='comment-text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Write your comment…'
          />
          <div className='comment-review-button-container'>
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

  );
}

export default CommentArea;
