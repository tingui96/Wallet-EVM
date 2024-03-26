import { Box } from '@chakra-ui/react'
import './App.css'
import Views from './pages/View'
import { IS_DEVELOPMENT } from './config'
import { Footer } from './components/Footer'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import { Setup } from './pages/Setup'
import { Password } from './pages/Password'
import { Warning } from './pages/Warning'

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div className='flex justify-center content-center'>
        <Box
          display="flex" 
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          >
            <Routes>
            <Route path='/' element={<Views/>}> </Route>
            <Route path="/setup" element={<Setup/>}></Route>
            <Route path='/unlock' element={<Password/>}></Route>
            <Route path='/setPass' element={<Warning/>}></Route>
            </Routes>       
          </Box>
      </div>
        {IS_DEVELOPMENT && <Footer />}
    </NextUIProvider>
  )
}

export default App
