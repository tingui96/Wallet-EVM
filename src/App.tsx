import './App.css'
import Views from './pages/View'
import { IS_DEVELOPMENT } from './config'
import { Footer } from './components/Footer'
import { NextUIProvider } from '@nextui-org/react'
import { Route,Routes, useNavigate } from 'react-router-dom'
import { Setup } from './pages/Setup'
import { Settings } from './pages/Settings'

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div className='flex justify-center content-center'>
            <Routes>
              <Route path='/' element={<Views />}> </Route>
              <Route path='/setup' element={<Setup/>}> </Route>
              <Route path='/setting' element={<Settings/>}> </Route>
              <Route path='*' element={<Views/>}> </Route>
            </Routes>       
      </div>
        {IS_DEVELOPMENT && <Footer/>}
    </NextUIProvider>
  )
}

export default App
