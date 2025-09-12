import { Stack, Typography, Button } from '@mui/material'
import React from 'react'
import { IMG_NO_DATA } from '../Constants/IMAGE'

interface INoDataProps {
  handleOpenDialog?: () => void
  btnText?: string
}

const NoData: React.FC<INoDataProps> = ({
  handleOpenDialog,
  btnText = 'Add'
}) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} gap={'16px'}>
      <img
        srcSet={`${IMG_NO_DATA}`}
        src={`${IMG_NO_DATA}`}
        alt={'No Data  Illustration'}
        loading="lazy"
        style={{ maxWidth: '450px' }}
      />
      <Typography variant="subtitle1" sx={{ padding: '8px' }}>
        Oops! Seems like no medicine is listed.
      </Typography>
      <Button variant="outlined" onClick={handleOpenDialog} fullWidth>
        {btnText}
      </Button>
    </Stack>
  )
}

export default NoData
