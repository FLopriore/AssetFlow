import MenuAppBar from './components/AppBar'
import './App.css'
import Sidebar from './components/Sidebar'
import { Box } from '@mui/material'

function App() {

  return (
    <>
     <Box className='window'>
      <Sidebar className='sidebar'/>
      <Box className='main-content' id='homebox'> 
        <MenuAppBar id='appbar-h'/>
          <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, height: '100%'}}>
            <Box sx={{flexGrow: 1}}>
                <p>Prova 1</p>
            </Box>
            <Box sx={{flexGrow: 1}}>
              <p>Prova 2</p>
            </Box>
            </Box>
          </Box>
      </Box>
    </>
  )
}

export default App
