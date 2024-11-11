import React from 'react';
import styles from './Venda.module.css';

function VendaForm() {
  const [user_id, setUser_Id] = React.useState('');
  const [product_id, setProduct_id] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  

 
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      
    const formData = new FormData(); 
  formData.append('user_id', user_id);
  formData.append('product_id', product_id);
  formData.append('quantity', quantity);
  

  try {
      const response = await fetch('http://localhost:8000/front/venda', {
          method: 'POST',
          body: formData, 
      });

      if (response.ok) {
          alert('Venda Cadastrada');
      } else {
          console.error('Erro ao cadastrar venda:', response.statusText);
          alert('opa!');
      }
  } catch (error) {
      console.error('Erro ao enviar dados:', error);
      
      
  }
      
  
  };

  return (
      <div className={styles.vendFormCadastro}>
          <form  onSubmit={handleSubmit} className={styles.vendForm}>
            <p className={styles.vendTitle}>Cadastrar Venda</p>
          
          <label>
              <input className={styles.vendInput}  placeholder="Id Usuario"
         
                  type="number"
                  value={user_id}
                  onChange={(e) => setUser_Id(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.vendInput} placeholder="Id Produto"
              
                  type="number"
                  value={product_id}
                  onChange={(e) => setProduct_id(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.vendInput} placeholder="Quantity"
             
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
              />
          </label>
          
          
                          <button className={styles.vendBotao} type="submit">Cadastrar Venda</button>
                          
          
      </form>
      
      
  </div>
  
  );
}

export default VendaForm;
