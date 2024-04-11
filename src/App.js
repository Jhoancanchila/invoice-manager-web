import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Cookies } from "react-cookie";

import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Invoice from './pages/Invoice';
import Login from './pages/Login';
import { useState } from 'react';
import { AuthContext } from './context/auth';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  
  const cookies = new Cookies();
  const [ authToken, setAuthToken ] = useState(cookies.get("token"));
  const [ user, setUser ] = useState(cookies.get("user"));
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/invoice' element={<Invoice/>}/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
