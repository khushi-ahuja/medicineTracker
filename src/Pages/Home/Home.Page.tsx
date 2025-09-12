import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material'
import { RiMedicineBottleLine, RiTimerLine } from '@remixicon/react'
import { selectTodaySchedule } from '../../Redux/MedicineSchedule/Selector'
import { getAllMedicines } from '../../Redux/MedicineList/Selector'
import type { T_MEDICINE } from '../../Redux/MedicineList/Reducer'
import NoData from '../../Components/NoData'
import CustomListItem from '../../Components/CustomListItem'
import CustomLabel from '../../Components/CustomLabel'
import { GREY } from '../../Constants/COLOR_PALETTES'
import { getMedicineDetailById } from '../../utils'

const Home: React.FC = () => {
  const currentSchedule = useSelector(selectTodaySchedule)
  const medicineList = useSelector(getAllMedicines)
  const [schedule, setSchedule] = useState<
    {
      medicine: T_MEDICINE | undefined
      time: string
    }[]
  >([])

  const flatenSchedule = () => {
    if (!currentSchedule) return
    const { medicine } = currentSchedule

    const flattened = medicine.flatMap(med => {
      const medi = getMedicineDetailById(med.medicineId, medicineList)

      return med.times.map(time => ({
        medicine: medi,
        time
      }))
    })

    flattened.sort((a, b) => {
      const [aHour, aMin] = a.time.split(':').map(Number)
      const [bHour, bMin] = b.time.split(':').map(Number)
      return aHour * 60 + aMin - (bHour * 60 + bMin)
    })

    setSchedule(flattened)
  }

  useEffect(() => {
    flatenSchedule()
  }, [])

  return (
    <Stack gap={'8px'}>
      <Stack>
        <Typography variant="h5">Hello!</Typography>
        <Typography variant="subtitle1">
          Here is the schedule for today
        </Typography>
      </Stack>
      <Stack gap={'8px'}>
        {schedule.length ? (
          schedule.map(medicine => {
            return (
              <CustomListItem
                key={`${medicine.medicine?.id}-${medicine.time}`}
                icon={<RiMedicineBottleLine />}
              >
                <Stack>
                  <Typography variant="subtitle2">
                    {medicine.medicine?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: GREY[5] }}>
                    {medicine.medicine?.description}
                  </Typography>
                </Stack>

                <CustomLabel
                  text={medicine.time}
                  icon={
                    <RiTimerLine style={{ height: '20px', width: '20px' }} />
                  }
                />
              </CustomListItem>
            )
          })
        ) : (
          <NoData hideBtn={true} />
        )}
      </Stack>
    </Stack>
  )
}

export default Home
