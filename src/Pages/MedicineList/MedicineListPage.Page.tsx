import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { RiDeleteBinLine, RiMedicineBottleLine } from '@remixicon/react'
import { GREY } from '../../Constants/COLOR_PALETTES'
import AddMedicine from './Components/AddMedicine.Component'
import { addMedicine, removeMedicine } from '../../Redux/MedicineList/Reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMedicines } from '../../Redux/MedicineList/Selector'
import NoData from '../../Components/NoData'
import CustomListItem from '../../Components/CustomListItem'

// TODO: Add confirmation on delete - if added on any schedules

const MedicineListPage: React.FC = () => {
  const dispatch = useDispatch()
  const list = useSelector(getAllMedicines)

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleSubmit = (name: string, description: string) => {
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
              <CustomListItem key={medi.id} icon={<RiMedicineBottleLine />}>
                <Stack>
                  <Typography variant="subtitle2">{medi.name}</Typography>
                  <Typography variant="caption" sx={{ color: GREY[5] }}>
                    {medi.description}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                  <RiDeleteBinLine
                    onClick={() => dispatch(removeMedicine(medi.id))}
                  />
                  {/* TODO:  <RiPencilLine /> */}
                </Stack>
              </CustomListItem>
            )
          })
        ) : (
          <NoData handleOpenDialog={handleOpenDialog} btnText="Add Medicine" />
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
