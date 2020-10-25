import { render } from '@testing-library/react'
import React from 'react'
import LocalStorageService from '../app/service/localstorageService'
import { AuthContext } from '../main/provedorAutenticacao'


import UsuarioService from '../app/service/usuarioService'

class Home extends React.Component{

    state ={
        saldo: 0
    }

    constructor(){ //necessario para usar a classe service.
        super();
        this.usuarioService = new UsuarioService();
    }

    //Faz parte do ciclo de vida, executa algo assim que o componente estiver renderizado.
    componentDidMount(){
        
        //const objetoUsuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const objetoUsuarioLogado = this.context.usuarioAutenticado

        this.usuarioService
        .obterSaldoPorUsuario(objetoUsuarioLogado.id)
        .then(response => {
                this.setState({saldo: response.data})

            }).catch(error => {
                console.log(error.response)
            });

    }


    render(){
        return(
    
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button">
                            <i class="pi pi-users"></i>&nbsp;  
                            Cadastrar Usuário</a> 
                <a className="btn btn-danger btn-lg" 
                        href="#/cadastro-lancamentos" 
                        role="button">
                            <i class="pi pi-money-bill"></i>&nbsp;  
                            Cadastrar Lançamento</a>
                </p>
            </div>
    
        )
    
    }

}
Home.contextType = AuthContext;
export default Home
