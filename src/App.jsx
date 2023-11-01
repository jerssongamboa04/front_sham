import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import Home from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './Components/Footer';
import WorkOrders from './Pages/WorkOrders';
import DailyIncidents from './Pages/DailyIncidents';
import Users from './Pages/Users';
import UserId from './Components/UserId';
import HeaderLogin from './Components/HeaderLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderLogin />
        <AuthContext>
          <Routes>

            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />

            <Route path="/ordenes" element={
              <ProtectedRoute>
                <WorkOrders />
              </ProtectedRoute>} />

            <Route path="/incidents" element={
              <ProtectedRoute>
                <DailyIncidents />
              </ProtectedRoute>} />


            <Route path="/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>} />


            <Route path="/users/user/:id" element={
              <ProtectedRoute>
                <UserId />
              </ProtectedRoute>} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
