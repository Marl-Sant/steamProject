import { csrfFetch } from "./csrf";

const SET_COMMUNITIES = "communities/setCommunities";
const SET_CURRENT_COMMUNITY = "communities/setCurrentCommunities";
const ADD_COMMUNITY_POST = "communities/addCommunityPost";
const DELETE_COMMUNITY_POST = "communities/deleteCommunityPost";

const setCommunities = (communities) => {
  return {
    type: SET_COMMUNITIES,
    payload: communities,
  };
};

const setCurrentCommunity = (community) => {
  return {
    type: SET_CURRENT_COMMUNITY,
    payload: community,
  };
};

const addCommunityPost = (post) => {
  return {
    type: ADD_COMMUNITY_POST,
    payload: post,
  };
};

const deleteCommunityPost = (id) => {
  return {
    type: DELETE_COMMUNITY_POST,
    payload: id,
  };
};

export const populateCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities/recent");
  const data = await response.json();
  dispatch(setCommunities(data));
  return response;
};

export const getCommunityById = (id) => async (dispatch) => {
  const response = await fetch(`/api/communities/${id}`);
  const data = await response.json();
  dispatch(setCurrentCommunity(data));
  return response;
};

export const createCommunityPost = (newPost) => async (dispatch) => {
  const { communityId, post, ownerId } = newPost;

  const response = await csrfFetch(`/api/communities/${communityId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ownerId: ownerId,
      communityId: communityId,
      post: post,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return dispatch(addCommunityPost(data));
  }
};

export const deletePost = (deleteRequest) => async (dispatch) => {
  const { communityId, postId } = deleteRequest;
  const response = await csrfFetch(
    `api/communities/${communityId}/posts/${postId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    return dispatch(deleteCommunityPost(postId));
  }
};

const initialState = { allCommunities: null, currentCommunity: null };

const communitiesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_COMMUNITIES:
      action.payload.forEach((community) => {
        newState[community.id] = community;
      });
      return { ...state, allCommunities: newState };
    case SET_CURRENT_COMMUNITY:
      return { ...state, currentCommunity: action.payload };
    case ADD_COMMUNITY_POST:
      newState = {
        ...state,
      };
      newState.currentCommunity.Posts[action.payload.id] = action.payload;
      return newState;
    case DELETE_COMMUNITY_POST:
      newState = {
        ...state,
      };
      delete newState.currentCommunity.Posts[action.payload];
      return newState;
    default:
      return state;
  }
};

export default communitiesReducer;
