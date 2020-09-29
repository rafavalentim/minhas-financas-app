import React from 'react'

import Card from '../component/card'
import FormGroup from '../component/form-group'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
            console.log(this.state)

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
                    <button onClick={this.cadastrar}  className='btn btn-success'>Salvar</button>
                    <button  className='btn btn-danger'>Salvar</button>
                </div>
            </div>
        </div>
        </Card>

        )


    }




}
export default CadastroUsuario