import { useSelector } from 'react-redux'
import {
  getAllDetails,
  getAllMedicineIds,
  getMedicineDetailById
} from '../../Redux/MedicineDetail/Selector'
import { Button, Stack, Typography } from '@mui/material'

function Home() {
  const value = useSelector(getAllDetails)
  const ids = useSelector(getAllMedicineIds)
  const week1Detail = useSelector(getMedicineDetailById('week 1'))

  console.log('value', value)
  console.log('ids', ids)
  console.log('week1Detail', week1Detail)

  const handleIdClick = () => {
    console.log('reidrection to a new page')
  }

  return (
    <Stack alignItems={'center'} sx={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Week Name List
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Select the week to edit
      </Typography>
      {ids.map((weekName: string, index: number) => {
        //  can add her edit and delete clone
        return (
          <Button
            key={`${weekName}+${index}`}
            variant="outlined"
            fullWidth
            onClick={handleIdClick}
          >
            {weekName}
          </Button>
        )
      })}
    </Stack>
  )
}

export default Home
