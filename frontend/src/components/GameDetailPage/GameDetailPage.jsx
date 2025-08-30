import { useEffect, useRef, useState } from "react";
import * as gamesAction from "../../store/games";
import * as reviewsAction from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import "./GameDetailPage.css";
import ReviewArea from "../ReviewArea/ReviewArea";
import EditReviewArea from "../EditReviewArea/EditReviewArea";
import ReviewCommentModal from "../ReviewCommentModal/ReviewCommentModal";
import HtmlToText from "../HtmlToText/HtmlToText";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import Masonry from "react-masonry-css";

function GameDetailPage() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const thumbnailContainerRef = useRef(null);
  const [displayMainPicture, setDisplayMainPicture] = useState(null);
  const game = useSelector((state) => state.games?.currentGame);
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments?.allComments);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    dispatch(gamesAction.getGameById(gameId));
    dispatch(reviewsAction.setReviewsState(gameId));
  }, [comments, gameId, dispatch]);

  useEffect(() => {
    setDisplayMainPicture(game?.movies[0]);
  }, [game]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

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
      <div
        style={{
          backgroundImage: `url(${game?.background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <div className="game-container">
          <div className="page-wrapper">
            <div className="game-image">
              <div className="game-title-container">
                <div className="game-title">{game?.title}</div>
              </div>
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
                  <div
                    className="mini-image-container"
                    ref={thumbnailContainerRef}
                  >
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
            </div>

            <div className="game-detailed-information-container">
              <img
                src={game?.capsuleImage}
                alt={`${game?.title} secondary`}
                className="secondary-game-image"
              />
              <div className="short-game-description">
                {game?.shortDescription}
              </div>

              <div className="game-genre">
                Genre:{" "}
                <div className="game-description-value">
                  {game?.genres.join(", ")}
                </div>
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
                <div className="game-description-value">
                  {game?.releaseDate}
                </div>
              </div>

              <div className="game-review-sentiment">
                All Reviews:{" "}
                <div className="game-description-value">{sentiment}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rest-of-page">
          {game ? (
            <>
              <div className="community-cart-container">
                <div className="add-to-cart-container about-header">
                  <h3>{`Buy ${game.title}!`}</h3>
                  <div className="floating-div">
                    <div>{`$${game.price}`}</div>
                    <div className="cart-button">
                      <NavLink >Add to cart</NavLink>
                    </div>
                  </div>
                </div>

                <div className="add-to-cart-container about-header">
                  <h3>{`See what fans are saying about ${game.title}!`}</h3>
                  <div className="floating-div">
                    <div className="community-button">
                      <NavLink to="/communities">Community</NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="about-header">{`About ${game.title}`}</h1>
              <hr className="about-header line"></hr>
              <div className="game-detailed-description-wrapper">
                <div
                  className={`game-detailed-description ${
                    showFullDescription ? "expanded" : ""
                  }`}
                >
                  <HtmlToText props={game?.detailedDescription} />
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="see-more-btn"
                >
                  {showFullDescription ? (
                    <>
                      Read less <span className="arrow">▲</span>
                    </>
                  ) : (
                    <>
                      Read more <span className="arrow">▼</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : null}

          {user ? (
            <div className="create-review-container">
              {userReview ? (
                <EditReviewArea props={userReview} />
              ) : (
                <ReviewArea />
              )}
            </div>
          ) : (
            <div className="comment-area-wrapper">
              <div className="blur-container">
                <div className="text-area-container">
                  <div>
                    <h4 id="text-title">Write a review for {game?.title}</h4>
                    <p className="rules-and-guidelines">
                      Please describe what you liked or disliked about this game
                      and whether you recommend it to others.
                    </p>
                    <p className="rules-and-guidelines">
                      Please remember to be polite and follow the Rules and Guidelines.
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

              <div className="no-user-comment-message-1">
                Join in on the conversation!{" "}
                <NavLink to="/login" className="login-review-area">
                  Login
                </NavLink>{" "}
                to review a recommendation and leave a review!
              </div>
            </div>
          )}

          <div className="reviews-container">
            {allReviewsArray && allReviewsArray.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="community-posts"
                columnClassName="community-post-column"
              >
                {gameReviews.map((review) => (
                  <div
                    key={review[1].id}
                    className="community-post"
                    onClick={() => {
                      if (openModal) return;
                      setSelectedReviewId(review[1].id);
                      setOpenModal(true);
                    }}
                  >
                    <div className="post-title">
                      {review[1].isRecommended ? (
                        <>
                          <FaThumbsUp className="yes-helpful" />
                          <span className="review-recommended-text">Recommended</span>
                        </>
                      ) : (
                        <>
                          <FaThumbsDown className="not-helpful" />
                          <span className="review-not-recommended-text">Not Recommended</span>
                        </>
                      )}
                    </div>

                    <div className="post-content">
                      <p>{review[1].review}</p>
                    </div>

                    <div className="poster-details">
                      <img
                        src={`${review[1].User?.profilePic}`}
                        alt={`${review[1].User?.username}'s profile`}
                        className="poster-profile-pic"
                      />
                      <div className="poster-information">
                        <div className="user-username">{review[1].User?.username}</div>
                        <div className="post-date">
                          {(() => {
                            const date = new Date(review[1].createdAt);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = date.toLocaleString("en-US", { month: "short" });
                            let hours = date.getHours();
                            const minutes = String(date.getMinutes()).padStart(2, "0");
                            const ampm = hours >= 12 ? "pm" : "am";
                            hours = hours % 12 || 12;
                            return `${day} ${month} @ ${hours}:${minutes}${ampm}`;
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="view-comments">
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
                ))}
              </Masonry>
            ) : (
              <p>No Reviews</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
