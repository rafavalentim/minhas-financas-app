import React from 'react'

import Card from '../../component/card'
import FormGroup from '../../component/form-group'
import SelectMenu from '../../component/selectMenu'
import * as messages from '../../component/toastr'
import LocalStorageService from '../../app/service/localstorageService'

import LancamentoService from '../../app/service/lancamentoService'

import {withRouter} from 'react-router-dom'

import { Button } from 'primereact/button';


class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor:'',
        mes:'',
        ano:'',
        tipo:'',
        status:'',
        idUsuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        //Recebendo os parâmetros provenientes da rota
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                        .then(response => {
                            this.setState({...response.data, atualizando : true})
                        })
                        .catch(error => {
                            messages.mensagemErro(error.response.data);
                        })
        }
        console.log(params);

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    submit = () =>{
       
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const {descricao, valor, mes, ano, tipo} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, idUsuario: usuarioLogado.id};

        //Realizando o tratamento das validações do formulário.
        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            //Mostrando a mensagem de erro no Toastr
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }



        this.service.salvar(lancamento)
                            .then(response =>{
                                this.props.history.push('/consulta-lancamentos');
                                 messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
                            }).catch(error =>{
                                messages.mensagemErro(error.response.data)
                            });
    }

    atualizar = () =>{

        const {descricao, valor, mes, ano, tipo, status, id, idUsuario} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, status, id, idUsuario};

        this.service.atualizar(lancamento)
                            .then(response =>{
                                this.props.history.push('/consulta-lancamentos');
                                 messages.mensagemSucesso('Lançamento atualizado com sucesso!')
                            }).catch(error =>{
                                messages.mensagemErro(error.response.data)
                            });
    }


    render(){

        const tipos = this.service.obterTiposLancamentos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormGroup id='inputDescricao' label='Descrição *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite a descrição'
                                    id='inputDescricao'
                                    name='descricao'
                                    onChange={this.handleChange}
                                    value={this.state.descricao} />
                        </FormGroup>
                    </div> 
                </div>
                <div className='row'>
                <div className='col-md-6'>
                        <FormGroup id='inputAno' label='Ano *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite o ano'
                                    id='inputAno'
                                    name='ano'
                                    onChange={this.handleChange}
                                    value={this.state.ano} />
                        </FormGroup>
                    </div>
                    <div className='col-md-6'>
                        <FormGroup id='inputMes' label='Mês *'>
                            <SelectMenu 
                                id='inputMes'
                                name='mes'
                                className='form-control'
                                lista={meses}
                                onChange={this.handleChange}
                                value={this.state.mes} />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <FormGroup id='inputValor' label='Valor *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite o valor'
                                    id='inputValor'
                                    name='valor'
                                    onChange={this.handleChange}
                                    value={this.state.valor} />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputTipo' label='Tipo *'>
                            <SelectMenu id='inputTipo'
                                        className='form-control' 
                                        lista={tipos}
                                        name='tipo'
                                        onChange={this.handleChange}
                                    value={this.state.tipo} />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputSatus' label='Status *'>
                            <input type='text' 
                                   className='form-control' 
                                   disabled={true}
                                   name='status'
                                   onChange={this.handleChange}
                                   value={this.state.status} />
                        </FormGroup>
                    </div> 
                </div>
                <div className='row'>
                        <div className='col-md-6'>
                        
                            { this.state.atualizando ? 
                                (
                                        <button className="btn btn-primary" 
                                                onClick={this.atualizar}
                                                title='Atualizar'>
                                                    <i className="pi pi-refresh"></i> Atualizar
                                        </button>                                        
                                ) : (
                                        <button className="btn btn-success" 
                                                onClick={this.submit}
                                                title="Salvar">
                                                    <i className="pi pi-save"></i>&nbsp;Salvar
                                        </button>                                                                        )                               
                            }
                                        <button className="btn btn-danger" 
                                                onClick={e => this.props.history.push('/consulta-lancamentos')}
                                                title="Cancelar">
                                                    <i className="pi pi-times"></i>&nbsp;Cancelar
                                        </button>
                        </div>
                    </div>
            </Card>            

        )
    }
}
export default withRouter(CadastroLancamentos)