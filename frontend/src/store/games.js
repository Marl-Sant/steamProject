const SET_GAMES = 'game/setGames';
const SET_CURRENT_GAME = 'game/setCurrentGame';

const setGames = (games) => {
  return {
    type: SET_GAMES,
    payload: games,
  };
};

const setCurrentGame = (game) => {
  return {
    type: SET_CURRENT_GAME,
    payload: game,
  };
};

export const populateGames = () => async (dispatch) => {
  const response = await fetch('/api/games');
  const data = await response.json();
  dispatch(setGames(data));
  return response;
};

export const getGameById = (id) => async (dispatch) => {
  const response = await fetch(`/api/games/${id}`);
  const data = await response.json();
  dispatch(setCurrentGame(data));
  return response;
};

const initialState = { allGames: null, currentGame: null };

const gameReducer = (state = initialState, action) => {
  const newState = {};
  switch (action.type) {
    case SET_GAMES:
      action.payload.forEach((game) => {
        newState[game.id] = game;
      });
      return { ...state, allGames: newState };
    case SET_CURRENT_GAME:
      return { ...state, currentGame: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
