import React from 'react';
import './Users.css';
import {

    Modal,Box
  } from '@mui/material';
import { useState } from 'react';

    
    
    

    




    function ProductList() {
        
    const boxStyle = {
    backgroundColor: 'white',
    padding: '10px',
    margin: '15% auto',
    width: '400px',
    };
      const [open, setOpen] = useState(false);
      const [products, setProducts] = React.useState([]);
     

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const [formData, setFormData] = React.useState({
        id:"",
        name: "",
        quantity: "",
        price: "",
      });
            

      
      React.useEffect(() => {
        fetch("http://localhost:8000/front/product-page")  
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro na resposta do servidor");
            }
            return response.json();
          })
          .then(data => setProducts(data))
          .catch(err => console.error("Erro ao buscar o produto:", err));
      }, []);

      const handleEdit = (products) => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        })
        handleOpen();
        setFormData({
          id:products.id,
          name: products.name,
          quantity: products.quantity,
          price: products.price,
        });
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };



      
        
    const handleSubmit = async (e) => {
    e.preventDefault();

  const aformData = new FormData();
  aformData.append('id', formData.id);
  aformData.append('name', formData.name);
  aformData.append('quantity', formData.quantity);
  aformData.append('price', formData.price);

  try {
    const response = await fetch('http://localhost:8000/front/put-product', {
      method: 'POST',
      body: aformData,
    });

    if (response.redirected) {
      window.location.href = 'http://localhost:3000/front/product-page';
      handleClose();
    } else {
      console.error('Erro ao criar usuário:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
  

};


      return (
        <div>
          <Modal  open={open} onClose={handleClose}>
            <Box style={boxStyle}>
                <form onSubmit={handleSubmit} className="form">
            
                  <label>
                    Name:
                    <input id="name" type="text" name="name" value={formData.name}
                    onChange={handleChange} />
                  </label>
                  <br />
                  <label>
                    Quantity:
                    <input id="quantity"  name="quantity" 
                    value={formData.quantity}
                    onChange={handleChange}/>
                  </label>
                  <br />
                  <label>
                    Price:
                    <input id="price"  name="price" 
                    value={formData.price}
                    onChange={handleChange}/>
                  </label>
                  <br />
                  <br />
                <button type='submit' id="botao">Editar</button> 
              </form>
            </Box>
        </Modal>

          
          <h2>Product List</h2>
          <ul>
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.id}>
                  Id: {product.id} | Name: {product.name} | Quantity: {product.quantity} | Price: ${product.price}.00
                  <button
                  id="editar"
                    className="edit-user"
                    type="button"
                    variant="contained"
                    onClick={() => handleEdit(product)}
                    
                  >
                    Update Product
                  </button> 
                  <hr />

                </li>
              ))
            ) : (
              <p>No Products found.</p>
            )}
          </ul>
        </div>
      );
    }

export default ProductList;