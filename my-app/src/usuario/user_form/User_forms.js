import React from 'react';
import styles from './User_forms.module.css';


function CadastroForms() {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [senha, setSenha] = React.useState('');

  
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      
    const formData = new FormData(); 
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('cpf', cpf);
  formData.append('senha', senha);

  try {
      const response = await fetch('http://localhost:8000/front', {
          method: 'POST',
          body: formData, 
      });

      if (response.ok) {
          alert('Usuario Cadastrado');
          window.location.href = 'http://localhost:3000';
      } else {
          console.error('Erro ao criar usuário:', response.statusText);
          alert('opa!');
      }
  } catch (error) {
      console.error('Erro ao enviar dados:', error);
      
      
  }
      
  
  };

  return (
      <div className={styles.userFormCadastro}>
          <form  onSubmit={handleSubmit} className={styles.userForm}>
          <p className={styles.userTitle}>Cadastrar Usuario</p>
          <label>
              <input className={styles.userInput} placeholder="Insira seu nome"
         
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.userInput} placeholder="Email"
              
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.userInput} placeholder="Cpf"
             
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
              />
          </label>
          <label>
              <input className={styles.userInput} placeholder="Senha"
                 
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
              />
          </label>
          
                          <button type="submit"  className={styles.userBotao}>Cadastrar Usuario</button>
                          
                          
                      
          
          
          
          
          
      </form>
      
      
  </div>
  
  );
}

export default CadastroForms;
