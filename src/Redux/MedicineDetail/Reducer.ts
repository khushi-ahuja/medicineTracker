import { createSlice } from '@reduxjs/toolkit'

export type T_MEDICINE_DETAIL = {
  id: string
  from: Date | null
  to: Date | null
  medicine:
    | {
        name: string
        time?: string
      }[]
    | []
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
    saveLogin: (state, action) => {
      // state.id = action.payload.id
      // state.username = action.payload.username
      // state.firstName = action.payload.firstName
      // state.lastName = action.payload.lastName
      // state.gender = action.payload.gender
      // state.image = action.payload.image
      // state.token = action.payload.token
    },
    removeLogin: state => {
      // state.id = null
      // state.username = null
      // state.firstName = null
      // state.lastName = null
      // state.gender = null
      // state.image = null
      // state.token = null
    }
  }
})

export const { saveLogin, removeLogin } = medicineDetailSlice.actions
export default medicineDetailSlice.reducer
