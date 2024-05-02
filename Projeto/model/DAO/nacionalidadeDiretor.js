/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o GET na tabela de nacionalidade_diretor
 * Data: 01/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectByIdDiretorNacionalidade = async function(id) {
    try {

        let sql = `SELECT tbl_diretor_nacionalidade.id_diretor, tbl_diretor.nome
        FROM tbl_diretor_nacionalidade
        JOIN tbl_diretor ON tbl_diretor_nacionalidade.id_diretor = tbl_diretor.id_diretor
        WHERE tbl_diretor_nacionalidade.id_nacionalidade = ${id};`

        let rsDiretorNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsDiretorNacionalidade
    } catch (error) {
        return false
    }
}

module.exports = {
    selectByIdDiretorNacionalidade
}