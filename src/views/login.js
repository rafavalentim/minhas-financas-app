import React from 'react';

import Card from '../component/card'
import FormGroup from '../component/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import {mensagemErro} from '../component/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component{

    //Criando os campos para receber os parametros da página (Email e senha)
    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

//Criando uma Function para realizar as ações de entrar e cadastrar no sistema
entrar = async () =>{
    this.service.autenticar({
        email: this.state.email,
        senha: this.state.senha
    }).then(response => {
            //LocalStorageService.adicionaItem('_usuario_logado', response.data) //Armazena os dados dos usuarios em uma session
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            console.log('Entrou no erro.')
            mensagemErro(erro.response.data)
        })
        console.log('Executou a requisição.')
} 

prepararCadastrar = () => {
    this.props.history.push('/cadastro-usuarios')
}

render(){
 return(

    <div className='row'>
        <div className='col-md-6' style={{position : 'relative', left :'300px'} }>
            <div className='bs-docs-section'>
                <Card title='Login'>
                    <div className='row'>
                        <span></span>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='bs-component'>
                                <form>
                                <fieldset>
                                    <FormGroup label='Email: *' htmlfor='exampleInputEmail1'>
                                        <input  type="email" 
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email" />
                                    </FormGroup>
                                    <FormGroup label='Senha: *' htmlfor='exampleInputPassword1'>
                                    <input  type="password" 
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.value})}
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Password" />
                                    </FormGroup>
                                    <button  onClick={this.entrar} 
                                             className='btn btn-success'>
                                                 <i className="pi pi-sign-in"></i>&nbsp;Entrar
                                    </button>
                                    <button  onClick={this.prepararCadastrar} 
                                             className='btn btn-danger'>
                                                 <i className="pi pi-plus"></i>&nbsp;Cadastrar
                                    </button>
                                </fieldset>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                    

                </Card>
            </div>
        </div>
    </div>

 )
}

}

Login.contextType = AuthContext;

export default withRouter (Login)