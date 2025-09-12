import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
  MenuItem,
  IconButton
} from '@mui/material'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { RiCloseLine } from '@remixicon/react'
import { addMedicineToWeek } from '../../../Redux/MedicineSchedule/Reducer'
import { getAllMedicines } from '../../../Redux/MedicineList/Selector'

interface IAddMedicineProps {
  open: boolean
  handleClose: () => void
  weekId: string
}

const AddMedicine: React.FC<IAddMedicineProps> = ({
  open,
  handleClose,
  weekId
}) => {
  const dispatch = useDispatch()
  const medicineList = useSelector(getAllMedicines)

  const [selectedMedicine, setSelectedMedicine] = useState<string>('')
  const [times, setTimes] = useState<Dayjs[]>([])

  const handleAddTime = () => setTimes([...times, dayjs()])

  const handleTimeChange = (index: number, value: Dayjs | null) => {
    if (!value) return
    const updated = [...times]
    updated[index] = value
    setTimes(updated)
  }

  const handleRemoveTime = (index: number) => {
    setTimes(times.filter((_time, i) => i !== index))
  }

  const handleClick = () => {
    if (selectedMedicine && times.length) {
      const formattedTimes = times.map(t => t.format('HH:mm'))
      dispatch(
        addMedicineToWeek({
          weekId: weekId,
          medicineId: selectedMedicine,
          times: formattedTimes
        })
      )
      setSelectedMedicine('')
      setTimes([])
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Stack sx={{ p: '16px' }} gap={'12px'}>
        <Stack gap={'4px'}>
          <Typography variant="h6">Add Medicine</Typography>
          <Typography variant="caption">
            Select a medicine and add times
          </Typography>
        </Stack>

        <TextField
          select
          label="Select Medicine"
          value={selectedMedicine}
          onChange={e => setSelectedMedicine(e.target.value)}
        >
          {medicineList.map((med: { id: string; name: string }) => (
            <MenuItem key={med.id} value={med.id}>
              {med.name}
            </MenuItem>
          ))}
        </TextField>

        <Stack gap="8px">
          <Typography variant="subtitle2">Times</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {times.map((time, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                gap="8px"
                justifyContent="space-between"
              >
                <TimePicker
                  value={time}
                  onChange={newValue => handleTimeChange(index, newValue)}
                />
                <IconButton onClick={() => handleRemoveTime(index)}>
                  <RiCloseLine />
                </IconButton>
              </Stack>
            ))}
          </LocalizationProvider>
          <Button variant="outlined" onClick={handleAddTime}>
            + Add Time
          </Button>
        </Stack>

        <Button
          variant="contained"
          onClick={handleClick}
          disabled={!selectedMedicine || times.length === 0}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  )
}

export default AddMedicine
