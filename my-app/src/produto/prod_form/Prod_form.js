import React from 'react';
import styles from './Prod_form.module.css';

function ProdutoForm() {
  const [name, setNome] = React.useState('');
  const [quantity, setQuant] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [user_id,setUser] = React.useState('');
  

 
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      
    const formData = new FormData(); 
  formData.append('name', name);
  formData.append('quantity', quantity);
  formData.append('price', price);
  formData.append('user_id',user_id);
  

  try {
      const response = await fetch('http://localhost:8000/front/product', {
          method: 'POST',
          body: formData, 
      });

      if (response.ok) {
          alert('Produto Cadastrado');
          window.location.href = 'http://localhost:3000';
      } else {
          console.error('Erro ao cadastrar produto:', response.statusText);
          alert('opa!');
      }
  } catch (error) {
      console.error('Erro ao enviar dados:', error);
      
      
  }
      
  
  };

  return (
      <div className={styles.prodFormCadastro}>
          <form  onSubmit={handleSubmit} className={styles.prodForm}>
            <p className={styles.prodTitle}>Cadastrar Produto</p>
          
          <label>
              <input className={styles.prodInput}  placeholder="Nome do produto"
         
                  type="text"
                  value={name}
                  onChange={(e) => setNome(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.prodInput} placeholder="Quantidade"
              
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuant(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.prodInput} placeholder="Preço"
             
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
              />
          </label>
          <label>
          <input className={styles.prodInput} placeholder="User Id"
             
             type="number"
             value={user_id}
             onChange={(e) => setUser(e.target.value)}
             required
             />

          </label>
          
          
                          <button className={styles.prodBotao} type="submit">Cadastrar Produto</button>
                          
          
      </form>
      
      
  </div>
  
  );
}

export default ProdutoForm;
