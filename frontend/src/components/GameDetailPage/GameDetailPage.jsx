import { useEffect, useRef } from 'react';
import * as gamesAction from '../../store/games';
import * as reviewsAction from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './GameDetailPage.css'
import ReviewArea from '../ReviewArea/ReviewArea'

function GameDetailPage() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    dispatch(gamesAction.getGameById(gameId));
    dispatch(reviewsAction.setReviewsState(gameId));
    console.log("Hello I am working.")
  }, [dispatch, gameId]);


  const game = useSelector((state) => state.games?.currentGame);
  const reviews = useSelector((state) => state.reviews?.allReviews);

  const scrollThumbnails = (direction) => {
    const container = thumbnailContainerRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
    }
  };

  return (
    <div className='game-page-background'>
      <div className='game-container'>
        
        <div className='game-title'>
          {game?.title}
        </div>
        
        <div className='game-image'>
          <div className='primary-game-container'>
            <img 
              src={game?.GameImages.find(img => img.displayPic === false)?.url}
              alt={`${game?.title} display`}
              className='primary-game-image'
            />

            <div className='thumbnail-carousel-wrapper'>
              <div className='mini-image-container' ref={thumbnailContainerRef}>
                {game?.GameImages?.map((img, index) => (
                  <img 
                    src={img.url} 
                    alt={`Thumbnail ${index}`}
                    className='mini-images' 
                    key={index}
                  />
                ))}
              </div>

              <div className="carousel-scroller">
                <button className='side-scroll-arrow left' onClick={() => scrollThumbnails('left')}>&lt;</button>
                <button className='side-scroll-arrow right' onClick={() => scrollThumbnails('right')}>&gt;</button>
              </div>
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
