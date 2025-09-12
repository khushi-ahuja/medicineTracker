import { Stack, Box } from '@mui/material'
import React, { type ReactNode } from 'react'
import { BLUE_SERENITY } from '../Constants/COLOR_PALETTES'

interface ICustomListItemProps {
  icon: ReactNode
  children: ReactNode | string
  onClick?: () => void
}

const CustomListItem: React.FC<ICustomListItemProps> = ({
  icon,
  children,
  onClick
}) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      gap={'8px'}
      sx={{
        p: '12px',
        borderRadius: '8px',
        background: BLUE_SERENITY[0],
        border: `1px solid ${BLUE_SERENITY[1]}`
      }}
      onClick={onClick}
    >
      <Stack>
        <Box
          sx={{
            p: '6px',
            border: `1px solid ${BLUE_SERENITY[4]}`,
            background: BLUE_SERENITY[3],
            borderRadius: '8px'
          }}
        >
          {icon}
        </Box>
      </Stack>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        sx={{ width: '100%' }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default CustomListItem
