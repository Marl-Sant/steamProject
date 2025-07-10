import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import * as reviewActions from "../../store/reviews";
import "../ReviewArea/ReviewArea.css";

function EditReviewArea(userReview) {
  const dispatch = useDispatch();
  const [text, setText] = useState(userReview.props[1].review);
  const [oldReview, setOldReview] = useState(text);
  const [isRecommended, setIsRecommended] = useState(
    userReview.props[1].isRecommended
  );
  const [disabled, setDisabled] = useState(true);
  const [editReviewDisable, setEditReviewDisable] = useState(false);
  const user = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.games?.currentGame);
  const reviews = useSelector((state) => state.reviews?.allReviews);

  useEffect(() => {
    dispatch(reviewActions.setReviewsState(game?.id));
  }, []);

  const handleSubmit = async () => {
    const newReview = await dispatch(
      reviewActions.editReviewThunk({
        reviewId: userReview.props[0],
        gameId: game.id,
        review: text,
        userId: user.id,
        isRecommended: isRecommended,
      })
    );
    setEditReviewDisable(!editReviewDisable);
    setOldReview(text);
    return newReview;
  };

  const handleDelete = async () => {
    const deleteReview = await dispatch(
      reviewActions.deleteReview({
        gameId: game.id,
        reviewId: userReview.props[0],
      })
    );
    await dispatch(reviewActions.setReviewsState(game?.id));
    return deleteReview;
  };

  const handleRecommendClick = () => setIsRecommended(true);
  const handleNotRecommendClick = () => setIsRecommended(false);
  const handleEditReviewState = () => {
    setEditReviewDisable(true);
  };
  const handleEditExit = () => {
    setEditReviewDisable(false);
    setText(oldReview);
    setDisabled(true);
  };

  return (
    <div className="text-area-container">
      <div>
        <h4 id="text-title">
          {editReviewDisable ? (
            <>Edit your review for {`${game?.title}`}</>
          ) : (
            <>Your review for {`${game?.title}`}</>
          )}
        </h4>
        {editReviewDisable ? (
          <>
            <p className="rules-and-guidelines">
              Please describe what you liked or disliked about this game and
              whether you recommend it to others.
            </p>
            <p className="rules-and-guidelines">
              Please remember to be polite and follow the Rules and Guidelines.
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div id="user-text-area">
        <div id="profile-pic-container">
          <img
            src={`${user?.profilePic}`}
            id="user-review-profile-pic"
            className="user-profile-pic"
          />
        </div>
        <div id="text-area">
          {editReviewDisable ? (
            <textarea
              id="text"
              value={text}
              disabled={!editReviewDisable}
              onChange={(e) => {
                setText(e.target.value);
                if (text.length <= 10) {
                  setDisabled(true);
                } else {
                  setDisabled(false);
                }
              }}
            ></textarea>
          ) : (
            <div className="review-comment">{text}</div>
          )}

          <p id="recommend-text">Did you recommend this game?</p>

          <div id="button-row">
            <div id="liked-group">
              {editReviewDisable ? (
                <>
                  <button
                    className={
                      isRecommended !== false && isRecommended !== null
                        ? "review-button selected"
                        : "review-button"
                    }
                    onClick={handleRecommendClick}
                  >
                    <FaThumbsUp />
                  </button>

                  <button
                    className={
                      isRecommended !== true && isRecommended !== null
                        ? "review-button selected"
                        : "review-button"
                    }
                    onClick={handleNotRecommendClick}
                  >
                    <FaThumbsDown />
                  </button>
                </>
              ) : (
                <>
                  {isRecommended ? (
                    <>
                      <FaThumbsUp /> Recommended
                    </>
                  ) : (
                    <>
                      <FaThumbsDown /> Not Recommended
                    </>
                  )}
                </>
              )}
            </div>

            <div id="review-button-container">
              {editReviewDisable ? (
                <>
                  <button
                    className={
                      text.length >= 10 && isRecommended !== null && !disabled
                        ? "review-button"
                        : "disabled-button"
                    }
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    Post review
                  </button>

                  <button className="review-button" onClick={handleEditExit}>
                    Cancel
                  </button>

                  <button className="delete-button" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="review-button"
                    onClick={handleEditReviewState}
                  >
                    Edit your review?
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReviewArea;
