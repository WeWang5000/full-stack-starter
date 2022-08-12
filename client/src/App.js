import ItemForm from './ItemForm';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthContextProvider, AuthProtected } from './AuthContext';
import Detail from './Detail';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import MusicContainer from './MusicContainer';
import PasswordRoutes from './Passwords/PasswordRoutes';
import Register from './Register';
import UserRoutes from './Users/UserRoutes';

import './App.scss';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/detail/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <ItemForm />
              </AuthProtected>
            }
          />
          <Route
            path="/detail/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <ItemForm />
              </AuthProtected>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwords/*" element={<PasswordRoutes />} />
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && <Route path="/register" element={<Register />} />}
          <Route
            path="/account/*"
            element={
              <AuthProtected>
                <UserRoutes />
              </AuthProtected>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
