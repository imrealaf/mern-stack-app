import { combineReducers } from "redux";

/**
 *  Import all reducers
 */
import { user } from "./user";

/**
 *  Export combined reducers
 */
export default combineReducers({
  user
});
