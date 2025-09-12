import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSchedules } from '../../Redux/MedicineSchedule/Selector'
import type { RootState } from '../../Store'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import NoData from '../../Components/NoData'
import AddWeek from './Components/AddWeek'
import { addNewWeek } from '../../Redux/MedicineSchedule/Reducer'
import {
  RiCalendarLine,
  RiMedicineBottleLine,
  RiOrganizationChart
} from '@remixicon/react'
import CustomListItem from '../../Components/CustomListItem'
import { BLUE_SERENITY } from '../../Constants/COLOR_PALETTES'
import AddMedicine from './Components/AddMedicine'
import CustomLabel from '../../Components/CustomLabel'
import WeekDetail from './Components/WeekDetail'

const ScheduleDetail: React.FC = () => {
  const dispatch = useDispatch()
  const schedules = useSelector((state: RootState) => selectAllSchedules(state))

  // TODO: add readable details of that week's list in dialog etc
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null)
  const [openMedicineDialog, setOpenMedicineDialog] = useState(false)
  const [openWeekDetail, setOpenWeekDetail] = useState(false)

  const handleOpenMedicineDialog = (id: string | null) => {
    setSelectedWeekId(id)
    setOpenMedicineDialog(!openMedicineDialog)
  }

  const handleOpenWeekDetailDialog = (id: string | null) => {
    setSelectedWeekId(id)
    setOpenWeekDetail(!openWeekDetail)
  }

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleSubmit = (payload: {
    label: string
    from: string
    to: string
  }) => {
    dispatch(addNewWeek(payload))
  }

  return (
    <>
      <Stack gap={'8px'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h5">Medicine Schedules!</Typography>
          {!!schedules.length && (
            <Button variant="outlined" onClick={handleOpenDialog}>
              + Add
            </Button>
          )}
        </Stack>

        <Stack gap={'8px'}>
          {schedules.length ? (
            schedules.map(sched => {
              return (
                <CustomListItem
                  key={sched.id}
                  icon={<RiOrganizationChart />}
                  onClick={() => handleOpenWeekDetailDialog(sched.id)}
                >
                  <Stack width={'100%'}>
                    <Typography variant="subtitle2">{sched.label}</Typography>
                    <Stack
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      direction={'row'}
                      sx={{ width: '100%' }}
                    >
                      <CustomLabel
                        text={sched.from}
                        icon={
                          <RiCalendarLine
                            style={{ height: '20px', width: '20px' }}
                          />
                        }
                      />
                      <CustomLabel
                        text={sched.to}
                        icon={
                          <RiCalendarLine
                            style={{ height: '20px', width: '20px' }}
                          />
                        }
                      />
                      <IconButton
                        onClick={e => {
                          e.stopPropagation()
                          handleOpenMedicineDialog(sched.id)
                        }}
                        sx={{
                          borderRadius: '8px',
                          border: `1px solid ${BLUE_SERENITY[3]}`,
                          background: BLUE_SERENITY[1]
                        }}
                      >
                        <CustomLabel
                          text={sched.medicine.length}
                          icon={
                            <RiMedicineBottleLine
                              style={{ height: '20px', width: '20px' }}
                            />
                          }
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CustomListItem>
              )
            })
          ) : (
            <NoData
              handleOpenDialog={handleOpenDialog}
              btnText="Add Schedule"
            />
          )}
        </Stack>
      </Stack>
      <AddWeek
        open={openDialog}
        handleClose={handleOpenDialog}
        handleSubmit={handleSubmit}
      />
      <AddMedicine
        open={openMedicineDialog}
        handleClose={() => handleOpenMedicineDialog(null)}
        weekId={selectedWeekId || ''}
      />
      <WeekDetail
        open={openWeekDetail}
        handleClose={() => handleOpenWeekDetailDialog(null)}
        weekId={selectedWeekId || ''}
      />
    </>
  )
}

export default ScheduleDetail
