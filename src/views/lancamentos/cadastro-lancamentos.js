import React from 'react'

import Card from '../../component/card'
import FormGroup from '../../component/form-group'
import SelectMenu from '../../component/selectMenu'

import LancamentoService from '../../app/service/lancamentoService'

import {withRouter} from 'react-router-dom'

import { Button } from 'primereact/button';


class CadastroLancamentos extends React.Component{

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    render(){

        const tipos = this.service.obterTiposLancamentos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title='Cadastro de Lançamento'>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormGroup id='inputDescricao' label='Descrição *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite a descrição'
                                    id='inputDescricao' />
                        </FormGroup>
                    </div> 
                </div>
                <div className='row'>
                <div className='col-md-6'>
                        <FormGroup id='inputAno' label='Ano *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite o ano'
                                    id='inputAno' />
                        </FormGroup>
                    </div>
                    <div className='col-md-6'>
                        <FormGroup id='inputMes' label='Mês *'>
                            <SelectMenu 
                                id='inputMes'
                                className='form-control'
                                lista={meses} />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <FormGroup id='inputAno' label='Valor *'>
                            <input type='text' 
                                    className='form-control' 
                                    placeholder='Digite o valor'
                                    id='inputValor' />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputTipo' label='Tipo *'>
                            <SelectMenu id='inputTipo'
                                        className='form-control' 
                                        lista={tipos} />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputSatus' label='Status *'>
                            <input type='text' className='form-control' disabled={true} />
                        </FormGroup>
                    </div> 
                </div>
                <div className='row'>
                        <div className='col-md-6'>
                            <button className="btn btn-success">Salvar</button>
                            &nbsp;
                            <button className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
            </Card>            

        )
    }
}
export default withRouter(CadastroLancamentos)