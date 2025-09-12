import { createSelector } from '@reduxjs/toolkit'
import { SLICE_NAME, type T_MEDICINE_LOG_STATE } from './Reducer'
import type { RootState } from '../../Store'

// base selector
const selectLogSlice = (state: RootState): T_MEDICINE_LOG_STATE =>
  state[SLICE_NAME]

// 1️⃣ Get the entire log state (all dates with entries)
export const getAllLogs = createSelector(
  selectLogSlice,
  (slice: T_MEDICINE_LOG_STATE) => slice
)

// 2️⃣ Get all available dates
export const getAllLogDates = createSelector(
  selectLogSlice,
  (slice: T_MEDICINE_LOG_STATE) => Object.keys(slice)
)

// 3️⃣ Factory selector: get all logs for a specific date
export const getLogsByDate = (date: string) =>
  createSelector(
    selectLogSlice,
    (slice: T_MEDICINE_LOG_STATE) => slice[date] ?? []
  )
