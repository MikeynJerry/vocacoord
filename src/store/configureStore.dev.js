import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";

const persistConfig = {
  key: "com.vocacoord:state",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      store.replaceReducer(persistedReducer);
    });
  }

  return { store, persistor };
};

export default configureStore;
