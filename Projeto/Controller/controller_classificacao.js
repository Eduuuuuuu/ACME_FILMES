/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Classificacao
 * Data: 18/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const message = require('../modulo/config.js')

const classificacaoDAO = require('../model/DAO/classificacao.js')

const getListarClassificacao = async function() {

    try {

        let classificacaoJSON = {};

        let dadosClassificacoes = await classificacaoDAO.selectAllClassificacao();

        if (dadosClassificacoes) {

            classificacaoJSON.classificacao = dadosClassificacoes;
            classificacaoJSON.quantidade = dadosClassificacoes.length;
            classificacaoJSON.status_code = 200;
            return classificacaoJSON;

        } else {
            return false
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarClassificacao = async function(id) {

    try {

        let idClassificacao = id;

        let classificacaoJSON = {};

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROR_INVALID_ID;
        } else {

            let dadosClassificacao = await classificacaoDAO.selectByidClassificacao(idClassificacao);

            if (dadosClassificacao) {

                if (dadosClassificacao.length > 0) {

                    classificacaoJSON.classificacao = dadosClassificacao;
                    classificacaoJSON.status_code = 200;
                    return classificacaoJSON;

                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirClassificacao = async function(id) {

    try {

        let idClassificacao = id;

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROR_INVALID_ID;
        } else {
            
            let classificacaoById = await classificacaoDAO.selectByidClassificacao(id)

            if (classificacaoById.length > 0) {

                let deleteClassificacao = await classificacaoDAO.deleteClassificacao(id)

                if (deleteClassificacao) {
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

const setInserirNovaClassificacao = async function(dadosClassificacao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoClassificacaoJSON = {};

            if (dadosClassificacao.caracteristica == '' || dadosClassificacao.caracteristica == undefined || dadosClassificacao.caracteristica == null || dadosClassificacao.caracteristica.length > 100 ||
                dadosClassificacao.classificacao  == '' || dadosClassificacao.classificacao  == undefined || dadosClassificacao.classificacao  == null || dadosClassificacao.classificacao.length  > 45  ||
                dadosClassificacao.faixa_etaria   == '' || dadosClassificacao.faixa_etaria   == undefined || dadosClassificacao.faixa_etaria   == null || dadosClassificacao.faixa_etaria.length   > 2   ||
                dadosClassificacao.icone          == '' || dadosClassificacao.icone          == undefined || dadosClassificacao.icone          == null || dadosClassificacao.icone.length          > 200 
                ) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {

                    let validateStatus = true;

                    if (validateStatus) {

                        let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                        if (novaClassificacao) {

                            let id = await classificacaoDAO.selectByLastIdClassificacao();

                            dadosClassificacao.id = id[0].id

                            novoClassificacaoJSON.classificacao = dadosClassificacao;
                            novoClassificacaoJSON.status        = message.SUCCESS_CREATED_ITEM.status;
                            novoClassificacaoJSON.status_code   = message.SUCCESS_CREATED_ITEM.status_code;
                            novoClassificacaoJSON.message       = message.SUCCESS_CREATED_ITEM.message;

                            return novoClassificacaoJSON

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }
                }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarClassificacao = async function(id, dadosClassificacao, contentType) {

    try {

        let idClassificacao = id;

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {

            return message.ERROR_INVALID_ID

        } else {

            if (String(contentType).toLowerCase() == 'application/json'){

                let updateClassificacaoJSON = {};

                if (dadosClassificacao.caracteristica == '' || dadosClassificacao.caracteristica == undefined || dadosClassificacao.caracteristica == null || dadosClassificacao.caracteristica.length > 100 ||
                    dadosClassificacao.classificacao  == '' || dadosClassificacao.classificacao  == undefined || dadosClassificacao.classificacao  == null || dadosClassificacao.classificacao.length  > 45  ||
                    dadosClassificacao.faixa_etaria   == '' || dadosClassificacao.faixa_etaria   == undefined || dadosClassificacao.faixa_etaria   == null || dadosClassificacao.faixa_etaria.length   > 2   ||
                    dadosClassificacao.icone          == '' || dadosClassificacao.icone          == undefined || dadosClassificacao.icone          == null || dadosClassificacao.icone.length          > 200 
                ) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {

                    let validateStatus = true;

                    let classificacaoById = await classificacaoDAO.selectByidClassificacao(id);

                    if (classificacaoById.length > 0) {
                        
                        if (validateStatus) {

                            let updateClassificacao = await classificacaoDAO.updateClassificacao(id, dadosClassificacao)

                            if (updateClassificacao) {

                                updateClassificacaoJSON.classificacao = dadosClassificacao;
                                updateClassificacaoJSON.status        = message.SUCCESS_UPDATE_ITEM.status;
                                updateClassificacaoJSON.status_code   = message.SUCCESS_UPDATE_ITEM.status_code;
                                updateClassificacaoJSON.message       = message.SUCCESS_UPDATE_ITEM.message;

                                return updateClassificacaoJSON;

                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
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
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacao,
    getListarClassificacao,
}