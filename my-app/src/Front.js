import logo from './logos/logo.svg'
import fastapi from './logos/fastapi.svg';
import user_logo from './logos/user_logo.svg'
import product_logo from './logos/product_logo.svg'
import sell_logo from './logos/sell_logo.svg'
import './Front.css';

function Front() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={fastapi} className="App-logo" alt="fastapi" />

        <p id='coment'>
          Trabalho Fullstack
        </p>
        <div class="ve-user">
        <img src={user_logo} />
        <button class="button-link" role="button" id='bot-users'>Cadastrar Usuario</button>
        <button class="button-link" role="button" id='bot-user'>Ver Usuarios</button>
        </div>
        <div class='ve-prod'>
        <img src={product_logo} />
        <button class="button-link" role="button" id='bot-prods'>Cadastrar Produto</button>
        <button class="button-link" role="button" id='bot-prod'>Ver Produtos</button>
        </div> 
        <div class='ve-venda'>
        <img src={sell_logo} />
        <button class="button-link" role="button" id='bot-vendas'>Realizar Venda</button>
        <button class="button-link" role="button" id='bot-venda'>Ver Vendas</button>

            </div> 
       
       
      </header>
    </div>
  );
}

export default Front;
