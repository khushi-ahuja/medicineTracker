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
import medicineListSlice from '../Redux/MedicineList/Reducer'
import medicineScheduleSlice from '../Redux/MedicineSchedule/Reducer'

const reducers = combineReducers({
  auth: authSlice,
  medicineList: medicineListSlice,
  medicineSchedule: medicineScheduleSlice
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'medicineDetail', 'medicineList', 'medicineSchedule']
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

// infer types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)
export { store, persistor }
