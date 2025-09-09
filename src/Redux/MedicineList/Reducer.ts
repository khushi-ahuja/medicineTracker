import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type T_MEDICINE = {
  id: string
  name: string
  description: string
}

const initialState: T_MEDICINE[] = []

export const SLICE_NAME = 'medicineList'

export const medicineListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMedicine: {
      reducer: (state, action: PayloadAction<T_MEDICINE>) => {
        state.push(action.payload)
      },
      prepare: (name: string, description: string) => {
        return {
          payload: {
            id: nanoid(),
            name,
            description
          }
        }
      }
    },
    updateMedicine: (
      state,
      action: PayloadAction<{ id: string; name?: string; description?: string }>
    ) => {
      const med = state.find(m => m.id === action.payload.id)
      if (med) {
        if (action.payload.name !== undefined) {
          med.name = action.payload.name
        }
        if (action.payload.description !== undefined) {
          med.description = action.payload.description
        }
      }
    },
    removeMedicine: (state, action: PayloadAction<string>) => {
      return state.filter(med => med.id !== action.payload)
    }
  }
})

// ✅ Example usage
// Add a new medicine
// dispatch(addMedicine('Paracetamol', 'Used to reduce fever and mild pain'))

// Update medicine name or description
// dispatch(updateMedicine({ id: 'some-id', name: 'Dolo 650', description: 'Pain reliever & fever reducer' }))

// Remove medicine
// dispatch(removeMedicine('some-id'))

export const { addMedicine, updateMedicine, removeMedicine } =
  medicineListSlice.actions
export default medicineListSlice.reducer
