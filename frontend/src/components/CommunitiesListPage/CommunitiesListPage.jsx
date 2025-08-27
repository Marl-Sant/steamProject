import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SlSpeech } from "react-icons/sl";
import CommunitySearch from "../CommunitySearch/CommunitySearch";
import UserRecentPosts from "../UserRecentPosts/UserRecentPosts";
// import UserSearch from "../UserSearch/UserSearch";
import RecentlyActiveCommunities from "../RecentlyActiveCommunities/RecentlyActiveCommunities";
import * as communitiesActions from "../../store/communities";
import * as postsActions from "../../store/posts";
import "./CommunitiesListPage.css";
import PostCommentModal from "../PostCommentModal/PostCommentModal";

function CommunitiesListPage() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session?.user);
  const userPosts = useSelector((state) => state.posts?.userRecentPosts);
  const allPosts = useSelector((state) => state.posts?.allRecentPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null)

  let userRecentPosts;
  if (user && userPosts) {
    userRecentPosts = Object.entries(userPosts);
  }
  let allRecentPostsArray;
  if (allPosts) {
    allRecentPostsArray = Object.entries(allPosts);
  }

  useEffect(() => {
    dispatch(communitiesActions.populateCommunities());
    dispatch(postsActions.populateAllRecentPosts());
    setLoaded(true);
    const colTwo = document.querySelector(".recently-active-communities");
    const colOneContent = document.querySelector(".user-recent-post-container");
    if (colTwo && colOneContent) {
      const height = colTwo.getBoundingClientRect().height;
      colOneContent.style.maxHeight = `${height}px`;
    }
  }, [user?.id, dispatch]);

  return (
    <div className="communities-page">
      {loaded ? (
        <>
          <div className="communities-list-container">
            <div className="community-header">
              <h2>Community Activity</h2>
              Community and official content for all games and software on
              Gleam.
            </div>
            <>
              {user ? (
                <div className="logged-out-popular-hubs">
                  <div className="recent-community-posts">
                    Your recent post history
                    <div className="user-recent-post-container">
                      <UserRecentPosts />
                    </div>
                    <NavLink
                      to={`/users/${user.id}`}
                      className={"community-links recent-user-posts"}
                    >
                      Click here to see all your posts!
                    </NavLink>
                  </div>

                  <div className="recently-active-communities">
                    Join in on the conversation!
                    <RecentlyActiveCommunities />
                  </div>

                  <div className="search-area">
                    <div className="search-community-div">
                      Search for your community
                      <p></p>
                      <CommunitySearch />
                    </div>
                    <div className="search-community-div">
                      Search for a user
                      {/*PLACEHOLDER FOR STYLING PURPOSES*/}
                      <p></p>
                      <input></input>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="logged-out-popular-hubs">
                  <div className="login-signup">
                    <p>Welcome to the Gleam Community</p>
                    <p>
                      Log in to the Gleam Community to find Hubs that center
                      around your favorite games!
                    </p>
                    <span>
                      <NavLink to="/login">
                        <button className="review-button">Log In</button>
                      </NavLink>
                      <NavLink to="/signup">
                        <button className="review-button">Join Gleam</button>
                      </NavLink>
                    </span>
                    <p>
                      Want to know more about the dev team?&nbsp;
                      <NavLink to="/about" className={"about-link"}>
                        Click here!
                      </NavLink>
                    </p>
                  </div>
                  <div className="recently-active-communities">
                    Join in on the conversation!
                    <RecentlyActiveCommunities />
                  </div>
                  <div className="search-area">
                    <div className="search-community-div">
                      Search for your community
                      <CommunitySearch />
                      <p></p>
                    </div>
                    <div className="search-community-div">
                      Search for a user
                      {/*PLACEHOLDER FOR STYLING PURPOSES*/}
                      <p></p>
                      <input></input>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
          <div className="recent-posts-container">
            {allPosts ? (
              allRecentPostsArray.map((post) => (
                <div className="recent-post-card" key={post[1].id}>
                  <div className="pic-and-post">
                    <div className="user-info">
                      <NavLink
                        to={`/users/${post[1].User.id}`}
                        className="community-links"
                      >
                        <img src={`${post[1].User.profilePic}`} />
                        {post[1].User.username}
                      </NavLink>
                    </div>
                    <div className="post-and-post-info">
                      <span className="post-title">{post[1].title}{post[0]}
                         <SlSpeech onClick={() => {
                          setModalOpen(true);
                          setCurrentPostId(post[0])
                          }}/>
                      </span>
                     
                      {modalOpen && 
                      <PostCommentModal onClose={() => setModalOpen(false)} postId={currentPostId} gameId={post[1].Community.Game.id} />
                      }
                      {post[1].post.length < 50 ? (
                        <div className="post-content">{post[1].post}</div>
                      ) : (
                        <div className="post-content">
                          {post[1].post.split(" ").splice(0, 8).join(" ")}...
                        </div>
                      )}
                      <div className="recent-post-info">
                        <div className="recent-post-title">
                          Posted in:{" "}
                          <NavLink
                            to={`/communities/${post[1].Community.id}`}
                            className="community-links"
                          >
                            {post[1].Community.Game.title}
                          </NavLink>
                        </div>
                        <div className="recent-post-date">
                          {new Date(post[1].createdAt).toLocaleDateString(
                            "en-US"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default CommunitiesListPage;
