/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de filme_genero
 * Data: 02/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const selectFilmeByGenero = async function(id) {
    try {

        let sql = `SELECT tbl_genero.id_genero, nome
        FROM tbl_filme_genero
        JOIN tbl_genero ON tbl_filme_genero.id_genero = tbl_genero.id_genero
        WHERE tbl_filme_genero.id_filme = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;
    } catch (error) {
        return false;
    }
}

module.exports = {
    selectFilmeByGenero
}