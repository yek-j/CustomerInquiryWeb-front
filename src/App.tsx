import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import Signin from './components/Sign/Signin';

function App() {
  const dumyUser = null;

  return (
    <Router>
        <Routes>
          <Route 
            path="/"
            element={dumyUser ? <ListPage/> : <Navigate to="/signin" />}
          />
          <Route path="signin" element={<Signin/>}/>
        </Routes>
    </Router>
  )
}

export default App
