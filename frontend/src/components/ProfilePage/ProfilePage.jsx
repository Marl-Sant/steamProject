import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as reviewsAction from "../../store/reviews";
import * as commentsAction from "../../store/comments";
import * as profileCommentsAction from "../../store/profileComments";
import CommentArea from "../CommentArea/CommentArea";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const comments = useSelector((state) => state.comments?.allComments);
  const profileComments = useSelector(
    (state) => state.profileComments?.allComments
  );

  useEffect(() => {
    dispatch(reviewsAction.getReviewsByUser(userId));
  }, [userId, dispatch]);

  console.log("Reviews from Redux:", reviews);

  useEffect(() => {
    if (reviews) {
      Object.keys(reviews).forEach((reviewId) => {
        dispatch(commentsAction.setCommentsState(reviewId));
      });
    }
  }, [reviews, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(profileCommentsAction.setProfileCommentsState(userId));
    }
  }, [userId, dispatch]);

  const commentsPerPage = 6;
  
  const allComments = profileComments ? Object.values(profileComments) : [];
  const totalPages = Math.ceil(allComments.length / commentsPerPage);

  const currentComments = [...allComments]
    .reverse()
    .slice((currentCommentPage - 1) * commentsPerPage, currentCommentPage * commentsPerPage);

  let allCommentsArray = comments ? Object.entries(comments) : [];
  let numberOfReviews = reviews ? Object.keys(reviews).length : 0;

  let helpfulCount = 0;
  let notHelpfulCount = 0;

  allCommentsArray.forEach((entry) => {
    const comment = entry[1];

    if (comment.isHelpful === true) helpfulCount++;
    else if (comment.isHelpful === false) notHelpfulCount++;
  });

  let helpfulSentiment = "None";
  const total = helpfulCount + notHelpfulCount;

  if (total === 1) {
    helpfulSentiment =
      helpfulCount === 1 ? "Mostly Helpful" : "Mostly Not Helpful";
  } else if (total > 1) {
    const ratio = helpfulCount / total;

    if (ratio > 0.65)
      helpfulSentiment = `${Math.floor(ratio * 100)}% Mostly Helpful`;
    else if (ratio < 0.35)
      helpfulSentiment = `${Math.floor(ratio * 100)}% Mostly Not Helpful`;
    else helpfulSentiment = `${Math.floor(ratio * 100)}% Mixed`;
  }



  return (
    <div className="profile-page-background">
      <div className="profile-page-user-details">
        <div className="profile-page-header">
          <img src={`${user.profilePic}`} className="profile-page-display-pic" />

          <div className="profile-page-user-information">
            <h1 className="profile-page-username">{user.username}</h1>
            <h2 className="profile-page-user-location">{user.country}</h2>
            <div className="profile-bio">
              <div className="profile-page-bio-header">
                <h2 className="profile-page-bio-title">About Me</h2>
              </div>
              <p className="profile-page-use-bio">{user.bio}</p>
            </div>
            <h2 className="profile-page-number-of-reviews">
              Review(s): <span className="sky-blue-text">{numberOfReviews}</span>
            </h2>

            <h2 className="profile-page-review-ranking">
              Review(s) Rating:{" "}
              <span className="sky-blue-text">{helpfulSentiment}</span>
            </h2>
          </div>
        </div>
      
        <div className="profile-user-reviews">
          <h2>Recent Activity</h2>
          {reviews && Object.values(reviews).length > 0 ? (
            Object.values(reviews).map((review) => (
              <div key={review.id} className="user-review-item">
                <h3>{review.Game?.title}</h3>
                <img src={review.Game?.headerImage}/>
                <p>{review.review}</p>
                <p>Recommended: {review.isRecommended ? "Yes" : "No"}</p>
                <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>This user has not left any reviews yet.</p>
          )}
        </div>

      <div className="profile-comment-wrapper">
        <div className="profile-comment-section">
          <div className="profile-comment-section-header">
            <p className="profile-comment-header-title1">Comments</p>
            <div className="profile-comment-header-group">
              <div className="profile-comment-header-title2">View all {allComments.length} comments</div>
              <div className="pagination-controls1">
                <button
                  disabled={currentCommentPage === 1}
                  onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
                  >
                  <FaChevronLeft />
                </button>
                <span>
                  Page {currentCommentPage} of {totalPages}
                </span>
                <button
                  disabled={currentCommentPage === totalPages}
                  onClick={() => setCurrentCommentPage(currentCommentPage + 1)}
                  >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
          
          <CommentArea
            className="profile-comment-area"
            onSubmitOverride={(commentText) =>
              dispatch(
                profileCommentsAction.addProfileCommentState({
                  userId: user.id,
                  profileUserId: userId,
                  comment: commentText,
                })
              )
            }
          />

          
            <div className="comment-container">
              {currentComments.length > 0 ? (
                currentComments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <img
                      src={comment.commenter?.profilePic}
                      alt={`${comment.commenter?.username}`}
                      className="commentor-profile-pic"
                    />
                    <div className="comment-details">
                      <div className="comment-header">
                        <div className="comment-author">
                          {comment.commenter?.username}
                        </div>
                        <div className="comment-created-at">
                          {(() => {
                            const date = new Date(comment.createdAt);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = date.toLocaleString("en-US", {
                              month: "short",
                            });
                            let hours = date.getHours();
                            const minutes = String(date.getMinutes()).padStart(2, "0");
                            const ampm = hours >= 12 ? "pm" : "am";
                            hours = hours % 12 || 12;
                            return `${day} ${month} @ ${hours}:${minutes}${ampm}`;
                          })()}
                        </div>
                      </div>
                      <div className="commentor-comment">{comment.comment}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No comments yet.</div>
              )}
            </div>

            <div className="profile-comment-footer">
              <div className="pagination-controls2">
                <button
                  disabled={currentCommentPage === 1}
                  onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
                  >
                  <FaChevronLeft />
                </button>
                <span>
                  Page {currentCommentPage} of {totalPages}
                </span>
                <button
                  disabled={currentCommentPage === totalPages}
                  onClick={() => setCurrentCommentPage(currentCommentPage + 1)}
                  >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
