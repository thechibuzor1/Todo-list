import { combineReducers } from "redux";
import todoReducer from "./todoReducer";

let reducers  = combineReducers({
    todoReducer: todoReducer,
});

const rootReducers = (state, action) => {
    return reducers(state, action);
};
export default rootReducers;