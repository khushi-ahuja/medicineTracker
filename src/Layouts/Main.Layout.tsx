import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { RiCapsuleFill, RiFileListLine, RiHome2Line } from '@remixicon/react'
import { useState, type FC } from 'react'
import { Outlet } from 'react-router'

const MainLayout: FC = () => {
  const [value, setValue] = useState(0)

  return (
    <Box sx={{ p: '16px', mb: '48px' }}>
      <Outlet />
      <BottomNavigation
        showLabels
        value={value}
        sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Currrent" icon={<RiHome2Line />} />
        <BottomNavigationAction label="Schedule" icon={<RiFileListLine />} />
        <BottomNavigationAction
          label="Medicine List"
          icon={<RiCapsuleFill />}
        />
      </BottomNavigation>
    </Box>
  )
}

export default MainLayout
