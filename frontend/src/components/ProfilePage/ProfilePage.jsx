import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsAction from "../../store/reviews";
import * as commentsAction from "../../store/comments";
import * as profileCommentsAction from "../../store/profileComments";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews?.allReviews);
  const comments = useSelector((state) => state.comments?.allComments);
  const profileComments = useSelector(
    (state) => state.profileComments?.allComments
  );

  useEffect(() => {
    dispatch(reviewsAction.getReviewsByUser(userId));
  }, [userId, dispatch]);

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

  let numberOfReviews = reviews ? Object.keys(reviews).length : 0;

  let allCommentsArray = comments ? Object.entries(comments) : [];

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

  if (!user || user.id.toString() !== userId) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <div className="profile-page-background">
      <div className="profile-page-user-details">
        <div className="profile-page-header">
          <img
            src={`${user.profilePic}`}
            className="profile-page-display-pic"
          />

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
              Review(s):{" "}
              <span className="sky-blue-text">{numberOfReviews}</span>
            </h2>

            <h2 className="profile-page-review-ranking">
              Review(s) Rating:{" "}
              <span className="sky-blue-text">{helpfulSentiment}</span>
            </h2>
          </div>
        </div>

        <div className="profile-comments-section">
          <h2>Comments on {user?.username}&apos;s Profile</h2>
          {profileComments && Object.values(profileComments).length > 0 ? (
            <ul>
              {Object.values(profileComments).map((comment) => (
                <li key={comment.id} className="profile-comment">
                  <strong>{comment.commenter?.username || "Anonymous"}:</strong>{" "}
                  {comment.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
