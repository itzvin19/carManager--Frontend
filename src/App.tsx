import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Index from './views/Index'

function App() {

  return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />} >
          <Route index element={<Index/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
