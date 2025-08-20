import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../store/posts";

function UserRecentPosts() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const userPosts = useSelector((state) => state.posts?.userRecentPosts);

  let userRecentPosts;
  if (user && userPosts) {
    userRecentPosts = Object.entries(userPosts);
  }

  useEffect(() => {
    dispatch(postsActions.populateRecentUserPosts());
  }, [user?.id, dispatch]);

  console.log(userRecentPosts);

  return (
    <>
      {userRecentPosts ? (
        userRecentPosts.map((posts) => {
          return (
            <div className="user-post-card" key={posts[0]}>
              <div className="recent-user-posts">{posts[1].post}</div>
              <div className="user-post-info">
                <div className="user-community-post-title">
                  Posted in: {posts[1].Community.Game.title}
                </div>
                <div className="user-post-date">
                  {new Date(posts[1].createdAt).toLocaleDateString("en-US")}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}

export default UserRecentPosts;
