import { Stack, Typography } from '@mui/material'
import React, { type ReactNode } from 'react'

interface ICustomLabelProps {
  icon: ReactNode
  text: string | number
}

const CustomLabel: React.FC<ICustomLabelProps> = ({ icon, text }) => {
  return (
    <Stack direction={'row'} gap={'8px'}>
      {icon}
      <Typography variant="caption">{text}</Typography>{' '}
    </Stack>
  )
}

export default CustomLabel
