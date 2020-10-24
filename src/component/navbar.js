import { render } from '@testing-library/react'
import React from 'react'
import NavBarItem from './navBarItem'

import NabBarItem from './navBarItem'

import AuthService from '../app/service/authService'

const deslogar = () =>{
    AuthService.removerUsuarioAutenticado();

};

function NavBar(){
    return(

        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a href="home.html" className="navbar-brand" >Minhas Finanças</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" 
                  data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavBarItem label='Home' href='#/home' />
                <NavBarItem label='Usuários' href='#/cadastro-usuarios' />
                <NavBarItem label='Lançamento' href='#/consulta-lancamentos' />
                <NavBarItem label='Sair' href='#/login' onClick={deslogar} />
            </ul>
    
          </div>
        </div>
      </div>


        )
    
}
export default NavBar