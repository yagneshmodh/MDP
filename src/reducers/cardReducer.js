import * as types from '../constants/actionTypes';

const initialState = {
  card: null,
  savedCard: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CARD_CHANGED:
      if (action.payload) {
        return {
          ...state,
          card: action.payload,
          savedCard: [...new Set([...state.savedCard, action.payload.MemberID])],
        };
      }
      return initialState;

    default:
      return state;
  }
};
