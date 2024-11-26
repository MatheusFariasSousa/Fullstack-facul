import React from 'react';
import styles from './Venda_list.module.css';
import {

    Modal,Box
  } from '@mui/material';
import { useState } from 'react';

    
    
    

    




    function VendaList() {
        
    const boxStyle = {
    backgroundColor: 'white',
    padding: '10px',
    margin: '15% auto',
    width: '400px',
    };
      const [open, setOpen] = useState(false);
      const [vendas, setVenda] = React.useState([]);
     

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const [formData, setFormData] = React.useState({
        id:"",
        Quantity: "",
      });
            

      
      React.useEffect(() => {
        fetch("http://localhost:8000/front/venda-page")  
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro na resposta do servidor");
            }
            return response.json();
          })
          .then(data => setVenda(data))
          .catch(err => console.error("Erro ao buscar das vendas:", err));
      }, []);

      const handleEdit = (vendas) => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        })
        handleOpen();
        setFormData({
          id:vendas.id,
          Quantity:vendas.Quantity
        });
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      
      const excluir  =  async (vendas) =>{
        const response =  await fetch(`http://localhost:8000/front/del-venda/${vendas.id}`,{
          method: 'DELETE',
      });
      if(response.ok){
        alert("Sucesso");
        window.location.href='http://localhost:3000/front/venda-page';
      }
      else{
        alert(response.statusText);
        console.error('Erro ao deletar venda:', response.statusText);
        window.location.href='http://localhost:3000/front/venda-page';
      }
      };



      
        
    const handleSubmit = async (e) => {
    e.preventDefault();

  const aformData = new FormData();
  aformData.append('id', formData.id);
  aformData.append('Quantity', formData.Quantity);


  try {
    const response = await fetch('http://localhost:8000/front/put-venda', {
      method: 'POST',
      body: aformData,
    });

    if (response.ok) {
      window.location.href = 'http://localhost:3000/front/venda-page';
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
                    Quantity:
                    <input id="Quantity" name="Quantity" value={formData.Quantity}
                    onChange={handleChange} />
                  </label>
                  <br />
                  <br />
                <button type='submit' className={styles.vendbotao}>Editar</button> 
              </form>
            </Box>
        </Modal>

          
          <h2>Sell List</h2>
          <ul>
            {vendas.length > 0 ? (
              vendas.map((venda) => (
                <li key={venda.id}>
                  Id: {venda.id} | User: {venda.User} | Product: {venda.Product} | Quantity: {venda.Quantity} | Price: {venda.Price}
                  <button
                    className={styles.vendeditar}
                    type="button"
                    variant="contained"
                    onClick={() => handleEdit(venda)}
                    
                  >
                    Update Venda
                  </button>
                  <button
                  className={styles.vendeditar}
                  type="button"
                  variant="contained"
                  onClick={() => excluir(venda)}
                  >
                    Delete Venda
                  </button>

                  <hr />

                </li>
              ))
            ) : (
              <p>No sells found.</p>
            )}
          </ul>
        </div>
      );
    }

export default VendaList;