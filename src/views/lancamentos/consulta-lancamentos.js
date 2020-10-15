import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../component/card'
import FormGroup from '../../component/form-group'
import SelectMenu from '../../component/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../component/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



class ConsultaLancamentos extends React.Component{
     
    state ={
        ano:'',
        mes:'',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () =>{

        if(!this.state.ano){
            messages.mensagemErro('O prenchimento do campo Ano é obrigatório.')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro ={
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then(resposta =>{
                        this.setState({lancamentos: resposta.data})
                    }).catch(error =>{
                        console.log(error)
                    })

    }

    editar = (id) =>{
        console.log('Acionou botão editar. ', id)

    }

    deletar =() =>{
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                //removendo o lancamento deletado do array
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState({lancamentos: lancamentos, showConfirmDialog: false})
                messages.mensagemSucesso('Lançamento excluído com sucesso.')                
            }).catch(error =>{
                messages.mensagemErro('Ocorreu um erro ao excluir o lançamento.')
            } )
    }

    abrirConfirmacaoExclusao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarExclusao = (lancamento) => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    
    render(){

        const listaMeses = this.service.obterListaMeses();

        const listaTipoLancamento = this.service.obterTiposLancamentos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarExclusao} className="p-button-secondary" />
            </div>
        );

        const myIcon = (
            <button className="p-dialog-titlebar-icon p-link">
                <span className="pi pi-search"></span>
            </button>
        );

        return(
            <Card title='Consulta Lançamentos'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label='Ano *:' htmlfor='inputAno'>
                                <input  type="ano" 
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})}
                                        className="form-control" 
                                        id="inputAno" 
                                        placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup label='Mês :'>
                                <SelectMenu id='inputMes' 
                                            className="form-control"  
                                            lista={listaMeses}
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}>
                                </SelectMenu>
                            </FormGroup>
                            <FormGroup label='Descrição:' htmlfor='inputDescricao'>
                                <input  type="ano" 
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}
                                        className="form-control" 
                                        id="inputDescricao" 
                                        placeholder="Digite a Descrição" />
                            </FormGroup>
                            <FormGroup label='Tipo de Lançamento:'>
                                <SelectMenu id='inputTipo' 
                                            className="form-control" 
                                            lista={listaTipoLancamento}
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction = {this.abrirConfirmacaoExclusao}
                                              editAction ={this.editar}  />
                        </div>
                    </div>

                </div>
                <div>
                <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDialogFooter}
                        //icons={this.myIcon} 
                        onHide={() => this.setState({showConfirmDialog: false})}>
                    <p>Confirma a exclusão deste Lançamento?</p>
                </Dialog>

                </div>
            </Card>
        )
    }



}
export default withRouter(ConsultaLancamentos)