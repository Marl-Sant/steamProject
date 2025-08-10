import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import * as reviewsAction from "../../store/reviews";
import * as commentsAction from "../../store/comments";
import * as profileCommentsAction from "../../store/profileComments";
import * as profileActions from "../../store/currentProfile";
import { fetchPostsByProfile } from "../../store/posts";

import CommentArea from "../CommentArea/CommentArea";
import "./ProfilePage.css";
import { csrfFetch } from "../../store/csrf";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [currentCommentPage, setCurrentCommentPage] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');

  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);
  const comments = useSelector((state) => state.comments?.allComments);
  const profileComments = useSelector(
    (state) => state.profileComments?.allComments
  );
  const currentProfile = useSelector((state) => state.currentProfile);
  const profilePosts = useSelector((state) => state.posts.profilePosts);

  useEffect(() => {
    setEditUsername(currentProfile?.username || '');
    setEditBio(currentProfile?.bio || '');
  }, [currentProfile]);

  useEffect(() => {
    dispatch(profileActions.fetchCurrentProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(reviewsAction.getDataByUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (reviews?.allReviews) {
      Object.keys(reviews.allReviews).forEach((reviewId) => {
        dispatch(commentsAction.setCommentsState(reviewId));
      });
    }
  }, [dispatch, reviews]);

  useEffect(() => {
    dispatch(profileCommentsAction.setProfileCommentsState(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchPostsByProfile(userId));
  }, [dispatch, userId]);

  const allComments = profileComments ? Object.values(profileComments) : [];
  const commentsPerPage = 6;
  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const currentComments = [...allComments]
    .reverse()
    .slice(
      (currentCommentPage - 1) * commentsPerPage,
      currentCommentPage * commentsPerPage
    );

  const allCommentsArray = comments ? Object.entries(comments) : [];
  let helpfulCount = 0;
  let notHelpfulCount = 0;
  allCommentsArray.forEach((comment) => {
    if (comment[1].isHelpful === true) helpfulCount++;
    else if (comment[1].isHelpful === false) notHelpfulCount++;
  });

  const numberOfReviews = reviews?.allReviews
    ? Object.keys(reviews.allReviews).length
    : 0;
  const total = helpfulCount + notHelpfulCount;

  let helpfulSentiment = "None";
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

  const handleSave = async () => {
    const res = await csrfFetch('/api/users/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: editUsername,
        bio: editBio,
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      dispatch(profileActions.setCurrentProfile(data.user));
      setIsEditing(false);
    } else {
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="profile-page-background">
      <div className="profile-page-user-details">
        <div className="profile-page-header">
          <div className="profile-page-header-left">
            <img
              src={currentProfile?.profilePic}
              className="profile-page-display-pic"
              alt="Profile"
            />
            <h2 className="profile-page-number-of-reviews">
              Review(s):{" "}
              <span className="sky-blue-text">{numberOfReviews}</span>
            </h2>
            <h2 className="profile-page-review-ranking">
              Review(s) Rating:{" "}
              <span className="sky-blue-text">{helpfulSentiment}</span>
            </h2>
          </div>

          <div className="profile-page-user-information">
            {isEditing ? (
              <>
                <p className="input-title">Username:</p>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  placeholder="Username"
                  className="profile-edit-input"
                />
                <p className="input-title">Bio:</p>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="About Me"
                  className="profile-edit-textarea"
                />
                
                <div className="input-handle-buttons">
                  <button onClick={handleSave} className="profile-save-btn">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditUsername(currentProfile?.username || '');
                      setEditBio(currentProfile?.bio || '');
                    }}
                    className="profile-cancel-btn"
                    >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="profile-page-username">{currentProfile?.username}</h1>
                <div className="profile-bio">
                  <h2 className="profile-page-bio-title">About Me</h2>
                  {sessionUser?.id === parseInt(userId) && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="profile-page-bio-edit-button"
                    >
                      Edit Profile
                    </button>
                  )}
                  <p className="profile-page-use-bio">{currentProfile?.bio}</p>
                </div>

                
              </>
            )}
          </div>
        </div>

        <div className="all-activities-container">
          <div className="recent-activities-container">
            <div className="profile-user-reviews-container">
              <div className="profile-comment-section-header">
                <h2 className="profile-comment-reviews-title1">Recent Activity</h2>
              </div>
              <div className="profile-user-reviews-detail-container">
                {reviews?.allReviews &&
                Object.keys(reviews.allReviews).length > 0 ? (
                  Object.values(reviews.allReviews)
                    .slice(0, 3)
                    .map((review) => (
                      <div key={review.id} className="user-review-wrapper">
                        <div className="user-review-item">
                          <div className="user-review-item-left">
                            <img
                              className="profile-game-img"
                              src={review.Game?.headerImage}
                              alt={review.Game?.title}
                            />
                            <h3 className="profile-game-title">
                              {review.Game?.title}
                            </h3>
                          </div>
                          <div className="user-review-item-right">
                            <div className="comment-created-at">
                              {(() => {
                                const date = new Date(review.createdAt);
                                const day = String(date.getDate()).padStart(2, "0");
                                const month = date.toLocaleString("en-US", {
                                  month: "short",
                                });
                                let hours = date.getHours();
                                const minutes = String(date.getMinutes()).padStart(
                                  2,
                                  "0"
                                );
                                const ampm = hours >= 12 ? "pm" : "am";
                                hours = hours % 12 || 12;
                                return `${day} ${month} @ ${hours}:${minutes}${ampm}`;
                              })()}
                            </div>
                            <p className="profile-game-review">{review.review}</p>
                          </div>
                        </div>
                        <div className="profile-game-review-footer">
                          <p className="profile-game-recommendation">
                            Recommended: {review.isRecommended ? "Yes" : "No"}
                          </p>
                          <p className="profile-game-review-comments">
                            {comments
                              ? `${
                                  Object.values(comments).filter(
                                    (comment) => comment.reviewId === review.id
                                  ).length
                                } comment(s)`
                              : "0 comment(s)"}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>This user has not left any reviews yet.</p>
                )}
              </div>
            </div>

            <div className="profile-user-reviews-container">
              <div className="profile-comment-section-header">
                <h2 className="profile-comment-reviews-title1">Recent Posts</h2>
              </div>
              <div className="profile-user-posts-container">
                {profilePosts && Object.keys(profilePosts).length > 0 ? (
                  Object.values(profilePosts)
                    .slice(0, 3)
                    .map((post) => (
                      <div key={post.id} className="user-post-item">
                        <div className="user-post-header">
                          <div className="user-post-titles">
                            <h3 className="user-post-title">{post.title}</h3>
                          </div>
                        </div>

                        <p className="user-post-body">{post.post}</p>

                        <div className="user-post-footer">
                          {post.Community?.Game?.headerImage && (
                            <img
                              src={post.Community.Game.headerImage}
                              alt={post.Community.Game.title || "Game Image"}
                              className="profile-post-game-img"
                            />
                          )}
                          <div className="user-post-date">
                            {(() => {
                              const date = new Date(post.createdAt);
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
                      </div>
                    ))
                ) : (
                  <p>This user hasn’t made any posts yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-comment-wrapper">
          <div className="profile-comment-section">
            <div className="profile-comment-section-header">
              <p className="profile-comment-header-title1">Comments</p>
              <div className="profile-comment-header-group">
                <div className="profile-comment-header-title2">
                  View all {allComments.length} comments
                </div>
                <div className="pagination-controls1">
                  <button
                    disabled={currentCommentPage === 1}
                    onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
                  >
                    <FaChevronLeft />
                  </button>
                  <span>
                    {currentCommentPage} ... {totalPages}
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

          <CommentArea
            className="profile-comment-area"
            onSubmitOverride={(commentText) =>
              dispatch(
                profileCommentsAction.addProfileCommentState({
                  userId: sessionUser.id,
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
                    alt={comment.commenter?.username}
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
                {currentCommentPage} ... {totalPages}
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
  );
};

export default ProfilePage;
