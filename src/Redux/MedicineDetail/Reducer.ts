import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type T_MEDICINE_DETAIL = {
  id: string // e.g. week id
  from: Date | null
  to: Date | null
  medicine: { medicineId: string; time: string }[]
}

const initialState: T_MEDICINE_DETAIL[] = [
  {
    id: 'week 1',
    from: new Date(),
    to: new Date(),
    medicine: []
  }
]

export const SLICE_NAME = 'medicineDetail'

export const medicineDetailSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMedicineToWeek: (
      state,
      action: PayloadAction<{
        weekId: string
        medicines: { medicineId: string; time: string }[]
      }>
    ) => {
      const week = state.find(w => w.id === action.payload.weekId)
      if (week) {
        week.medicine.push(...action.payload.medicines)
      }
    },
    removeMedicineFromWeek: (
      state,
      action: PayloadAction<{
        weekId: string
        medicineId: string
      }>
    ) => {
      const week = state.find(w => w.id === action.payload.weekId)
      if (week) {
        week.medicine = week.medicine.filter(
          m => m.medicineId !== action.payload.medicineId
        )
      }
    }
  }
})
// dispatch(
//   addMedicineToWeek({
//     weekId: 'week 1',
//     medicines: [
//       { medicineId: 'id-1', time: '08:00 AM' },
//       { medicineId: 'id-2', time: '02:00 PM' },
//       { medicineId: 'id-3', time: '09:00 PM' }
//     ]
//   })
// )
// dispatch(
//   removeMedicineFromWeek({
//     weekId: 'week 1',
//     medicineId: 'id-3'
//   })
// )

export const { addMedicineToWeek, removeMedicineFromWeek } =
  medicineDetailSlice.actions
export default medicineDetailSlice.reducer
