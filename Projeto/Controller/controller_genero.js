/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Genero
 * Data: 11/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const message = require('../modulo/config.js')

const generoDAO = require('../model/DAO/genero.js')

//Função para retornar todos os Generos
const getListarGeneros = async function() {

    try {

        let generoJSON = {};

        let dadosGeneros = await generoDAO.selectAllGeneros();

        if(dadosGeneros) {

            generoJSON.generos = dadosGeneros;
            generoJSON.quantidade = dadosGeneros.length;
            generoJSON.status_code = 200;
            return generoJSON;

        } else {
            return false;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para buscar um genero pelo ID
const getBuscarGenero = async function(id) {

    try {

        let idGenero = id;

        let generoJSON = {}

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID;
        } else {
            
            let dadosGenero = await generoDAO.selectByIdGenero(idGenero);

            if (dadosGenero) {

                if (dadosGenero.length > 0) {

                    generoJSON.genero = dadosGenero;
                    generoJSON.status_code = 200;
                    return generoJSON;

                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para excluir um genero
const setExcluirGenero = async function(id) {

    try {

        let idGenero = id;

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID;
        } else {

            let generoById = await generoDAO.selectByIdGenero(id)

            if (generoById.length > 0) {
                
                let deleteGenero = await generoDAO.deleteGenero(id);

                if (deleteGenero) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para validar e inserir um novo Genero na requisição
const setInserirNovoGenero = async function(dadosGenero, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoGeneroJSON = {};

            if (dadosGenero.nome == ''        || 
                dadosGenero.nome == undefined || 
                dadosGenero.nome == null      || 
                dadosGenero.nome.length > 45
                ) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {

                    let validateStatus = true;

                    if (validateStatus) {
                        
                        let novoGenero = await generoDAO.insertGenero(dadosGenero);

                        if (novoGenero) {
                            
                            let id = await generoDAO.selectByLastIdGenero();

                            dadosGenero.id = id[0].id;

                            novoGeneroJSON.genero      = dadosGenero;
                            novoGeneroJSON.status      = message.SUCCESS_CREATED_ITEM.status;
                            novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                            novoGeneroJSON.message     = message.SUCCESS_CREATED_ITEM.message;
                            return novoGeneroJSON;

                        } else {
                            return messsage.ERROR_INTERNAL_SERVER_DB;
                        }
                    }
                }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para validar e atualizar um Genero
const setAtualizarGenero = async function(id, dadosGenero, contentType) {

    try {

        let idGenero = id;

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {

            return message.ERROR_INVALID_ID

        } else {

            if (String(contentType).toLowerCase() == 'application/json') {

                let updateGeneroJSON = {};

                if (dadosGenero.nome == ''        ||
                    dadosGenero.nome == undefined ||
                    dadosGenero.nome == null      ||
                    dadosGenero.nome.length > 45
                ) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {

                    let validateStatus = true;

                    let generoById = await generoDAO.selectByIdGenero(id);

                    if (generoById.length > 0) {

                        if (validateStatus) {

                            let updateGenero = await generoDAO.updateGenero(id, dadosGenero);

                            if (updateGenero) {

                                updateGeneroJSON.genero      = dadosGenero;
                                updateGeneroJSON.status      = message.SUCESS_UPTADE_ITEM.status;
                                updateGeneroJSON.status_code = message.SUCESS_UPTADE_ITEM.status_code;
                                updateGeneroJSON.message     = message.SUCESS_UPTADE_ITEM.message;
                                return updateGeneroJSON;

                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB;
                            }
                        }
                    } else {
                        return message.ERROR_NOT_FOUND;
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGenero,
    getListarGeneros
}