import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import UsersList from './usuario/user_list/Users.js';
import reportWebVitals from './reportWebVitals';
import ProductList from './produto/prod_list/Product.js';
import ProdutoForm from './produto/prod_form/Prod_form.js';
import Front from './Front';
import CadastroForms from './usuario/user_form/User_forms.js';
import VendaForm from './venda/venda_form/Venda.js';
import VendaList from './venda/venda_list/Venda_list.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/front/users-page" element={<UsersList />} />
        <Route path="/front/product-page" element={<ProductList />}/>
        <Route path='/' element={<Front />}/>
        <Route path='/front/product' element={<ProdutoForm />}/>
        <Route path="/front" element={<CadastroForms />} />
        <Route path='/front/venda' element={<VendaForm />} />
        <Route path='/front/venda-page' element={<VendaList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
