import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Box className='outerbox'>
      <Sidebar />
      <Box className='innerbox' sx={{display: 'flex'}}>
        <Box sx={{alignSelf: 'center', flexGrow: 1}}>
          <p>Qui le entrate</p>
        </Box>
        <Box sx={{alignSelf: 'center', flexGrow: 1}}>
          <p>Qui le uscite</p>
        </Box>
      </Box>
      </Box>
    </>
  )
}

export default App
