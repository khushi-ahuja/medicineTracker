import { Dialog, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBinLine, RiMedicineBottleLine } from '@remixicon/react'
import { selectScheduleById } from '../../../Redux/MedicineSchedule/Selector'
import { getAllMedicines } from '../../../Redux/MedicineList/Selector'
import CustomListItem from '../../../Components/CustomListItem'
import { getMedicineDetailById } from '../../../utils'
import { removeMedicineFromWeek } from '../../../Redux/MedicineSchedule/Reducer'

interface IWeekDetailProps {
  open: boolean
  handleClose: () => void
  weekId: string
}

const WeekDetail: React.FC<IWeekDetailProps> = ({
  open,
  handleClose,
  weekId
}) => {
  const dispatch = useDispatch()
  const weekMedicine = useSelector(selectScheduleById(weekId))
  const medicineList = useSelector(getAllMedicines)

  const deleteMedicine = (id: string) => {
    dispatch(
      removeMedicineFromWeek({
        weekId: weekId,
        medicineId: id
      })
    )
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Stack sx={{ p: '16px' }} gap={'12px'}>
        <Stack gap={'4px'}>
          <Typography variant="h6">Schedule Details</Typography>
          <Typography variant="subtitle2">
            Medicine details for <b>{weekMedicine?.label}</b>
          </Typography>
        </Stack>

        {weekMedicine?.medicine.map(medi => {
          const medicineDetail = getMedicineDetailById(
            medi.medicineId,
            medicineList
          )
          return (
            <CustomListItem
              icon={<RiMedicineBottleLine />}
              key={medi.medicineId}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ width: '100%' }}
              >
                <Typography variant="subtitle2">
                  {medicineDetail?.name}
                </Typography>
                <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
                  <Typography variant="caption">
                    {medi.times.join(' , ')}
                  </Typography>
                  <IconButton onClick={() => deleteMedicine(medi.medicineId)}>
                    <RiDeleteBinLine />
                  </IconButton>
                </Stack>
              </Stack>
            </CustomListItem>
          )
        })}
      </Stack>
    </Dialog>
  )
}

export default WeekDetail
