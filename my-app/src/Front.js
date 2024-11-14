import logo from './logos/logo.svg'
import fastapi from './logos/fastapi.svg';
import user_logo from './logos/user_logo.svg'
import product_logo from './logos/product_logo.svg'
import sell_logo from './logos/sell_logo.svg'
import './Front.css';

function Front() {


  const goToUsers = () => {
    window.location.href = 'http://localhost:3000/front/users-page';
};

  const goToProducts = () =>{
    window.location.href = 'http://localhost:3000/front/product-page'
  }
  const goToVendas = () =>{
    window.location.href = 'http://localhost:3000/front/venda-page'
  }

  const goToCadUser = () =>{
    window.location.href  = 'http://localhost:3000/front' 
  }

  const goToCadProd = () =>{
    window.location.href   = 'http://localhost:3000/front/product'
  }

  const goToCadVenda = () =>{
    window.location.href = 'http://localhost:3000/front/venda'
  }

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
        <button class="button-link" role="button" id='bot-users' onClick={goToCadUser}>Cadastrar Usuario</button>
        <button class="button-link" role="button" id='bot-user' onClick={goToUsers} >Ver Usuarios</button>
        </div>
        <div class='ve-prod'>
        <img src={product_logo} />
        <button class="button-link" role="button" id='bot-prods' onClick={goToCadProd}>Cadastrar Produto</button>
        <button class="button-link" role="button" id='bot-prod' onClick={goToProducts}>Ver Produtos</button>
        </div> 
        <div class='ve-venda'>
        <img src={sell_logo} />
        <button class="button-link" role="button" id='bot-vendas' onClick={goToCadVenda} >Realizar Venda</button>
        <button class="button-link" role="button" id='bot-venda' onClick={goToVendas}>Ver Vendas</button>

            </div> 
       
       
      </header>
    </div>
  );
}

export default Front;
