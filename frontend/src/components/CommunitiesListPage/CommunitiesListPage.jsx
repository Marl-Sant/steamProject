import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommunitySearch from "../CommunitySearch/CommunitySearch";
import * as communitiesActions from "../../store/communities";
import * as postsActions from "../../store/posts";
import "./CommunitiesListPage.css";

function CommunitiesListPage() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const communities = useSelector((state) => state.communities?.allCommunities);
  const user = useSelector((state) => state.session?.user);
  const userPosts = useSelector((state) => state.posts?.userRecentPosts);
  const allPosts = useSelector((state) => state.posts?.allRecentPosts);

  let topCommunitiesArray;
  if (communities) {
    topCommunitiesArray = Object.entries(communities).sort(
      (a, b) => b[1].newPostCount - a[1].newPostCount
    );
  }
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
    if (user) {
      dispatch(postsActions.populateRecentUserPosts());
    }
    setLoaded(true);
  }, [user?.id, dispatch]);

  return (
    <div className="communities-page">
      {loaded ? (
        <>
          <CommunitySearch />
          <div className="communities-list-container">
            <div className="community-header">
              <h2>Community Activity</h2>
              Community and official content for all games and software on
              Gleam.
            </div>
            <>
              {user ? (
                <div className="logged-out-popular-hubs">
                  <div>
                    Your recent post history
                    {userRecentPosts ? (
                      userRecentPosts.map((posts) => {
                        return (
                          <div className="user-post-card" key={posts[0]}>
                            <div>{posts[1].post}</div>
                            <div className="user-post-info">
                              <div className="user-post-title">
                                Posted in: {posts[1].Community.Game.title}
                              </div>
                              <div className="user-post-date">
                                {new Date(
                                  posts[1].createdAt
                                ).toLocaleDateString("en-US")}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="recently-active-communities">
                    Join in on the conversation!
                    {topCommunitiesArray ? (
                      topCommunitiesArray.map((community) => {
                        return (
                          <NavLink
                            to={`/communities/${community[1].id}`}
                            className="community-links"
                          >
                            <div className="community-card" key={community[0]}>
                              <img
                                src={community[1].Game.capsuleImage}
                                className="community-logo"
                              />
                              <div className="community-name-activity">
                                <span className="community-title">
                                  {community[1].Game.title}
                                </span>
                                {community[1].newPostCount} new posts this week!
                              </div>
                            </div>
                          </NavLink>
                        );
                      })
                    ) : (
                      <></>
                    )}
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
                    {topCommunitiesArray ? (
                      topCommunitiesArray.map((community) => {
                        return (
                          <NavLink
                            to={`/communities/${community[1].id}`}
                            className="community-links"
                          >
                            <div className="community-card" key={community[0]}>
                              <img
                                src={community[1].Game.capsuleImage}
                                className="community-logo"
                              />
                              <div className="community-name-activity">
                                <span className="community-title">
                                  {community[1].Game.title}
                                </span>
                                {community[1].newPostCount} new posts this week!
                              </div>
                            </div>
                          </NavLink>
                        );
                      })
                    ) : (
                      <></>
                    )}
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
                      <span className="post-title">{post[1].title}</span>
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
