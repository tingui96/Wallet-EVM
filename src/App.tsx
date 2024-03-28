import { Box } from '@chakra-ui/react'
import './App.css'
import Views from './pages/View'
import { IS_DEVELOPMENT } from './config'
import { Footer } from './components/Footer'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import { Setup } from './pages/Setup'
import { Unlock } from './pages/Unlock'
import { Main } from './pages/Main'
import { useAccount } from './store/useAccount'
function App() {
  const navigate = useNavigate();
  const {account} = useAccount()
  console.log(account)
  return (
    <NextUIProvider navigate={navigate}>
      <div className='flex justify-center content-center'>
            <Routes>
            <Route path='/' element={<Views />}> </Route>
            <Route path='/dashboard' element={<Main/>}></Route>
            <Route path="/setup" element={<Setup/>}></Route>
            <Route path='/unlock' element={<Unlock/>}></Route>
            </Routes>       
      </div>
        {IS_DEVELOPMENT && <Footer/>}
    </NextUIProvider>
  )
}

export default App
