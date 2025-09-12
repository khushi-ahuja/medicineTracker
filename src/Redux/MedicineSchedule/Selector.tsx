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
    (schedule: T_MEDICINE_SCHEDULE | undefined) => schedule?.medicine ?? []
  )

// Get the schedule for the current date
export const selectTodaySchedule = createSelector(
  [selectAllSchedules],
  (schedules: T_MEDICINE_SCHEDULE[]) => {
    const today = new Date()
    const todayTime = today.getTime()

    return schedules.find(schedule => {
      const fromTime = new Date(schedule.from).getTime()
      const toTime = new Date(schedule.to).getTime()
      return todayTime >= fromTime && todayTime <= toTime
    })
  }
)
