import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { IconButton, Stack, Typography } from '@mui/material'
import { RiMedicineBottleLine, RiTimerLine } from '@remixicon/react'
import { selectTodaySchedule } from '../../Redux/MedicineSchedule/Selector'
import { getAllMedicines } from '../../Redux/MedicineList/Selector'
import { getLogsByDate } from '../../Redux/MedicineLog/Selector'
import { logMedicine } from '../../Redux/MedicineLog/Reducer'
import NoData from '../../Components/NoData'
import CustomListItem from '../../Components/CustomListItem'
import CustomLabel from '../../Components/CustomLabel'
import { BLUE_SERENITY, GREY } from '../../Constants/COLOR_PALETTES'
import { getMedicineDetailById } from '../../utils'

const Home: React.FC = () => {
  const todayKey = dayjs().format('YYYY-MM-DD') // for Redux selectors
  const todayLabel = dayjs().format('dddd, MMMM D, YYYY') // for UI

  const dispatch = useDispatch()
  const currentSchedule = useSelector(selectTodaySchedule)
  const medicineList = useSelector(getAllMedicines)
  const todayLogs = useSelector(getLogsByDate(todayKey))

  // 🔹 Precompute logged set for O(1) lookups
  const loggedSet = useMemo(() => {
    return new Set(
      todayLogs.map(log => `${log.medicineId}-${log.scheduledTime}`)
    )
  }, [todayLogs])

  // 🔹 Derive & memoize schedule (no local state needed)
  const schedule = useMemo(() => {
    if (!currentSchedule) return []
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
    return flattened
  }, [currentSchedule, medicineList])

  const handleMedicineLog = (id: string, scheduleTime: string) => {
    dispatch(
      logMedicine({
        medicineId: id,
        scheduledTime: scheduleTime,
        date: todayKey
      })
    )
  }

  return (
    <Stack gap="8px">
      <Stack>
        <Typography variant="h5">Hello!</Typography>
        <Typography variant="subtitle1">
          Here is the schedule for {todayLabel}
        </Typography>
      </Stack>
      <Stack gap="8px">
        {schedule.length ? (
          schedule.map(medicine => (
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

              <IconButton
                disabled={loggedSet.has(
                  `${medicine.medicine?.id}-${medicine.time}`
                )}
                sx={{
                  border: `1px solid ${BLUE_SERENITY[4]}`,
                  borderRadius: '6px',
                  background: BLUE_SERENITY[2]
                }}
                onClick={() =>
                  handleMedicineLog(medicine.medicine?.id || '', medicine.time)
                }
              >
                <CustomLabel
                  text={medicine.time}
                  icon={
                    <RiTimerLine style={{ height: '20px', width: '20px' }} />
                  }
                />
              </IconButton>
            </CustomListItem>
          ))
        ) : (
          <NoData
            hideBtn
            descriptionText="Welcome! Start by adding your medicines, then create a schedule. Once your schedule is ready, it'll show up here."
          />
        )}
      </Stack>
    </Stack>
  )
}

export default Home
