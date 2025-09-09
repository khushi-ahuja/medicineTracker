import { Button, Dialog, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface IAddMedicineProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (name: string, description: string) => void
}

const INITIAL_STATE = {
  name: '',
  description: ''
}

const AddMedicine: React.FC<IAddMedicineProps> = ({
  open,
  handleClose,
  handleSubmit
}) => {
  const [details, setDetails] = useState(INITIAL_STATE)

  const handleTextFieldChange = (e: any) => {
    const { name, value } = e.target
    setDetails({
      ...details,
      [name]: value
    })
  }

  const handleClick = () => {
    handleSubmit(details.name, details.description)
    handleClose()
    setDetails(INITIAL_STATE)
  }

  const isEnable = !!(details.name.length > 3 && details.description.length > 2)
  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack sx={{ p: '16px' }} gap={'12px'}>
        <Stack gap={'4px'}>
          <Typography variant="h6">Add Medicine</Typography>
          <Typography variant="caption">Details of the medicine</Typography>
        </Stack>
        <TextField
          id="outlined-helperText"
          label="Name"
          placeholder="name"
          value={details.name}
          name="name"
          onChange={handleTextFieldChange}
        />
        <TextField
          id="outlined-helperText"
          label="Description"
          placeholder="description"
          name="description"
          value={details.description}
          onChange={handleTextFieldChange}
        />
        <Button variant="contained" onClick={handleClick} disabled={!isEnable}>
          Submit
        </Button>
      </Stack>
    </Dialog>
  )
}

export default AddMedicine
