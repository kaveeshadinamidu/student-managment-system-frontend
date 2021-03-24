import LogInReducer from "./LogInReducer"
import BodyPartClickReducer from "./BodyPartClickReducer"
import {combineReducers} from "redux"
import User from "./User"
import InternalReducer from "./InternalChanges"
const allReducers = combineReducers({
    LogInReducer,
    BodyPartClickReducer,
    User,
    InternalReducer
});

export default allReducers;