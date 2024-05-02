/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Ator
 * Data: 25/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0 
*******************************************************************************************************************************************/

const message = require('../modulo/config.js')

const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeAtorDAO = require('../model/DAO/nacionalidadeAtor.js')
const atorDAO = require('../model/DAO/ator.js')

const getListarAtores = async function() {
    try {

        let atorJSON = {};
    
        let dadosAtores = await atorDAO.selectAllAtores();
        
        if (dadosAtores) {

            if (dadosAtores.length > 0) {

                for (let ator of dadosAtores) {

                    let sexoAtor = await sexoDAO.selectByIdSexo(id_sexo)
                    delete ator.id_sexo
                    ator.sexo = sexoAtor

                }

                for (let ator of dadosAtores) {

                    let nacionalidadeAtor = await nacionalidadeAtorDAO.selectByIdAtorNacionalidade(id_nacionalidade)
                        
                    if (nacionalidadeAtor.length > 0) {

                        ator.nacionalidade = nacionalidadeAtor
                        
                    }
                }

                atorJSON.atores = dadosAtores
                atorJSON.quantidade = dadosAtores.length
                atorJSON.status_code = 200
                return atorJSON
                
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

const selectByIdAtor = async function(id) {
    try {

        let idAtor = id;

        let atorJSON = {};

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return message.ERROR_INVALID_ID 
        } else {

            let dadosAtor = await atorDAO.selectByIdAtor(idAtor)

            if (dadosAtor) {

                if (dadosAtor.length > 0) {

                    for (let ator of dadosAtor) {

                        let sexoAtor = await sexoDAO.selectByIdSexo(ator.id_sexo)
                        delete ator.id_sexo
                        ator.sexo = sexoAtor
                    }
                    for (let ator of dadosAtor) {
                        
                        let nacionalidadeAtor = await nacionalidadeAtorDAO.selectByIdAtorNacionalidade(ator.id_nacionalidade)
                        
                        if (nacionalidadeAtor.length > 0) {
                            
                            ator.nacionalidade = nacionalidadeAtor
                        }
                    }

                    atorJSON.ator = dadosAtor;
                    atorJSON.status_code = 200;
                    return atorJSON;

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

const setExcluirAtor = async function(id) {
    try {

        let idAtor = id;

        if (idAtor == ''  || idAtor == undefined || isNaN (idAtor)) {
            return message.ERROR_INVALID_ID
        } else {
        
            let atorById = await atorDAO.selectByIdAtor(id)
        
            if (atorById.length > 0) {
            
                let deleteAtor = await atorDAO.deleteAtor(id)

                if (deleteAtor) {
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

const selectByNomeAtor = async function(nome) {
    try {

        let atorNome = nome 

        let atorJSON = {}
    
        if (atorNome == '' || atorNome == undefined || isNaN(atorNome)) {
            return message.ERROR_INVALID_ID
        } else {
            
            let dadosAtor = await atorDAO.selectByNomeAtor(atorNome)
            
            if (dadosAtor) {
                
                if (dadosAtor.length > 0) {

                    for (let ator of dadosAtor) {
                    
                        let sexoAtor = await sexoDAO.selectByIdSexo(ator.id_sexo)
                        delete ator.id_sexo
                        ator.sexo = sexoAtor

                    }
                
                for (let ator of dadosAtor) {
                        
                    let nacionalidadeAtor = await nacionalidadeAtorDAO.selectByIdAtorNacionalidade(ator.id_nacionalidade)
                        
                    if (nacionalidadeAtor.length > 0) {

                        ator.nacionalidade = nacionalidadeAtor
                        
                    }
                }
                    
                atorJSON.ator = dadosAtor
                atorJSON.status_code = 200 
                return atorJSON
                
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

const setAtualizarAtor = async function(id, dadosAtor, contentType) {
    try {
        
        let idAtor = id;

        if(String(contentType).toLowerCase() == 'application/json') {
             
            if(idAtor == ''|| idAtor == undefined || isNaN(idAtor)) {
                return message.ERROR_INVALID_ID
            } else {
               
                let atorById = await atorDAO.selectByIdAtor(idAtor)
                
                if (atorById) {
                 
                    let updateAtorJSON = {}
                    
                    let updateAtor = await atorDAO.updateAtor(id, dadosAtor)
                    
                    if (updateAtor) {

                        updateAtorJSON.ator         = dadosAtor
                        updateAtorJSON.status       = message.SUCCESS_UPDATE_ITEM.status
                        updateAtorJSON.status_code  = message.SUCCESS_UPDATE_ITEM.status_code
                        updateAtorJSON.message      = message.SUCCESS_UPDATE_ITEM.message
                        
                        return updateAtor

                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                } else {
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

const setInserirAtor = async function(dadosAtor, contentType) {
    try {

        if (String(contentType).toLowerCase()=='application/json') {
            
            let novoAtorJSON = {}
            
            let ultimoID;

            if (dadosAtor.nome == ''            || dadosAtor.nome == undefined            || dadosAtor.nome == null            || dadosAtor.nome.length > 100            ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length != 10 ||
                dadosAtor.biografia == ''       || dadosAtor.biografia == undefined       || dadosAtor.biografia == null       || dadosAtor.biografia.length > 65000     ||
                dadosAtor.foto == ''            || dadosAtor.foto == undefined            || dadosAtor.foto == null            || dadosAtor.foto.length > 200            ||
                dadosAtor.sexo[0].nome == ''    || dadosAtor.sexo[0].nome == undefined    || dadosAtor.sexo[0].nome == null    || dadosAtor.sexo[0].nome.length > 20
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let validateStatus = true;
    
                if (validateStatus) {
                    
                    let novoAtor = await atorDAO.insertAtor(dadosAtor)
                    
                    if (novoAtor) {
                       
                        novoAtorJSON.ator        = dadosAtor
                        novoAtorJSON.status      = message.SUCCESS_CREATED_ITEM.status
                        novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoAtorJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        
                        ultimoID = await atorDAO.selectLastId()
                        
                        dadosAtor.id = ultimoID[0].id  
                        
                        return novoAtorJSON

                    } else{
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
    getListarAtores,
    selectByIdAtor,
    selectByNomeAtor,
    setAtualizarAtor,
    setExcluirAtor,
    setInserirAtor
}