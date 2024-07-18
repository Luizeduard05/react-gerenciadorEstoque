import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AlertProvider from './context/AlertContext'
import IAlert from './components/IAlert'


function App() {
  return (
    <>
      <AlertProvider>
        <IAlert />
        <Navbar />
        <Outlet />
        <Footer />
      </AlertProvider>
    </>
  )
}

export default App
