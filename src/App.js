import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import MonthlySales from './pages/MonthlySales';
import ErrorPage from "./pages/ErrorPage";


import ProductSales from "./pages/ProductSales";
import LoginPage from "./pages/LoginPage";
import {useAuth} from "./context/AuthContext";

function App() {

    const { isAuthenticated }  = useAuth();

    console.log(isAuthenticated)

    return (
      <BrowserRouter>
          <Routes>
              {isAuthenticated ? (
                  <Route path='/' element={<AppLayout />}>
                      <Route index element={<MonthlySales />} />
                      <Route path='/product_sales' element={<ProductSales />} />
                      <Route path='/product' element={<ProductSales />} />
                  </Route>
              ) : (
                  <Route path='/' element={<LoginPage />} />
              )}
              <Route path='*' element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;