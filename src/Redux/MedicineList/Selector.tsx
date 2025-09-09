import { createSelector } from '@reduxjs/toolkit'
import { SLICE_NAME, type T_MEDICINE } from './Reducer'

// base selector
const selectMedicineList = (state: any) => state[SLICE_NAME]

// 1️⃣ get the whole list
export const getAllMedicines = createSelector(
  selectMedicineList,
  (slice: T_MEDICINE[]) => slice
)

// 2️⃣ get all medicine IDs
export const getAllMedicineIds = createSelector(
  selectMedicineList,
  (slice: T_MEDICINE[]) => slice.map(m => m.id)
)

// 3️⃣ factory selector: get medicine by id
export const getMedicineById = (id: string) =>
  createSelector(
    selectMedicineList,
    (slice: T_MEDICINE[]) => slice.find(m => m.id === id) || null
  )
