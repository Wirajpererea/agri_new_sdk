import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["appDataState"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(
  persistedReducer,
  {},
  process.env.NODE_ENV !== "production"
    ? // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk, logger)) : applyMiddleware(thunk));
      applyMiddleware(thunk, logger)
    : applyMiddleware(thunk)
);
export const persistor = persistStore(store);
