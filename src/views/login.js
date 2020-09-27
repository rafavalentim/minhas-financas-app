import React from 'react';

import Card from '../component/card'
import FormGroup from '../component/form-group'

class Login extends React.Component{

    //Criando os campos para receber os parametros da página (Email e senha)
    state = {
        email: '',
        senha: ''
    }

//Criando uma Function para realizar as ações de entrar e cadastrar no sistema
entrar = () =>{
    console.log('Email: ',this.state.email)
    console.log('Senha: ',this.state.senha)
}

render(){
 return(
    <div className='container'>
        <div className='row'>
            <div className='col-md-6' style={{position : 'relative', left :'300px'} }>
                <div className='bs-docs-section'>
                    <Card title='Login'>
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
                                        <button  onClick={this.entrar} className='btn btn-success'>Entrar</button>
                                        <button className='btn btn-danger'>Cadastrar</button>
                                    </fieldset>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        

                    </Card>
                </div>
            </div>
        </div>
    </div>
 )
}

}

export default Login