import type { T_MEDICINE } from './Redux/MedicineList/Reducer'

export const getMedicineDetailById = (
  id: string,
  medicineList: T_MEDICINE[]
) => {
  return medicineList.find(medi => medi.id === id)
}
