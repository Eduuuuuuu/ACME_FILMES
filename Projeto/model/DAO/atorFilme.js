/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de filme_ator
 * Data: 02/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectFilmeByAtor = async function(id) {
    try {

        let sql = `SELECT tbl_ator.id_ator, nome, data_nascimento, biografia, foto, id_sexo
        FROM tbl_ator
        INNER JOIN tbl_filme_ator ON tbl_ator.id_ator = tbl_filme_ator.id_ator
        WHERE tbl_filme_ator.id_filme = ${id}`;

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    selectFilmeByAtor
}