import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Changed to named import
import { composeWithDevTools } from "@redux-devtools/extension";
import itemReducer from "./reducers/itemReducer";

const rootReducer = combineReducers({
  items: itemReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
