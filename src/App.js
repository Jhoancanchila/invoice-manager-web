import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
