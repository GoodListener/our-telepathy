// reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import myInfo from "./myInfo/myInfo.reducer";
import workingHours from "./workingHours/workingHours.reducer";
import memberList from './memberList/memberList.reducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["myInfo", "workingHours"]
};

const rootReducer = combineReducers({
    myInfo,
    workingHours,
    memberList
});

export default persistReducer(persistConfig, rootReducer);