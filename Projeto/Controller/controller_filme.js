/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme
 * Data: 01/02/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import o aquivo DAO que fará a comunicação com o Banco de Dados
const filmeDAO = require('../model/DAO/filme.js')
const classificacaoDAO = require ('../model/DAO/classificacao.js')
const generoFilmeDAO = require('../model/DAO/generoFilme.js')
const diretorDAO = require('../model/DAO/diretorFilme.js')
const atorDAO = require('../model/DAO/atorFilme.js')

//Função para validar e inserir um novo Filme na requisição
const setInserirNovoFilme = async function(dadosFilme, contentType) {

    try{ 

        //Cria 
        if (String(contentType).toLowerCase() == 'application/json') {

        //Cria o objeto JSON para devolver os dados criados 
        let novoFilmeJSON = {};

        //Validação de campos obrigatórios ou com digitação inválida
        if (dadosFilme.nome == ''                || dadosFilme.nome == undefined             || dadosFilme.nome == null            || dadosFilme.nome.length > 80             ||
            dadosFilme.sinopse == ''             || dadosFilme.sinopse == undefined          || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000       ||
            dadosFilme.duracao == ''             || dadosFilme.duracao == undefined          || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8           ||
            dadosFilme.data_lancamento == ''     || dadosFilme.data_lancamento == undefined  || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == ''           || dadosFilme.foto_capa == undefined        || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200       ||
            dadosFilme.valor_unitario.length > 6 ||
            dadosFilme.id_classificacao == ''    || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null
        ) {
            return message.ERROR_REQUIRED_FIELDS; //400
        }else {

            let validateStatus = false;

            //Validação da data de relançamento, já que ela não é obrigatória no BD
            if (dadosFilme.data_relancamento != null && 
                dadosFilme.data_relancamento != ''   &&
                dadosFilme.data_relancamento != undefined) {

                //Validação para verificar se a data está com a quantidade de dígitos correto
                if (dadosFilme.data_relancamento.length != 10) {
                    return message.ERROR_REQUIRED_FIELDS; //400
                }else{ 
                    validateStatus = true;
                }
            }else{
                validateStatus = true;
            }

            //Validação para verificar se podemos encaminhar os dados para o DAO
            if (validateStatus) {
        
            //Encaminha os dados do Filme para o DAO inserir no BD
            let novoFilme = await filmeDAO.insertFilme(dadosFilme);

            //Validação para verificar se o DAO inseriu os dados do BD
            if(novoFilme) {

                let id = await filmeDAO.selectByLastId();

                dadosFilme.id = id[0].id;

                //Cria o JSON de retorno dos dados (201)
                novoFilmeJSON.filme         = dadosFilme;
                novoFilmeJSON.status        = message.SUCCESS_CREATED_ITEM.status;
                novoFilmeJSON.status_code   = message.SUCCESS_CREATED_ITEM.status_code;
                novoFilmeJSON.message       = message.SUCCESS_CREATED_ITEM.message; 

                return novoFilmeJSON; //201
            }else {
                return message.ERROR_INTERNAL_SERVER_DB; //500
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE; //415
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

//Função para validar e atualizar um Filme
const setAtualizarFilme = async function(id, dadosFilme, contentType) {
    
    try{ 

        let idFilme = id;

        if(idFilme == '' || idFilme == undefined || isNaN (idFilme)){
            
            return message.ERROR_INVALID_ID
            
        }else{

        if (String(contentType).toLowerCase() == 'application/json') {
        
            let updateFilmeJSON = {};

            if (dadosFilme.nome == ''                || dadosFilme.nome == undefined             || dadosFilme.nome == null            || dadosFilme.nome.length > 80             ||
                dadosFilme.sinopse == ''             || dadosFilme.sinopse == undefined          || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''             || dadosFilme.duracao == undefined          || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == ''     || dadosFilme.data_lancamento == undefined  || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''           || dadosFilme.foto_capa == undefined        || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200       ||
                dadosFilme.valor_unitario.length > 6 ||
                dadosFilme.id_classificacao == ''    || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null
            ) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {

                let validateStatus = false;

                if (dadosFilme.data_relancamento != null && 
                    dadosFilme.data_relancamento != ''   &&
                    dadosFilme.data_relancamento != undefined) {

                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS; //400
                    }else{ 
                        validateStatus = true;
                    }
                }else{
                    validateStatus = true;
                }

                let filmeById = await filmeDAO.selectByIDFilme(id);

                if(filmeById.length > 0) {

                    if(validateStatus) {

                        let updateFilme = await filmeDAO.updateFilme(id, dadosFilme);
                        
                        if(updateFilme) {

                            updateFilmeJSON.filme         = dadosFilme;
                            updateFilmeJSON.status        = message.SUCCESS_UPDATE_ITEM.status;
                            updateFilmeJSON.status_code   = message.SUCCESS_UPDATE_ITEM.status_code;
                            updateFilmeJSON.message       = message.SUCCESS_UPDATE_ITEM.message; 

                            return updateFilmeJSON; //201
                    }else {
                        return message.ERROR_INTERNAL_SERVER_DB; //500
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND; //415
            }
        }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

//Função para exluir um Filme
const setExcluirFilme = async function(id) {
    try{
        
        let idFilme = id;

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID;
        } else {

            let filmeById = await filmeDAO.selectByIDFilme(id)

            if (filmeById.length > 0 ) {

                let deleteFilme = await filmeDAO.deleteFilme(id);

                if (deleteFilme) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
        
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os Filmes
const getListarFilmes = async function() {

    try{

        //Cria o objeto JSON
        let filmesJSON = {};
    
        //Chama a função do DAO para retornar os dados da tabela de Filme
        let dadosFilmes = await filmeDAO.selectAllFilmes();

        //Validação para verificar se existem dados
        if(dadosFilmes) {

            if (dadosFilmes.length > 0) {

                for (let filme of dadosFilmes) {

                    let classificacao = await classificacaoDAO.selectByIdClassificacao(filme.id_classificacao)
                    let generoFilme = await generoFilmeDAO.selectFilmeByGenero(filme.id_filme)
                    let diretorFilme = await diretorDAO.selectFilmeByDiretor(filme.id_filme)
                    let atorFilme = await atorDAO.selectFilmeByAtor(filme.id_filme)
                    delete filme.id_classificacao
                    filme.classificacao = classificacao
                    filme.generos = generoFilme
                    filme.diretores = diretorFilme
                    filme.atores = atorFilme
                }

                //Cria o JSON para devolver para o app
                filmesJSON.filmes = dadosFilmes;
                filmesJSON.quantidade = dadosFilmes.length;
                filmesJSON.status_code = 200;
                return filmesJSON;

            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER; //500 erro na controller
    }
}

//Função para buscar um filme pelo ID
const getBuscarFilme = async function(id) {

    try{

        //Recebe o ID do Filme 
        let idFilme = id;
        //Cria o objeto JSON
        let filmesJSON = {}

        //Validação para verificar se o ID é valido (vazio, indefinido ou não numérico)
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID; //400
        }else {

            //Encaminha o ID para o DAO buscar no Banco de dados 
            let dadosFilme = await filmeDAO.selectByIDFilme(idFilme);

            //Verifica se o DAO retornou dados
            if (dadosFilme) {

                if (dadosFilme.length > 0) {

                    for (let filme of dadosFilme) {

                        let classificacao = await classificacaoDAO.selectByIdClassificacao(filme.id_classificacao)
                        let generoFilme = await generoFilmeDAO.selectFilmeByGenero(filme.id_filme)
                        let diretorFilme = await diretorDAO.selectFilmeByDiretor(filme.id_filme)
                        let atorFilme = await atorDAO.selectFilmeByAtor(filme.id_filme)
                        delete filme.id_classificacao
                        filme.classificacao = classificacao
                        filme.generos = generoFilme
                        filme.diretores = diretorFilme
                        filme.atores = atorFilme
                    }

                    //Cria JSON para retorno
                    filmesJSON.filme = dadosFilme;
                    filmesJSON.status_code = 200;
                    return filmesJSON;

                }else {
                    return message.ERROR_NOT_FOUND; //404
                }
            }else {
                return message.ERROR_INTERNAL_SERVER_DB; //500
            }
        }
    }catch(error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

//Função para buscar um filme pelo nome
const getFilmesNome = async function(filtro) {

    try{

        let nome = filtro;

        let filmesJSON = {};

        if (nome == '' || nome == undefined) {
            return message.ERROR_REQUIRED_FIELDS;
        }else {

            let dadosFilmes = await filmeDAO.selectByNome(nome);

            if (dadosFilmes) {

                for (let filme of dadosFilmes) {

                    let classificacao = await classificacaoDAO.selectByIdClassificacao(filme.id_classificacao)
                    delete filme.id_classificacao
                    filme.classificacao = classificacao

                }

                for (let filme of dadosFilmes) {

                    let generoFilme = await generoFilmeDAO.selectFilmeByGenero(filme.id_filme)

                    if (generoFilme.length > 0) {

                        filme.generoFilmes = generoFilme
                    }
                }

                if (dadosFilmes.length > 0) {

                    filmesJSON.filme = dadosFilmes;
                    filmesJSON.quantidade = dadosFilmes.length
                    filmesJSON.status_code = 200;
                    return filmesJSON;

                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch(error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmesNome,
}