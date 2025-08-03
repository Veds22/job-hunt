import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import JobCard from './components/JobCard'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import SavedJobs from './pages/SavedJobs'
import BrowseJobs from './pages/BrowseJobs'
import Profile from './pages/Profile'
function App() {


  return (
    <div>
      
      <Router>
      <Navbar />
      <Content>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/saved-jobs' element={<SavedJobs/>} />
          <Route path='/browse-jobs' element={<BrowseJobs/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
        </Content>
      </Router>
      
    </div>
  )
}

export default App  
