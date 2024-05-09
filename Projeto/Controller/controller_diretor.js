/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Diretor
 * Data: 01/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0 
*******************************************************************************************************************************************/

const message = require('../modulo/config.js')
const nacionalidadeDiretorDAO = require('../model/DAO/nacionalidadeDiretor.js')
const sexoDAO = require('../model/DAO/sexo.js')

const diretorDAO = require('../model/DAO/diretor.js')

const getListarDiretores = async function() {
    try {

        let diretorJSON = {};

        let dadosDiretor = await diretorDAO.selectAllDiretores();
        
        if (dadosDiretor) {

            if (dadosDiretor.length > 0) {

                for (let diretor of dadosDiretor) {

                    let sexoDiretor = await sexoDAO.selectByIdSexo(diretor.id_sexo)
                    delete diretor.id_sexo
                    diretor.sexo = sexoDiretor

                }

                for (let diretor of dadosDiretor) {

                    let nacionalidadeDiretor = await nacionalidadeDiretorDAO.selectByIdDiretorNacionalidade(diretor.id_nacionalidade)

                    if (nacionalidadeDiretor.length > 0) {

                        diretor.nacionalidade = nacionalidadeDiretor

                    }
                }

                diretorJSON.diretor = dadosDiretor
                diretorJSON.quantidade = dadosDiretor.length
                diretorJSON.status_code = 200
                return diretorJSON

            } else {
                return message.ERROR_NOT_FOUND
            }
        } else { 
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

const selectByIdDiretor = async function(id) {
    try{

        let idDiretor = id;

        let diretorJSON = {};

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID 
        } else {

            let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor)

            if (dadosDiretor) {

                if (dadosDiretor.length > 0) {

                    diretorJSON.diretor = dadosDiretor;
                    diretorJSON.status_code = 200;
                    return diretorJSON;

                } else {
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }  
}

const setExcluirDiretor = async function(id) {
    try {

        let idDiretor = id;

        if (idDiretor == ''  || idDiretor == undefined || isNaN (idDiretor)) {
            return message.ERROR_INVALID_ID
        } else {

            let diretorById = await diretorDAO.selectByIdDiretor(id)
        
            if (diretorById.length > 0) {

                let deleteDiretor = await diretorDAO.deleteDiretor(id)

                if (deleteDiretor) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const selectByNomeDiretor = async function(nome) {
    try {
        
        let nomeDiretor = nome

        let diretorJSON = {}

        if (nomeDiretor == '' ||nomeDiretor==undefined||!isNaN(nomeDiretor)) {
            return message.ERROR_INVALID_ID
        } else {

            let dadosDiretor = await diretorDAO.selectByNomeDiretor(nomeDiretor)

            if (dadosDiretor) {

                if (dadosDiretor.length > 0) {

                    diretorJSON.diretor = dadosDiretor
                    diretorJSON.status_code = 200 
                    return diretorJSON

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

const setAtualizarDiretor = async function(id, dadosDiretor, contentType) {
    try {

        let idDiretor = id;
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
                return message.ERROR_INVALID_ID
            } else {
               
                let diretor = await diretorDAO.selectByIdDiretor(idDiretor)

                if (diretor) {
                 
                    let updateDiretorJSON = {}

                    let updateDiretor = await diretorDAO.updateDiretor(id, dadosDiretor)

                    if (updateDiretor) {

                        updateDiretorJSON.diretor     = dadosDiretor
                        updateDiretorJSON.status      = message.SUCCESS_UPDATE_ITEM.status
                        updateDiretorJSON.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        updateDiretorJSON.message     = message.SUCCESS_UPDATE_ITEM.message
                        return updateDiretorJSON

                    } else{
                        return message.ERROR_NOT_FOUND
                    }
                }
                else{
                    return message.ERROR_NOT_FOUND
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirDiretor = async function(dadosDiretor, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoDiretorJSON = {}

            let ultimoID;
            
            if (dadosDiretor.nome == ''            || dadosDiretor.nome == undefined            || dadosDiretor.nome == null            || dadosDiretor.nome.length > 100            ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento.length != 10 ||
                dadosDiretor.biografia == ''       || dadosDiretor.biografia == undefined       || dadosDiretor.biografia == null       || dadosDiretor.biografia.length > 65000     ||
                dadosDiretor.foto == ''            || dadosDiretor.foto == undefined            || dadosDiretor.foto == null            || dadosDiretor.foto.length > 300            ||
                dadosDiretor.id_sexo == ''         || dadosDiretor.id_sexo == undefined         || dadosDiretor.id_sexo == null         || dadosDiretor.id_sexo.length > 20
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let validateStatus = true;
    
                if (validateStatus) {

                    let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)

                    if (novoDiretor) {
                       
                        novoDiretorJSON.diretor     = dadosDiretor
                        novoDiretorJSON.status      = message.SUCCESS_CREATED_ITEM.status
                        novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoDiretorJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        
                        ultimoID = await diretorDAO.selectByLastIdDiretor()

                        dadosDiretor.id = ultimoID[0].id  
                        
                        return novoDiretorJSON
                        
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

module.exports = {
    getListarDiretores,
    selectByIdDiretor,
    selectByNomeDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    setInserirDiretor
}