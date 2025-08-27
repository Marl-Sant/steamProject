import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import * as communityActions from "../../store/communities";
import "./CommunityDetail.css";

function CommunityDetail() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const community = useSelector((state) => state.communities?.currentCommunity);

  useEffect(() => {
    dispatch(communityActions.getCommunityById(communityId));
  }, [dispatch, communityId]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="community-detail-page">
      <div
        style={{
          backgroundImage: `url(${community?.Game.background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {community && (
          <>
            <div className="title-and-store-page">
              <h1>{community.Game.title} Community</h1>
              <NavLink to={`/games/${community.Game.id}`}>
                <button>Visit the Store Page</button>
              </NavLink>
            </div>

            <div className="community-container">
              <div className="community-game-banner">
                <div className="game-image-div">
                  <img src={community.Game.capsuleImage} alt={community.Game.title} />
                </div>
                <div className="game-information">
                  <div className="game-short-description">
                    {community.Game.shortDescription}
                  </div>
                  <div className="cost-and-details-page">
                    <div>${community.Game.price}</div>
                    <NavLink to={`/games/${community.Game.id}`}>
                      <button>Visit the Store Page</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="community-posts-wrapper">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="community-posts"
                columnClassName="community-post-column"
              >
                {Object.entries(community.Posts).map(([id, post]) => (
                  <div key={id} className="community-post">
                    <div className="post-title"><p>{post.title}</p></div>
                    <div className="post-content"><p>{post.post}</p></div>

                    <div className="poster-details">
                    <Link to={`/users/${post.User?.id}`}>
                      <img 
                        src={`${post.User?.profilePic}`}
                        alt={`${post.User?.username}'s profile`}
                        className="poster-profile-pic"
                      />
                      </Link>
                      <div className="poster-information">
                        <div className="user-username">{post.User.username}</div>
                        <div className="post-date">
                          {(() => {
                            const date = new Date(post.createdAt);
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
                  </div>
                ))}
              </Masonry>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CommunityDetail;
