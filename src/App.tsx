import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import Signin from './Pages/SigninPage';
import Signup from './Pages/SiginupPage';
import AdminCheckPage from './Pages/AdminCheckPage';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ListPage/>} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/admincheck" element={<AdminCheckPage/>}/>
        </Routes>
    </Router>
  )
}

export default App
