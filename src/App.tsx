import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import Signin from './Pages/SigninPage';
import Signup from './Pages/SiginupPage';
import AdminCheckPage from './Pages/AdminCheckPage';

function App() {

  return (
    <Router>
        <Routes>
          <Route 
            path="/"
            element={localStorage.getItem("token") ? <ListPage/> : <Navigate to="/signin" />}
          />
          <Route path="signin" element={<Signin/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="admincheck" element={<AdminCheckPage/>}/>
        </Routes>
    </Router>
  )
}

export default App
