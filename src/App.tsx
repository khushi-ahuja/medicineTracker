import { Suspense } from 'react'
import './App.css'
import Loader from './Components/Loader'
import AppRouter from './AppRouter'

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
