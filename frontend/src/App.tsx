import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateBlog } from './pages/CreateBlog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/blog/:id' element={<Blog/>}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/create' element={<CreateBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
