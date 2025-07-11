import {
  useEffect,
  //  useMemo,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as communitiesActions from "../../store/communities";
import "./CommunitiesListPage.css";

function CommunitiesListPage() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const communities = useSelector((state) => state.communities?.allCommunities);
  const user = useSelector((state) => state.session?.user);
  let topCommunitiesArray;
  if (communities) {
    topCommunitiesArray = Object.entries(communities).sort((a, b) => b[1].newPostCount - a[1].newPostCount );
  }
  

  useEffect(() => {
    dispatch(communitiesActions.populateCommunities());
    setLoaded(true);
  }, [dispatch]);

  return (
    <>
      {loaded ? (
        <div className="communities-list-container">
          <div className="community-header">
            <h2>Community Activity</h2>
            Community and official content for all games and software on Gleam.
          </div>
          <>
            {user ?(
              <div className="logged-out-popular-hubs">
                REPLACE THIS WITH USERS LATEST COMMUNITY POSTS
                <div className="recently-active-communities">
                    {topCommunitiesArray ? topCommunitiesArray.map(community => {
                      {console.log(community[1].Game.title)}
                      return (<div className="community-card" key={community[0]}>
                        <img src={community[1].Game.capsuleImage} className="community-logo" />
                        <div className="community-name-activity">
                        <span className="community-title">{community[1].Game.title}</span>
                        {community[1].newPostCount} new posts this week!
                        </div>
                      </div>)
                    }) : <></>}
                </div>
              </div>
            )  : (
              (
              <div className="logged-out-popular-hubs">
                <div className="login-signup">
                  <p>Welcome to the Gleam Community</p>
                  <p>
                    Log in to the Gleam Community to find Hubs that center
                    around your favorite games!
                  </p>
                  <span>
                    <button className="review-button">Log In</button>
                    <button className="review-button">Join Gleam</button>
                  </span>
                  <p>
                    Want to know more about the dev team?&nbsp;
                    <NavLink to="/about" className={'about-link'}>Click here!</NavLink>
                  </p>
                </div>
                <div className="recently-active-communities">
                    {topCommunitiesArray ? topCommunitiesArray.map(community => {
                      {console.log(community[1].Game.title)}
                      return (<div className="community-card" key={community[0]}>
                        <img src={community[1].Game.capsuleImage} className="community-logo" />
                        <div className="community-name-activity">
                        <span className="community-title">{community[1].Game.title}</span>
                        {community[1].newPostCount} new posts this week!
                        </div>
                      </div>)
                    }) : <></>}
                </div>
              </div>
            )
            )}
          </>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default CommunitiesListPage;
