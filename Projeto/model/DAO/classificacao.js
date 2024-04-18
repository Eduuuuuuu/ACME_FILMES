/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de classificacao
 * Data: 18/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllClassificacao = async function() {
    let sql = 'select * from tbl_classificacao';

    let rsClassificacao = await prisma.$queryRawUnsafe(sql)

    if(rsClassificacao.length > 0)
        return rsClassificacao
    else
        return false
}

const selectByidClassificacao = async function(id) {
    try {

        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectByLastIdClassificacao = async function() {
    try {
        
        let sql = `select cast(last_insert_id() as decimal) as id_classificacao from tbl_classificacao limit 1`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const insertClassificacao = async function(dadosClassificacao) {
    try {

        let sql;

        sql = `insert into tbl_classificacao (
                                                caracteristica,
                                                classificacao,
                                                faixa_etaria,
                                                icone
        ) values (
                                                '${dadosClassificacao.caracteristica}',
                                                '${dadosClassificacao.classificacao}',
                                                '${dadosClassificacao.faixa_etaria}',
                                                '${dadosClassificacao.icone}'
        )`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function(id) {
    try {

        let sql = `delete from tbl_classificacao where id_classificacao = ${id}`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const updateClassificacao = async function(id, dadosClassificacao) {
    try {

        let sql;

        sql = `update tbl_classificacao set
                                                caracteristica = '${dadosClassificacao.caracteristica}',
                                                classificacao = '${dadosClassificacao.classificacao}',
                                                faixa_etaria = '${dadosClassificacao.faixa_etaria}',
                                                icone = '${dadosClassificacao.icone}'
            where id_classificacao = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClassificacao,
    selectByidClassificacao,
    selectByLastIdClassificacao,
    insertClassificacao,
    deleteClassificacao,
    updateClassificacao
}