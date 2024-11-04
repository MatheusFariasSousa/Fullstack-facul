import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CadastroForm from './App';
import UsersList from './Users';
import reportWebVitals from './reportWebVitals';
import ProductList from './Product';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/front" element={<CadastroForm />} />
        <Route path="/front/users-page" element={<UsersList />} />
        <Route path="/front/product-page" element={<ProductList />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
