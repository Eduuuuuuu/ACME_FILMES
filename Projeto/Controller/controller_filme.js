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

//Função para validar e inserir um novo Filme
const setInserirNovoFilme = async function() {

}

//Função para validar e atualizar um Filme
const setAtualizarFilme = async function() {

}

//Função para exluir um Filme
const setExcluirFilme = async function() {

}

//Função para retornar todos os Filmes
const getListarFilmes = async function() {

    //Cria o objeto JSON
    let filmesJSON = {};
    
    //Chama a função do DAO para retornar os dados da tabela de Filme
    let dadosFilmes = await filmeDAO.selectAllFilmes();

    //Validação para verificar se existem dados
    if(dadosFilmes) {
        //Cria o JSON para devolver para o app
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        return filmesJSON;
    }else {
        return false;
    }
}

//Função para buscar um filme pelo ID
const getBuscarFilme = async function(id) {

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

            //Validação para verificar a quantidade de itens retornados
            if (dadosFilme > 0) {

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
}

const getFilmesNome = async function(filtro) {

    let nome = filtro;

    let filmesJSON = {};

    if (nome == '' || nome == undefined) {
        return message.ERROR_REQUIRED_FIELDS;
    }else {

        let dadosFilmes = await filmeDAO.selectByNome(nome);

        if (dadosFilmes) {

            if (dadosFilmes.length > 0) {

                filmesJSON.filme = dadosFilmes;
                filmesJSON.quantidade = dadosFilmes.length
                filmesJSON.status_code = 200;

                return filmesJSON;

            }else {

                return message.ERROR_NOT_FOUND;
            }

        }else {

            return message.ERROR_INTERNAL_SERVER_DB;

        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmesNome
}