/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o GET na tabela de nacionalidade_ator
 * Data: 25/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectByIdAtorNacionalidade = async function(id) {
    try {

        let sql = `SELECT tbl_ator_nacionalidade.id_ator, tbl_ator.nome
        FROM tbl_ator_nacionalidade
        JOIN tbl_ator ON tbl_ator_nacionalidade.id_ator = tbl_ator.id_ator
        WHERE tbl_ator_nacionalidade.id_nacionalidade = ${id};`

        let rsAtorNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsAtorNacionalidade
    } catch (error) {
        return false
    }
}

module.exports = {
    selectByIdAtorNacionalidade
}