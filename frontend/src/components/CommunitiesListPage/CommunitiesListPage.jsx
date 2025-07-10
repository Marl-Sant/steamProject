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
  let allCommunitiesArray;
  if (communities) {
    allCommunitiesArray = Object.entries(communities);
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
            {user ? (
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
                    Want to know more about the dev team?{" "}
                    <NavLink to="/about">Click here!</NavLink>
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
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
