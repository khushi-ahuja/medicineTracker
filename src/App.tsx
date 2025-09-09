import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './Components/Loader'
import AppRouter from './AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
