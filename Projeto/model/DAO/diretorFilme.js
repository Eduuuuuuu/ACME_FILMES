/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de filme_diretor
 * Data: 02/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectFilmeByDiretor = async function(id) {
    try {

        let sql = `SELECT tbl_diretor.id_diretor, nome, data_nascimento, biografia, foto, id_sexo
        FROM tbl_diretor
        INNER JOIN tbl_filme_diretor ON tbl_diretor.id_diretor = tbl_filme_diretor.id_diretor
        WHERE tbl_filme_diretor.id_filme = ${id}`;

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    selectFilmeByDiretor
}