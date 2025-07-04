import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'
import * as reviewActions from '../../store/reviews'
import './CommentArea.css'

function CommentArea() {
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const [isHelpful, setIsHelpful] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const user = useSelector((state) => state.session.user)
    const game = useSelector((state) => state.games?.currentGame)
    
    useEffect(() => {
        dispatch(reviewActions.setReviewsState(game?.id))
    }, [dispatch, game?.id])

    const handleSubmit = async () => {
        const newReview = await dispatch(reviewActions.addReviewState({
            gameId: game.id,
            review: text,
            userId: user.id,
            isRecommended: isRecommended
        }))
        setText('')
        return newReview
    };

    const handleHelpfulClick = () => setIsHelpful(true);
    const handleNotHelpfulClick = () => setIsHelpful(false);

    console.log("Profile Pic URL:", user?.profilePic);
    
    return (
        <div className='comment-area-container'>

            <div id='comment-text-area'>
                <div id='comment-profile-pic-container'>
                    <img src={`${user?.profilePic}`} id="comment-user-review-profile-pic" 
                    className='comment-user-profile-pic'
                    />
                </div>
                <div id='comment-area'>
                    <textarea id='text' value={text} onChange={(e) => {
                        setText(e.target.value)
                        if(text.length === 10){
                            setDisabled(!disabled)
                        }
                        }}></textarea>
                    <p id="comment-recommend-text">Was this review helpful?</p>
                        <div id='comment-button-row'>
                            <div id='comment-liked-group'>
                                <button 
                                    className={isHelpful !== false && isHelpful !== null ? 'comment-review-button selected' : 'comment-review-button'}
                                    onClick={handleHelpfulClick}    
                                ><FaThumbsUp /></button>
                                <button 
                                    className={isHelpful !== true && isHelpful !== null ? 'comment-review-button selected' : 'comment-review-button'}
                                    onClick={handleNotHelpfulClick}
                                ><FaThumbsDown /></button>
                            </div>
                            <div id='comment-review-button-container'>
                                <button className={text.length >= 10 && isRecommended !== null ? 'comment-review-button' : 'comment-disabled-button'}
                                disabled={disabled} 
                                onClick={handleSubmit}>Post comment</button>
                            </div>
                        </div>
                    </div>
            </div>


        </div>
    )
}

export default CommentArea;
