import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type T_MEDICINE_SCHEDULE = {
  id: string // unique id for schedule (uuid)
  label: string // e.g. "Week 1"
  from: string // ISO string for persistence
  to: string
  medicine: { medicineId: string; times: string[] }[]
}

const initialState: T_MEDICINE_SCHEDULE[] = []

export const SLICE_NAME = 'medicineSchedule'

export const medicineScheduleSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // ✅ Add new week
    addNewWeek: (
      state,
      action: PayloadAction<{
        label: string
        from: string | null
        to: string | null
      }>
    ) => {
      const { label, from, to } = action.payload

      if (!from || !to) {
        throw new Error('Week must have both `from` and `to` dates')
      }

      const newFrom = new Date(from).getTime()
      const newTo = new Date(to).getTime()

      if (newFrom > newTo) {
        throw new Error('Invalid range: `from` cannot be after `to`')
      }

      // ✅ Check overlap
      const hasOverlap = state.some(week => {
        if (!week.from || !week.to) return false
        const existingFrom = new Date(week.from).getTime()
        const existingTo = new Date(week.to).getTime()
        return newFrom <= existingTo && newTo >= existingFrom
      })

      if (hasOverlap) {
        throw new Error('Week interval overlaps with an existing week')
      }

      // ✅ Auto-generate ID
      state.push({
        id: nanoid(),
        label,
        from,
        to,
        medicine: []
      })
    },

    addMedicineToWeek: (
      state,
      action: PayloadAction<{
        weekId: string
        medicineId: string
        times: string[]
      }>
    ) => {
      const week = state.find(w => w.id === action.payload.weekId)
      if (week) {
        const existing = week.medicine.find(
          m => m.medicineId === action.payload.medicineId
        )
        if (existing) {
          // merge new times (deduplicate)
          existing.times = Array.from(
            new Set([...existing.times, ...action.payload.times])
          )
        } else {
          week.medicine.push({
            medicineId: action.payload.medicineId,
            times: action.payload.times
          })
        }
      }
    },

    removeMedicineFromWeek: (
      state,
      action: PayloadAction<{ weekId: string; medicineId: string }>
    ) => {
      const week = state.find(w => w.id === action.payload.weekId)
      if (week) {
        week.medicine = week.medicine.filter(
          m => m.medicineId !== action.payload.medicineId
        )
      }
    },

    removeMedicineTime: (
      state,
      action: PayloadAction<{
        weekId: string
        medicineId: string
        time: string
      }>
    ) => {
      const week = state.find(w => w.id === action.payload.weekId)
      if (week) {
        const med = week.medicine.find(
          m => m.medicineId === action.payload.medicineId
        )
        if (med) {
          med.times = med.times.filter(t => t !== action.payload.time)
        }
      }
    }
  }
})

export const {
  addNewWeek,
  addMedicineToWeek,
  removeMedicineFromWeek,
  removeMedicineTime
} = medicineScheduleSlice.actions

export default medicineScheduleSlice.reducer

// // ✅ Add a new week
// dispatch(
//    addNewWeek({
//   label: 'Week 1',
//   from: '2025-09-15',
//   to: '2025-09-19'
// })
// )

// // ✅ Add medicine with multiple times
// dispatch(
//   addMedicineToWeek({
//     weekId: 'week-1',
//     medicineId: 'med-1',
//     times: ['08:00', '20:00']
//   })
// )

// // ✅ Remove a medicine completely
// dispatch(
//   removeMedicineFromWeek({
//     weekId: 'week-1',
//     medicineId: 'med-1'
//   })
// )

// // ✅ Remove a specific time for a medicine
// dispatch(
//   removeMedicineTime({
//     weekId: 'week-1',
//     medicineId: 'med-1',
//     time: '08:00'
//   })
// )
