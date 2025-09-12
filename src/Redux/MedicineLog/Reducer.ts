import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type T_MEDICINE_LOG_ENTRY = {
  id: string
  medicineId: string
  scheduledTime: string // planned time (e.g. "15:00")
  takenAt: string // actual timestamp ISO
}

export type T_MEDICINE_LOG_STATE = {
  [date: string]: T_MEDICINE_LOG_ENTRY[]
}

const initialState: T_MEDICINE_LOG_STATE = {}

export const SLICE_NAME = 'medicineLog'

export const medicineLogSlice = createSlice({
  name: 'medicineLog',
  initialState,
  reducers: {
    logMedicine: (
      state,
      action: PayloadAction<{
        medicineId: string
        scheduledTime: string
        date: string
        takenAt?: string
      }>
    ) => {
      const { medicineId, scheduledTime, date, takenAt } = action.payload
      const entry: T_MEDICINE_LOG_ENTRY = {
        id: nanoid(),
        medicineId,
        scheduledTime,
        takenAt: takenAt ?? new Date().toISOString()
      }

      if (!state[date]) {
        state[date] = []
      }
      state[date].push(entry)
    },

    removeLog: (state, action: PayloadAction<{ date: string; id: string }>) => {
      const { date, id } = action.payload
      if (state[date]) {
        state[date] = state[date].filter(entry => entry.id !== id)
        // if (state[date].length === 0) {
        //   delete state[date] // clean up empty dates
        // }
      }
    },

    clearDateLogs: (state, action: PayloadAction<{ date: string }>) => {
      delete state[action.payload.date]
    }
  }
})

// dispatch(
//   logMedicine({
//     medicineId: 'med-1',
//     scheduledTime: '15:00',
//     date: '2025-09-12',
//   })
// )

export const { logMedicine, removeLog, clearDateLogs } =
  medicineLogSlice.actions
export default medicineLogSlice.reducer
