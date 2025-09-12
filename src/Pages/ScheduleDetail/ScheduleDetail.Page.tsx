import React, { useState, type ReactNode } from 'react'
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
import CustomListItem from '../../Components/ListItem'
import { BLUE_SERENITY } from '../../Constants/COLOR_PALETTES'
import AddMedicine from './Components/AddMedicine'

const Label: React.FC<{ icon: ReactNode; text: string | number }> = ({
  icon,
  text
}) => {
  return (
    <Stack direction={'row'} gap={'8px'}>
      {icon}
      <Typography variant="caption">{text}</Typography>{' '}
    </Stack>
  )
}

const ScheduleDetail: React.FC = () => {
  const dispatch = useDispatch()
  const schedules = useSelector((state: RootState) => selectAllSchedules(state))

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null)
  const [openMedicineDialog, setOpenMedicineDialog] = useState(false)

  const handleOpenMedicineDialog = (id: string | null) => {
    setSelectedWeekId(id)
    setOpenMedicineDialog(true)
  }

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleSubmit = (payload: {
    label: string
    from: string
    to: string
  }) => {
    console.log('abel, startDate, endDate', payload)
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
                <CustomListItem key={sched.id} icon={<RiOrganizationChart />}>
                  <Stack width={'100%'}>
                    <Typography variant="subtitle2">{sched.label}</Typography>
                    <Stack
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      direction={'row'}
                      sx={{ width: '100%' }}
                    >
                      <Label
                        text={sched.from}
                        icon={
                          <RiCalendarLine
                            style={{ height: '20px', width: '20px' }}
                          />
                        }
                      />
                      <Label
                        text={sched.to}
                        icon={
                          <RiCalendarLine
                            style={{ height: '20px', width: '20px' }}
                          />
                        }
                      />
                      <IconButton
                        onClick={() => handleOpenMedicineDialog(sched.id)}
                        sx={{
                          borderRadius: '8px',
                          border: `1px solid ${BLUE_SERENITY[3]}`,
                          background: BLUE_SERENITY[1]
                        }}
                      >
                        <Label
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

      {openMedicineDialog && selectedWeekId && (
        <AddMedicine
          open={openMedicineDialog}
          handleClose={() => handleOpenMedicineDialog(null)}
          weekId={selectedWeekId}
        />
      )}
    </>
  )
}

export default ScheduleDetail
