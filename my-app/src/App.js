import React from 'react';
import './App.css';

function CadastroForm() {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const goToUsers = () => {
              window.location.href = 'http://localhost:3000/front/users-page';
          };
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      /* COMENTEI A PARTE DO ALERT PORQUE ELE MOSTRA OS DADOS CADASTRADOS alert(`Nome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);*/
      const formData = new FormData(); // Criando o objeto FormData
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('cpf', cpf);
  formData.append('senha', senha);

  try {
      const response = await fetch('http://localhost:8000/front', {
          method: 'POST',
          body: formData, 
      });

      if (response.redirected) {
          window.location.href = 'http://localhost:3000/front/sucesso';
      } else {
          console.error('Erro ao criar usuário:', response.statusText);
          alert('opa!');
      }
  } catch (error) {
      console.error('Erro ao enviar dados:', error);
      
      
  }
      
  
  };

  return (
      <div className="form-cadastro">
          <form  onSubmit={handleSubmit} className="form">
          <label>
              <input className="nome" placeholder="Insira seu nome"
         
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
              />
          </label>
          <label>
              <input placeholder="Email"
              
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
          </label>
          <label>
              <input placeholder="Cpf"
             
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
              />
          </label>
          <label>
              <input placeholder="Senha"
                 
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
              />
          </label>
          
                          <button type="submit">Cadastrar</button>
                          <button type="button" onClick={goToUsers}>Ver usuarios</button>
                      
          
          
          
          
          
      </form>
      
      
  </div>
  
  );
}

export default CadastroForm;
