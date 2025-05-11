import { createStore } from 'redux';

// Define initial state
const initialState = {
  segments: [],  // Stores the audience segments
  campaigns: [], // Stores past campaigns
};

// Define action types
const ADD_SEGMENT = 'ADD_SEGMENT';
const ADD_CAMPAIGN = 'ADD_CAMPAIGN';

// Reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEGMENT:
      return { ...state, segments: [...state.segments, action.payload] };
    case ADD_CAMPAIGN:
      return { ...state, campaigns: [action.payload, ...state.campaigns] };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;
