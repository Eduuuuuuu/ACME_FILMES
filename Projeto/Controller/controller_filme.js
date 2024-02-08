/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme
 * Data: 01/02/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

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
const getBuscarFilme = async function() {

}


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}