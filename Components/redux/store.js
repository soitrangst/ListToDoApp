import Reducer from "./reducer";
import { createStore } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, Reducer)

export const store = createStore(Reducer);
export const persistor = persistStore(store);

