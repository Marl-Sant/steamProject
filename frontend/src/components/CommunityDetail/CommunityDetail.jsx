import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import * as communityActions from "../../store/communities";
import "./CommunityDetail.css";

function CommunityDetail() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const community = useSelector((state) => state.communities?.currentCommunity);
  //   let activePosts = Object.entries(community.Posts).sort(
  //     (a, b) => b[1].
  //      SEE COMMENTS BELOW
  //   )
  useEffect(() => {
    dispatch(communityActions.getCommunityById(communityId));
  }, [dispatch, communityId]);

  // if (community) {
  // }
  return (
    <div className="community-detail-page">
      {community ? (
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
                <img src={`${community.Game.capsuleImage}`} />
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
        </>
      ) : (
        <></>
      )}

      {/* {community ? 
      (<div className="active-posts">
        {community.Posts.map((post) => {
            WE NEED TO CREATE A POST COMMENTS MODEL, MIG, AND SEEDER.
            INSIDE OF THE ROUTE ASKING FOR THE CURRENT COMMUNITY WE
            NEED TO INCLUDE THE POST COMMENT IN THE INCLUDE FOR POST.
            SORT THE RETURN BASED ON THE AMOUNT OF COMMENTS ON A POST
            RENDER THE TOP TWO POSTS IN THEIR OWN DIV BEFORE 
            RENDERING THE REST OF THE POSTS
        })}
      </div>) : <></>} */}

      {community ? (
        <div className="community-posts">
          {Object.entries(community.Posts).map((post) => (
            <div className="community-post" key={post[0]}>
              <div className="post-title">{post[1].title}</div>
              <hr></hr>
              <div className="post-content">{post[1].post}</div>
              <hr></hr>
              {/* <div className="rating-and-comment-count">
                PLACE THE AVERAGE RATING FOR THE POST AND CHAT BUBBLE ICON WITH THE AMOUNT OF COMMENTS ATTACHED TO THE POST
              </div> */}
              <div className="post-user-information">
                <div className="user-picture">
                  <img src={post[1].User.profilePic} />
                </div>
                <div className="user-username">{post[1].User.username}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CommunityDetail;
