import { Button, Dialog, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'

interface IAddWeekProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (payload: { label: string; from: string; to: string }) => void
}

const INITIAL_STATE = {
  label: '',
  startDate: null as Dayjs | null,
  endDate: null as Dayjs | null
}

// TODO: to convert, So if you have a stored string like "2025-09-04", you just need to wrap it with dayjs() when giving it to the DatePicker.
// dayjs(details.startDate)

const AddWeek: React.FC<IAddWeekProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const [details, setDetails] = useState(INITIAL_STATE)

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    value: Dayjs | null
  ) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClick = () => {
    if (details.label && details.startDate && details.endDate) {
      handleSubmit({
        label: details.label,
        from: details.startDate.format('YYYY-MM-DD'),
        to: details.endDate.format('YYYY-MM-DD')
      })
    }
    handleClose()
    setDetails(INITIAL_STATE)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack sx={{ p: '16px' }} gap={'12px'}>
        <Stack gap={'4px'}>
          <Typography variant="h6">Add Week</Typography>
          <Typography variant="caption">
            Details of the schedule week
          </Typography>
        </Stack>

        <TextField
          id="outlined-helperText"
          label="Week Name"
          placeholder="week 1"
          value={details.label}
          name="label"
          onChange={handleTextFieldChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={details.startDate}
            onChange={newValue => handleDateChange('startDate', newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            disabled={!details.startDate}
            value={details.endDate}
            minDate={
              details.startDate ? details.startDate.add(1, 'day') : dayjs()
            }
            onChange={newValue => handleDateChange('endDate', newValue)}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleClick}
          disabled={!details.label || !details.startDate || !details.endDate}
        >
          Submit
        </Button>
      </Stack>
    </Dialog>
  )
}

export default AddWeek
