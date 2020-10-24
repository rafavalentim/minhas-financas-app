import React from 'react'

import Card from '../component/card'
import FormGroup from '../component/form-group'
import { withRouter } from 'react-router-dom'
import LocalStorageService from '../app/service/localstorageService'
import {mensagemErro, mensagemSucesso} from '../component/toastr'
import UsuarioService from '../app/service/usuarioService'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    
    cadastrar = () => {

        const {nome, email, senha, senhaRepeticao} = this.state

        const usuario = {nome, email, senha, senhaRepeticao }


        try{
            this.service.validar(usuario)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg =>  mensagemErro(msg));
            return false;
        }


            this.service.salvar(usuario)
                .then(response => {
                        mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema.')
                        this.props.history.push('/login')
                }).catch(error => {
                        mensagemErro(error.response.data)
                })

    }

    cancelarCadastro = () => {
        this.props.history.push('/login')

    }

    render(){
        return(
    
            <Card title='Cadastro de Usuário'>
            <div className="row">
            <div className="col-lg-12">
                <div className="bs-component">
                    <FormGroup label='Nome: *' htmlfor='inputNome'>
                    <input type="nome"
                            value={this.state.nome}
                            onChange={e => this.setState({nome: e.target.value})}
                            className="form-control" 
                            name="nome"
                            id="inputNome" 
                            aria-describedby="emailHelp" 
                            placeholder="Digite o Nome" />
                    </FormGroup>
                    <FormGroup label='Email: *' htmlfor='inputEmail'>
                    <input type="email" 
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            className="form-control" 
                            name="email"
                            id="inputEmail" 
                            aria-describedby="emailHelp" 
                            placeholder="Digite o Email" />
                    <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>

                    </FormGroup>
                    <FormGroup label='Senha: *' htmlfor='inputSenha'>
                    <input type="password"
                            value={this.state.senha}
                            onChange={e => this.setState({senha: e.target.value})} 
                            className="form-control" 
                            name="senha"
                            id="inputSenha" 
                            placeholder="Password" />
                    </FormGroup>
                    <FormGroup label='Repita a senha' htmlfor='inputSenhaRepeticao'>
                    <input type="password2"
                            value={this.state.senhaRepeticao}
                            onChange={e => this.setState({senhaRepeticao: e.target.value})} 
                            className="form-control" 
                            name="senhaRepeticao"
                            id="inputSenhaRepeticao" 
                            placeholder="Password" />
                    </FormGroup>
                    <button onClick={this.cadastrar}  className='btn btn-success'>
                        <i className="pi pi-save"></i>&nbsp;Salvar
                    </button>
                    <button onClick={this.cancelarCadastro} className='btn btn-danger'>
                        <i className="pi pi-times"></i>&nbsp;Cancelar
                    </button>
                </div>
            </div>
        </div>
        </Card>

        )


    }




}
export default withRouter (CadastroUsuario)