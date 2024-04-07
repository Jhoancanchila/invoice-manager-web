import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Invoice from './pages/Invoice';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
