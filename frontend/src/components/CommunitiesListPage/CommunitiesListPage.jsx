import {
  useEffect,
  //  useMemo,
  //   useState
} from "react";
import { useDispatch } from "react-redux";
import * as communitiesActions from "../../store/communities";
import { useSelector } from "react-redux";
import "./CommunitiesListPage.css";

function CommunitiesListPage() {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities?.allCommunities);
  let allCommunitiesArray;
  if (communities) {
    allCommunitiesArray = Object.entries(communities);
  }

  useEffect(() => {
    dispatch(communitiesActions.populateCommunities());
  }, [dispatch]);

  return (
    <div className="communities-list-container">
      {communities ? (
        <div>
          {allCommunitiesArray.map((community) => (
            <div key={community[0]}>{community[1].gameId}</div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CommunitiesListPage;
