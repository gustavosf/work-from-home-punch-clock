import { combineReducers, createStore } from "redux";
import * as actions from "./actions";
import * as reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const createReducer = (reducers = {}, initialState = {}) => {
  return (state, action) => {
    const { type } = action;
    if (!reducers[type]) return state || initialState;
    return reducers[type](state, action);
  };
};

const rootReducer = combineReducers({
  punchClock: createReducer(
    {
      [actions.SET_TIMES]: reducers.setTimes,
      [actions.ADD_TIME]: reducers.addTime,
    },
    { times: {} }
  ),
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
