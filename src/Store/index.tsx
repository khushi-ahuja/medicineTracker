import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '../Redux/test'
import storage from 'redux-persist/lib/storage' // ✅ this one for web localStorage

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import medicineDetailSlice from '../Redux/MedicineDetail/Reducer'
import medicineListSlice from '../Redux/MedicineList/Reducer'

const reducers = combineReducers({
  auth: authSlice,
  medicineDetail: medicineDetailSlice,
  medicineList: medicineListSlice
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'medicineDetail', 'medicineList']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)
export { store, persistor }
