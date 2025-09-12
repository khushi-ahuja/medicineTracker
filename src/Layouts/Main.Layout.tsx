import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { RiCapsuleFill, RiFileListLine, RiHome2Line } from '@remixicon/react'
import { useEffect, useState, type FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import APP_ROUTES from '../Constants/APP_ROUTES'

const MainLayout: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState(APP_ROUTES.HOME.pathname)

  const handleChangeBottomNavigation = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setValue(newValue)
    navigate(newValue)
  }

  useEffect(() => {
    if (value !== pathname) {
      setValue(pathname)
    }
  }, [])

  return (
    <Box sx={{ p: '16px', mb: '48px' }}>
      <Outlet />
      <BottomNavigation
        showLabels
        value={value}
        sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
        onChange={handleChangeBottomNavigation}
      >
        <BottomNavigationAction
          value={APP_ROUTES.HOME.pathname}
          label="Currrent"
          icon={<RiHome2Line />}
        />
        <BottomNavigationAction
          value={APP_ROUTES.SCHEDULE.pathname}
          label="Schedule"
          icon={<RiFileListLine />}
        />
        <BottomNavigationAction
          value={APP_ROUTES.MEDICINE_LIST.pathname}
          label="Medicine List"
          icon={<RiCapsuleFill />}
        />
      </BottomNavigation>
    </Box>
  )
}

export default MainLayout
