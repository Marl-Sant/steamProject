import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../CommunitiesListPage/CommunitiesListPage.css";

function RecentlyActiveCommunities() {
  const communities = useSelector((state) => state.communities?.allCommunities);

  let topCommunitiesArray;
  if (communities) {
    topCommunitiesArray = Object.entries(communities).sort(
      (a, b) => b[1].newPostCount - a[1].newPostCount
    );
  }
  return (
    <>
      {topCommunitiesArray ? (
        topCommunitiesArray.map((community) => (
          <NavLink
            to={`/communities/${community[1].id}`}
            className="community-links"
            key={community[0]}
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
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default RecentlyActiveCommunities;
