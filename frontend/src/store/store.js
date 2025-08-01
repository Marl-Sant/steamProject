import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import gameReducer from "./games";
import reviewsReducer from "./reviews";
import communitiesReducer from "./communities";
import commentsReducer from "./comments";
import userPostReducer from "./posts";
import profileCommentsReducer from "./profileComments"
import currentProfileReducer from "./currentProfile"


const rootReducer = combineReducers({
  session: sessionReducer,
  games: gameReducer,
  reviews: reviewsReducer,
  communities: communitiesReducer,
  comments: commentsReducer,
  posts: userPostReducer,
  profileComments: profileCommentsReducer,
  currentProfile: currentProfileReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
