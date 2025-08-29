
import './App.css'
import Login from './components/LoginPage/Login'
import {Routes,Route} from 'react-router'
import Home from './components/HomePage/Home'
import Popular from './components/PopularPage/Popular'
import NotFound from './components/NotFoundPage/NotFound'
import SearchPage from './components/SearchPage/SearchPage'
import MovieDetails from './components/MovieDetailsPage/MovieDetails'
import Accounts from './components/AccountsPage/Accounts'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute><Home></Home></ProtectedRoute>} />
      <Route path="/popular" element={<ProtectedRoute><Popular></Popular></ProtectedRoute>}></Route>
      <Route path="*" element={<ProtectedRoute><NotFound></NotFound></ProtectedRoute>}></Route>
      <Route path='/search' element={<ProtectedRoute><SearchPage></SearchPage></ProtectedRoute>}></Route>
      <Route path='/moviedetails/:id' element={<ProtectedRoute><MovieDetails></MovieDetails></ProtectedRoute>}></Route>
      <Route path="/accounts" element={<ProtectedRoute><Accounts></Accounts></ProtectedRoute>}></Route>
    </Routes>
     
    </>
  )
}

export default App
