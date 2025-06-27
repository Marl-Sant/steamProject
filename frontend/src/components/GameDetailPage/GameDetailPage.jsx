import { useEffect } from 'react';
import * as gamesAction from '../../store/games';
import * as reviewsAction from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './GameDetailPage.css'
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
    <div className='game-page-background'>
      <div className='game-container'>
          
          <div className='game-title'>
            {game?.title}
          </div>
          
          <div className='game-image'>
            <div className='primary-game-container'>
              <img 
                src={game?.GameImages.find(img => img.displayPic === false).url}
                alt={`${game?.title} display`}
                className='primary-game-image'
              />
              <div className='mini-image-container'>
                {game?.GameImages?.map(img => (
                  <img 
                    src={img.url} 
                    className='mini-images' 
                    key={img}
                  />
                ))}
              </div>
          </div>

            <div className='secondary-image-container'>
              <img 
                src={game?.GameImages?.find(img => img.displayPic === true)?.url}
                alt={`${game?.title} secondary`}
                className='secondary-game-image'
              />
              <div className='game-description'>
                {game?.description}
              </div>
            </div>
          </div>     
      </div>

      <div className='review-container'>
        <ReviewArea />     
      </div>
    </div>
  );
}

export default GameDetailPage;
