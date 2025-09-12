import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../Store'
import type { T_MEDICINE_SCHEDULE } from './Reducer'

// Get all schedules
export const selectAllSchedules = (state: RootState): T_MEDICINE_SCHEDULE[] =>
  state.medicineSchedule

// Get a single schedule by weekId
export const selectScheduleById = (weekId: string) =>
  createSelector(
    [selectAllSchedules],
    (schedules): T_MEDICINE_SCHEDULE | undefined =>
      schedules.find(s => s.id === weekId)
  )

// Get all medicines in a week
export const selectMedicinesInWeek = (weekId: string) =>
  createSelector(
    [selectScheduleById(weekId)],
    schedule => schedule?.medicine ?? []
  )

// Get times for a specific medicine in a week
export const selectMedicineTimes = (weekId: string, medicineId: string) =>
  createSelector([selectScheduleById(weekId)], schedule => {
    const med = schedule?.medicine.find(m => m.medicineId === medicineId)
    return med?.times ?? []
  })
