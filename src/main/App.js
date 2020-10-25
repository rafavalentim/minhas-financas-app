import React from 'react';

import Rotas from './rotas'
import NavBar from '../component/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'

import Login from '../views/login'

import CadastroUsuario from '../views/cadastroUsuario'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css'

//Imports dos css do PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class App extends React.Component {

  render(){

    return(
      <ProvedorAutenticacao>
        <NavBar />
          <div className='container'>
            <Rotas />
          </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;





/*class App extends React.Component {

  state = {
    numero1: '',
    numero2:'',
    resultado:''
  }

  somar = () => {

    const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2)

    this.setState({ resultado: resultado })
  }
  
  render(){
    return(
      <div>
        <label>Primeiro Número:</label>
        <input type='text' value={this.state.numero1} 
          onChange={(e) => this.setState({numero1: e.target.value})}></input>
       <br />
       <label>Segundo Número:</label>
        <input type='text' value={this.state.numero2} 
          onChange={(e) => this.setState({numero2: e.target.value})}></input>
        <br />
        <button onClick={this.somar}>Somar          
        </button>
        <br />
        Resultado da soma: {this.state.resultado}
        </div>
    );
  }
}*/
