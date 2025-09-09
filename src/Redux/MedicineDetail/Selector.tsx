import { createSelector } from '@reduxjs/toolkit'
import { SLICE_NAME, type T_MEDICINE_DETAIL } from './Reducer'

const select = (state: any) => state[SLICE_NAME]

// // return the whole array
export const getAllDetails = createSelector(select, slice => slice)

// ------------------------------------------------------------------------------------------------------------------------

// base selector
const selectMedicineDetail = (state: any) => state.medicineDetail

// 1️⃣ get all ids
export const getAllMedicineIds = createSelector(selectMedicineDetail, details =>
  details.map((d: T_MEDICINE_DETAIL) => d.id)
)

// 2️⃣ factory selector to get detail by id
export const getMedicineDetailById = (id: string) =>
  createSelector(
    selectMedicineDetail,
    details => details.find((d: T_MEDICINE_DETAIL) => d.id === id) || null
  )
