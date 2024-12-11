import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Use named import
import { composeWithDevTools } from "@redux-devtools/extension";
import itemReducer from "./reducers/itemReducer";
import announcementReducer from "./reducers/announcementReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  announcements: announcementReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
