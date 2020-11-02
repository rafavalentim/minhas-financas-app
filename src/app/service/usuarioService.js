import ApiService from '../apiservices'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('', usuario)
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.');
        }

        if(!usuario.email){
            erros.push('O campo E-mail é obrigatório.')

        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)){
            erros.push('Informe um e-mail válido.');
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha duas vezes.');

        }
        
        if(usuario.senha !== usuario.senhaRepeticao){

            console.log('Senha: ', usuario.senha);
            console.log('SenhaRepeticao: ', usuario.senhaRepeticao);

            erros.push('As senhas não batem.');
        }

        if(erros && erros.length > 0){
            console.log("Quantidade de Erros na Validação:", erros.length);
            throw new ErroValidacao(erros);
        }

        console.log("Validação erros: ", erros );
        
    }


}
export default UsuarioService