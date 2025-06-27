import { useEffect } from 'react';
import * as gamesAction from '../../store/games';
import * as reviewsAction from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewArea from '../ReviewArea/ReviewArea'

function GameDetailPage() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(gamesAction.getGameById(gameId));
    dispatch(reviewsAction.setReviewsState(gameId));
    console.log("Hello I am working.")
  }, [dispatch, gameId]);


  const game = useSelector((state) => state.games?.currentGame);
  const reviews = useSelector((state) => state.reviews?.allReviews);

  return (
    <>
      <div>
        {game?.title}
        {game?.price}
        {game?.description}
      </div>
      {reviews?.map(review => (
        <div
          key={review.id}
        >
          {review?.review}
          {review?.userId}
          {review?.gameId}
        </div>
      ))}
      <ReviewArea />
    </>
  );
}

export default GameDetailPage;
