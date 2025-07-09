import { useEffect, useRef, useState } from "react";
import * as gamesAction from "../../store/games";
import * as reviewsAction from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import "./GameDetailPage.css";
import ReviewArea from "../ReviewArea/ReviewArea";
import EditReviewArea from "../EditReviewArea/EditReviewArea";
import ReviewCommentModal from "../ReviewCommentModal/ReviewCommentModal";

function GameDetailPage() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const thumbnailContainerRef = useRef(null);
  const [displayMainPicture, setDisplayMainPicture] = useState(null);
  const game = useSelector((state) => state.games?.currentGame);
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const user = useSelector((state) => state.session.user);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    dispatch(gamesAction.getGameById(gameId));
    dispatch(reviewsAction.setReviewsState(gameId));
  }, []);

  useEffect(() => {
    setDisplayMainPicture(game?.movies[0]);
  }, [game]);

  let allReviewsArray;
  let userReview;
  let otherReviews;
  if (reviews) {
    allReviewsArray = Object.entries(reviews);
    if (user) {
      userReview = allReviewsArray.find(
        (review) => review[1].userId === user.id
      );
      otherReviews = allReviewsArray.filter(
        (review) => review[1].userId !== user.id
      );
    }
  }
  let gameReviews = otherReviews || allReviewsArray;

  const scrollThumbnails = (direction) => {
    const container = thumbnailContainerRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollLeft +=
        direction === "right" ? scrollAmount : -scrollAmount;
    }
  };

  let recommendedCount = 0;
  let notRecommendedCount = 0;

  if (allReviewsArray) {
    allReviewsArray.forEach((entry) => {
      const review = entry[1];
      if (review.isRecommended === true) recommendedCount++;
      else if (review.isRecommended === false) notRecommendedCount++;
    });
  }

  let sentiment = "No Reviews";
  const total = recommendedCount + notRecommendedCount;

  if (total === 1) {
    sentiment = recommendedCount === 1 ? "Mostly Positive" : "Mostly Negative";
  } else if (total > 1) {
    const ratio = recommendedCount / total;

    if (ratio > 0.65) sentiment = `${Math.floor(ratio * 100)}% Mostly Positive`;
    else if (ratio < 0.35)
      sentiment = `${Math.floor(ratio * 100)}% Mostly Negative`;
    else sentiment = `${Math.floor(ratio * 100)}% Mixed`;
  }

  return (
    <div className="game-page-background">
      <div className="game-container">
        <div className="game-title">{game?.title}</div>

        <div className="game-image">
          <div className="primary-game-container">
            {displayMainPicture?.includes("mp4") ? (
              <video
                src={displayMainPicture}
                className="primary-game-image"
                autoPlay
                loop
                controls
                playsInline
                muted
              />
            ) : (
              <img
                src={displayMainPicture}
                alt={`${game?.title} display`}
                className="primary-game-image"
              />
            )}
            <div className="thumbnail-carousel-wrapper">
              <div className="mini-image-container" ref={thumbnailContainerRef}>
                {game?.movies.slice(0, 2).map((vid, index) => (
                  <video
                    src={vid}
                    className="mini-images"
                    key={`video-${index}`}
                    onClick={() => setDisplayMainPicture(vid)}
                  />
                ))}
                {game?.screenshots.map((img, index) => (
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="mini-images"
                    key={`image-${index}`}
                    onClick={() => setDisplayMainPicture(img)}
                  />
                ))}
              </div>

              <div className="carousel-scroller">
                <button
                  className="side-scroll-arrow left"
                  onClick={() => scrollThumbnails("left")}
                >
                  &lt;
                </button>
                <button
                  className="side-scroll-arrow right"
                  onClick={() => scrollThumbnails("right")}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          <div className="secondary-image-container">
            <img
              src={game?.capsuleImage}
              alt={`${game?.title} secondary`}
              className="secondary-game-image"
            />
            <div className="game-description">{game?.description}</div>

            <div className="game-genre">
              Genre:{" "}
              <div className="game-description-value">{game?.genres}</div>
            </div>

            <div className="game-developer">
              Developer:{" "}
              <div className="game-description-value">{game?.developers}</div>
            </div>

            <div className="game-publisher">
              Publisher:{" "}
              <div className="game-description-value">{game?.publishers}</div>
            </div>

            <div className="game-publisher">
              Release Date:{" "}
              <div className="game-description-value">{game?.releaseDate}</div>
            </div>

            <div className="review-sentiment">
              All Reviews:{" "}
              <div className="game-description-value">{sentiment}</div>
            </div>
          </div>
        </div>
      </div>

      {user ? (
        <div className="create-review-container">
          {userReview ? <EditReviewArea props={userReview} /> : <ReviewArea />}
        </div>
      ) : (
        <div>
          <div id="no-user-message">
            Join in on the conversation!&nbsp;{" "}
            <NavLink to="/login" className="login-review-area">
              Login
            </NavLink>
            &nbsp;to leave a review and let others know what you think!
          </div>
          <div className="blur-container">
            <div className="text-area-container">
              <div>
                <h4 id="text-title">Write a review for {`${game?.title}`}</h4>
                <p className="rules-and-guidelines">
                  Please describe what you liked or disliked about this game and
                  whether you recommend it to others.
                </p>
                <p className="rules-and-guidelines">
                  Please remember to be polite and follow the Rules and
                  Guidelines.
                </p>
              </div>
              <div id="user-text-area">
                <div id="profile-pic-container"></div>
                <div id="text-area">
                  <textarea id="text"></textarea>

                  <p id="recommend-text">Do you recommend this game?</p>
                  <div id="button-row">
                    <div id="liked-group">
                      <button className="review-button"></button>
                      <button className="review-button"></button>
                    </div>
                    <div id="review-button-container">
                      <button className={"review-button"}>Post review</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="reviews-container">
        {allReviewsArray && allReviewsArray.length > 0 ? (
          gameReviews.map((review) => (
            <div key={review[1].id} className="review-item">
              <img
                src={`${review[1].User?.profilePic}`}
                alt={`${review[1].User?.username}'s profile`}
                className="review-profile-pic"
              />
              <div className="review-text">
                <div className="review-author">{review[1].User?.username}</div>
                <div className="review-comment">{review[1].review}</div>
                <div className="review-recommendation">
                  {review[1].isRecommended
                    ? "👍 Recommended"
                    : "👎 Not Recommended"}
                </div>
                <div className="view-comments">
                  <button
                    className="speech-bubble"
                    onClick={() => {
                      setSelectedReviewId(review[1].id);
                      setOpenModal(true);
                    }}
                  >
                    💬 Comment
                  </button>
                  {openModal && selectedReviewId && (
                    <ReviewCommentModal
                      onClose={() => {
                        setOpenModal(false);
                        setSelectedReviewId(null);
                      }}
                      reviewId={selectedReviewId}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Reviews</p>
        )}
      </div>
    </div>
  );
}

export default GameDetailPage;
