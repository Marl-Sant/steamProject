import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews'
import './ReviewArea.css'

function ReviewArea() {
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const [isRecommended, setIsRecommended] = useState(null);
    const user = useSelector((state) => state.session.user)
    const game = useSelector((state) => state.games?.currentGame)
    
    useEffect(() => {
        dispatch(reviewActions.setReviewsState(game?.id))
    }, [dispatch, game?.id])

    const handleSubmit = async () => {
        return await dispatch(reviewActions.addReviewState({
            gameId: game.id,
            review: text,
            userId: user.id,
            isRecommended: isRecommended
        }))
    };

    const handleRecommendClick = () => setIsRecommended(true);
    const handleNotRecommendClick = () => setIsRecommended(false);

    console.log("Profile Pic URL:", user?.profilePic);
    
    return (
        <div className='text-area-container'>
            <div>
                <h4 id='text-title'>    
                Write a review for {`${game?.title}`}
                </h4>
                <p className='rules-and-guidelines'>Please describe what you liked or disliked about this game and whether you recommend it to others.</p>
                <p className='rules-and-guidelines'>Please remember to be polite and follow the Rules and Guidelines.</p>
            </div>
            <div id='user-text-area'>
                <div id='profile-pic-container'>
                    <img src={`${user?.profilePic}`} id="user-review-profile-pic" />
                </div>
                <div id='text-area'>
                    <textarea id='text' onChange={(e) => setText(e.target.value)}></textarea>
                    <p id="recommend-text">Do you recommend this game?</p>
                        <div id='button-row'>
                            <div id='liked-group'>
                                <button 
                                    className='review-button'
                                    onClick={handleRecommendClick}    
                                >Yes</button>
                                <button 
                                    className='review-button'
                                    onClick={handleNotRecommendClick}
                                >No</button>
                            </div>
                            <div id='review-button-container'>
                                <button className='review-button' onClick={handleSubmit}>Post review</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ReviewArea
