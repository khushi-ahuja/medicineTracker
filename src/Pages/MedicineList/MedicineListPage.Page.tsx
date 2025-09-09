import React, { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import {
  RiDeleteBinLine,
  RiMedicineBottleLine,
  RiPencilLine
} from '@remixicon/react'
import { BLUE_SERENITY, GREY } from '../../Constants/COLOR_PALETTES'
import { IMG_NO_DATA } from '../../Constants/IMAGE'
import AddMedicine from './Components/AddMedicine.Component'
import { addMedicine, removeMedicine } from '../../Redux/MedicineList/Reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMedicines } from '../../Redux/MedicineList/Selector'

// TODO: Add confirmation on delete - if added on any schedules

const MedicineListPage: React.FC = () => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  const list = useSelector(getAllMedicines)

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleSubmit = (name: string, description: string) => {
    console.log('name, description', name, description)
    dispatch(addMedicine(name, description))
  }

  return (
    <Stack gap={'8px'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h5">Your Medicines!</Typography>
        {!!list.length && (
          <Button variant="outlined" onClick={handleOpenDialog}>
            + Add
          </Button>
        )}
      </Stack>
      <Stack gap={'8px'}>
        {list.length ? (
          list.map(medi => {
            return (
              <Stack
                key={medi.id}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={'8px'}
                sx={{
                  p: '12px',
                  borderRadius: '8px',
                  background: BLUE_SERENITY[0],
                  border: `1px solid ${BLUE_SERENITY[1]}`
                }}
              >
                <Stack direction={'row'} alignItems={'center'} gap={'12px'}>
                  <Box
                    sx={{
                      p: '6px',
                      border: `1px solid ${BLUE_SERENITY[4]}`,
                      background: BLUE_SERENITY[3],
                      borderRadius: '8px'
                    }}
                  >
                    <RiMedicineBottleLine />
                  </Box>
                  <Stack>
                    <Typography variant="subtitle2">{medi.name}</Typography>
                    <Typography variant="caption" sx={{ color: GREY[5] }}>
                      {medi.description}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                  <RiDeleteBinLine
                    onClick={() => dispatch(removeMedicine(medi.id))}
                  />
                  <RiPencilLine />
                </Stack>
              </Stack>
            )
          })
        ) : (
          <Stack justifyContent={'center'} gap={'16px'}>
            <img
              srcSet={`${IMG_NO_DATA}`}
              src={`${IMG_NO_DATA}`}
              alt={'no data illustration'}
              loading="lazy"
            />
            <Typography
              variant="subtitle1"
              sx={{ padding: '8px', textAlign: 'center' }}
            >
              Oops! Seems like no medicine is listed.
            </Typography>
            <Button variant="outlined" onClick={handleOpenDialog}>
              Add Medicine
            </Button>
          </Stack>
        )}
      </Stack>

      <AddMedicine
        open={openDialog}
        handleClose={handleOpenDialog}
        handleSubmit={handleSubmit}
      />
    </Stack>
  )
}

export default MedicineListPage
