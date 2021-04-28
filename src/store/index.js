// reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import myInfo from "./myInfo/myInfo.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["myInfo"]
};

const rootReducer = combineReducers({
    myInfo
});

export default persistReducer(persistConfig, rootReducer);